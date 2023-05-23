import React, { useState, useEffect, useRef } from 'react';
import { DropComponent } from '../interfaces/DropComponent';

interface Props {
	dropPositionX: number,
	dropPositionY: number,
	singleComponent: DropComponent,
	droppedComponents: DropComponent[],
	setDroppedComponents: React.Dispatch<React.SetStateAction<DropComponent[]>>
}


const DraggableComponent: React.FC<Props> = ({ dropPositionX, dropPositionY, singleComponent, droppedComponents ,setDroppedComponents }: Props) => {

	/** Dragging **/

	const [position, setPosition] = useState({ x: dropPositionX, y: dropPositionY });
	const [dragging, setDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	/** Resize Component **/

	const [componentSize, setComponentSize] = useState({ height: '300px', width: '300px' });

	/** Content Editable **/

	const contentEditableRef = useRef<HTMLDivElement>(null);
	const [contentEditable, setContentEditable] = useState(true)

	const elementDragRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMoveDrag = (event: MouseEvent) => {
			event.preventDefault();
			if (elementDragRef.current && dragging) {
				const newX = event.clientX - offset.x;
				const newY = event.clientY - offset.y;
				setPosition({ x: newX, y: newY });
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
			if (dropZoneRect)
				offsetY += dropZoneRect.top

			setOffset({ x: offsetX, y: offsetY });
		}
	};

	/** Delete component from drop zone **/

	const handleDelete = (id: number) => {
		setDroppedComponents(droppedComponents.filter((item: DropComponent) => item.id !== id ));
	}

	/** Set content editable **/

	const handleContentEditable = () => {
		setContentEditable(!contentEditable);
	}

	const handleBlur = () => {
		(contentEditableRef.current as HTMLDivElement).contentEditable = 'false';
		setContentEditable(false)
	}

	useEffect(() => {
		if (contentEditable) {
			contentEditableRef.current?.focus();
		}

    }, [contentEditableRef, contentEditable]);

	return (
		<div className='draggable-component' 
			style={{ 
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
				{/* <button onClick={handleContentApprove}>Approve</button> */}
				<button onClick={() => handleDelete(singleComponent.id)}>Delete</button>
				<button disabled={true} className='resize-button'>resize</button>
			</div>
		</div>
	);
};

export default DraggableComponent;
