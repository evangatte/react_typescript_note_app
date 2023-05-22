import React, { useState, useEffect, useRef } from 'react';

const DraggableComponent = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [dragging, setDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			event.preventDefault();
			if (elementRef.current && dragging) {
				const newX = event.clientX - offset.x;
				const newY = event.clientY - offset.y;
				setPosition({ x: newX, y: newY });
			}
		};

		const handleMouseUp = () => {
			setDragging(false);
		};

		if (dragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		} else {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [dragging, offset]);

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragging(true);
		const elementRect = elementRef.current?.getBoundingClientRect();
		const dropZoneRect = event.currentTarget.parentElement?.parentElement?.getBoundingClientRect();

		if (elementRect && dropZoneRect) {
			let offsetX = event.clientX - elementRect.left;
			let offsetY = event.clientY - elementRect.top;

			if (dropZoneRect)
				offsetY += dropZoneRect.top
				
			setOffset({ x: offsetX, y: offsetY });
		}
	};

	return (
		<div
			className='draggable-component'
			// ref={elementRef}
			style={{
				top: position.y,
				left: position.x,
			}}
		>
			<div className="drag-bar"
				ref={elementRef}
				onMouseDown={handleMouseDown}
			>
			</div>
		</div>
	);
};

export default DraggableComponent;
