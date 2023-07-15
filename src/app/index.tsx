import React, { useEffect } from 'react';
import './index.css';
import GameInput from './../widgets/game-input'
import { useStore } from 'effector-react';
import { $gameOver } from '../shared/game';
import { $result } from '../shared/game/init';
import { newGame } from './../shared/game/init';
import PreviousAttempts from './../widgets/previous-attemps';
import BullsAndCows from '../widgets/bulls-and-cows';

function App() {
	const gameOver = useStore($gameOver);
	const result = useStore($result);

	useEffect(() => newGame(), []);

	return (
		<div className='h-screen w-screen bg-main'>
			<div className='flex h-full w-full justify-center items-center'>
				<div className='flex flex-col'>
					<BullsAndCows />
					<GameInput />
					<PreviousAttempts />
				</div>
				{/* <div>
					STATE
				</div> */}
			</div>
		</div>
	);
}

export default App;
