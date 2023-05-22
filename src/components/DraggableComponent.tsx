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
		if (elementRect) {
		const offsetX = event.clientX - elementRect.left;
		const offsetY = event.clientY - elementRect.top;
		setOffset({ x: offsetX, y: offsetY });
		}
	};

	return (
		<div style={{ position: 'relative', width: '100%', height: '100vh' }}>
			<div
				ref={elementRef}
				style={{
					position: 'absolute',
					top: position.y,
					left: position.x,
					width: '100px',
					height: '100px',
					backgroundColor: 'red',
					cursor: 'move',
				}}
				onMouseDown={handleMouseDown}
			/>
		</div>
	);
};

export default DraggableComponent;
