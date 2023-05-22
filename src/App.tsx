import React from 'react';
import './App.css';
import { ElementMenu } from './components/ElementMenu';
import DraggableComponent from './components/DraggableComponent';
import DropZone from './components/DropZone';

function App() {
	return (
		<div className="App">
			<ElementMenu />
			{/* <DraggableComponent /> */}
			<DropZone />

		</div>
	);
}

export default App;
