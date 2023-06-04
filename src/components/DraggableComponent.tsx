import React, { useState, useEffect, useRef } from 'react';
import { DroppedComponent } from '../interfaces/DroppedComponent';

interface Props {
	dropPositionX: number,
	dropPositionY: number,
	largestZIndex: number,
	setLargestZIndex: React.Dispatch<React.SetStateAction<number>>
	singleComponent: DroppedComponent,
	droppedComponents: DroppedComponent[],
	setDroppedComponents: React.Dispatch<React.SetStateAction<DroppedComponent[]>>
}


const DraggableComponent: React.FC<Props> = ({ dropPositionX, dropPositionY, singleComponent, droppedComponents ,setDroppedComponents, largestZIndex, setLargestZIndex }: Props) => {

	/** Dragging **/

	const [position, setPosition] = useState({ x: dropPositionX, y: dropPositionY });
	const [dragging, setDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	/** Resize Component **/

	const [componentSize, setComponentSize] = useState({ height: '350px', width: '300px' });

	/** Content Editable **/

	const contentEditableRef = useRef<HTMLDivElement>(null);
	const [contentEditable, setContentEditable] = useState(true)

	/** Component z-index **/

	const [componentZIndex, setComponentZIndex] = useState(0)

	const elementDragRef = useRef<HTMLDivElement>(null);


	useEffect(() => {
		const handleMouseMoveDrag = (event: MouseEvent) => {
			event.preventDefault();
			if (elementDragRef.current && dragging) {
				const newX = event.clientX - offset.x;
				const newY = event.clientY - offset.y;

				// stop draggable component from being dragged out of screen
				if (newY <= 1) {
					setPosition({ x: newX, y: 1 })
				} else {
					setPosition({ x: newX, y: newY });
				}
			}
		};

		const handleMouseUpDrag = () => {
			setDragging(false);
		};

		
		if (dragging) {
			document.addEventListener('mousemove', handleMouseMoveDrag);
			document.addEventListener('mouseup', handleMouseUpDrag);
		} else {
			document.removeEventListener('mousemove', handleMouseMoveDrag);
			document.removeEventListener('mouseup', handleMouseUpDrag);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMoveDrag);
			document.removeEventListener('mouseup', handleMouseUpDrag);
		};
	}, [dragging, offset]);


	const handleMouseDownDrag = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragging(true);
		const elementRect = elementDragRef.current?.getBoundingClientRect();
		const dropZoneRect = event.currentTarget.parentElement?.parentElement?.getBoundingClientRect();

		if (elementRect && dropZoneRect) {
			const offsetX = event.clientX - elementRect.left;
			let offsetY = event.clientY - elementRect.top;

			// adjust for the offset of the navbar
			if (dropZoneRect) {
				offsetY += dropZoneRect.top
			}

			setOffset({ x: offsetX, y: offsetY });
		}
	};

	/** Delete component from drop zone **/

	const handleDelete = (id: number) => {
		setDroppedComponents(droppedComponents.filter((item: DroppedComponent) => item.id !== id ));
	}

	/** Set content editable **/

	const handleContentEditable = () => {
		setContentEditable(!contentEditable);
	}

	/** Blur component when something outside of it is clicked **/

	const handleBlur = () => {
		(contentEditableRef.current as HTMLDivElement).contentEditable = 'false';
		setContentEditable(false)
	}

	useEffect(() => {
		if (contentEditable) {
			contentEditableRef.current?.focus();
		}

    }, [contentEditableRef, contentEditable]);

	/** When component is dropped in dropzone give it largest z-index **/

	useEffect(() => {
		let newZindex = largestZIndex + 1;
		setLargestZIndex(newZindex);
		setComponentZIndex(newZindex)
	}, [])

	return (
		<div className='draggable-component'
			onMouseDown={() => { 
				let newZindex = largestZIndex + 1;
				setLargestZIndex(newZindex);
				setComponentZIndex(newZindex)
			}}

			style={{ 
				zIndex: componentZIndex, 
				top: position.y, 
				left: position.x, 
				height: componentSize.height,
				width: componentSize.width
			}}>

			<div className="drag-bar"
				ref={elementDragRef}
				onMouseDown={handleMouseDownDrag}
			>
				Click here to drag me
			</div>

			<div 
				onBlur={handleBlur}
				autoFocus 
				ref={contentEditableRef}  
				contentEditable={contentEditable} 
				className={contentEditable ? "draggable-component-content-active p-1": "p-1 draggable-component-content-disabled"}
			></div>

			<div className="draggable-component-footer"> 
				<button onClick={handleContentEditable}>Edit</button>
				<button onClick={() => handleDelete(singleComponent.id)}>Delete</button>
			</div>
		</div>
	);
};

export default DraggableComponent;
