import React, { useState } from 'react';
import DraggableComponent from './DraggableComponent';

const DropZone: React.FC = () => {
	const [droppedComponents, setDroppedComponents] = useState<any[]>([]);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      
		event.preventDefault();
		const data = event.dataTransfer?.getData('text/plain');

		if (data) {
		setDroppedComponents(prevComponents => [...prevComponents, data]);
		}
	};

	return (
		<div className='drop-zone' onDragOver={handleDragOver} onDrop={handleDrop}>
			{droppedComponents.map((component, index) => (
				<DraggableComponent key={index}></DraggableComponent>
			))}
		</div>
	);
};

export default DropZone;
