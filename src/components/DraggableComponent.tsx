import React from 'react';

interface Props {
	children: React.ReactNode;
}

const DraggableComponent: React.FC<Props> = ({ children }: Props) => {

	const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		event.dataTransfer?.setData('text/plain', target.innerText);
	};
  
	return (
		<div className='draggable-component' draggable={true} onDragStart={handleDragStart}>
			{children}
		</div>
	);
};

export default DraggableComponent;
