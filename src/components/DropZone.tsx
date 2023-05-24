import React, { useState } from 'react';
import DraggableComponent from './DraggableComponent';
import { DroppedComponent } from '../interfaces/DroppedComponent';

const DropZone: React.FC = () => {
	/** Track cursor position to know where to place dropped component **/

	const [cursorPositionX, setCursorPositionX] = useState<number>(0)
	const [cursorPositionY, setCursorPositionY] = useState<number>(0)

	const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);

	/** Track largest z-index to apply to component when it is clicked **/

	const [largestZIndex, setlargestZIndex] = useState(0)

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
					largestZIndex={largestZIndex}
					setLargestZIndex={setlargestZIndex}
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
