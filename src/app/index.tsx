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
		<div className='h-screen w-screen bg-main flex justify-center'>
			<div className='flex'>
				<div className='flex flex-col flex-1 pt-20'>
					<BullsAndCows />
					<GameInput />
					<PreviousAttempts />
				</div>
				<div className='flex-0'>
					STATE
				</div>
			</div>
		</div>
	);
}

export default App;
