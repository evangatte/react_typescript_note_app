import React, { useState } from 'react';
import DraggableComponent from './DraggableComponent';
import { DropComponent } from '../interfaces/DropComponent';

const DropZone: React.FC = () => {
	const [cursorPositionX, setCursorPositionX] = useState<number>(0)
	const [cursorPositionY, setCursorPositionY] = useState<number>(0)

	const [droppedComponents, setDroppedComponents] = useState<DropComponent[]>([]);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      
		event.preventDefault();
		const data = event.dataTransfer?.getData('text/plain');

		setCursorPositionX(event.clientX)
		setCursorPositionY(event.clientY)

		if (data) {
			setDroppedComponents([...droppedComponents, { id: Date.now(), data }]);
		}
	};

	return (
		<div className='drop-zone' onDragOver={handleDragOver} onDrop={handleDrop}>
			{droppedComponents.map((component, index) => (
				<DraggableComponent
					singleComponent={component}
					droppedComponents={droppedComponents} 
					setDroppedComponents={setDroppedComponents}
					dropPositionX={cursorPositionX} 
					dropPositionY={cursorPositionY} 
					key={component.id}
				/>
			))}
		</div>
	);
};

export default DropZone;
