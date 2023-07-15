import React from 'react';
import './index.css';
import GameInput from './../widgets/game-input'

function App() {
	return (
		<div className='h-screen w-screen bg-main'>
			<div className='flex'>
				<GameInput />
			</div>
		</div>
	);
}

export default App;
