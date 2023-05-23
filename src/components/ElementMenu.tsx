import React from 'react'

export const ElementMenu = () => {

	const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		event.dataTransfer?.setData('text/plain', target.innerText);
	};

	return (
		<div className="menu-container">
			<div className="menu-item" draggable={true} onDragStart={handleDragStart}>
				<button className='new-note'>New Note (click this button and drag it below)</button>
			</div>
		</div>
	)
}
