import React, { useEffect, useRef } from 'react';
import './index.css';
import GameInput from './../widgets/game-input'
import { useStore } from 'effector-react';
import { $gameResult, newGame } from '../shared/game';
import PreviousAttempts from './../widgets/previous-attemps';
import BullsAndCows from '../widgets/bulls-and-cows';
import Modal from '../shared/uikit/modal';
import { closeModal, openModal } from '../shared/uikit/modal/ui';
import { formatTime } from './../shared/utils/index';
import GameState from '../widgets/game-state';

function App() {
	const gameOver = useStore($gameResult);
	const winModal = useRef(null);

	const startNewGame = () => {
		newGame();
		closeModal(winModal);
	}

	useEffect(() => startNewGame(), []);
	useEffect(() => { if (gameOver) openModal(winModal) }, [gameOver])

	return (
		<>
			<div className='h-screen w-screen bg-main flex justify-center'>
				<div className='flex'>
					<div className='flex flex-col flex-1 pt-20'>
						<BullsAndCows />
						<GameInput />
						<PreviousAttempts />
					</div>
					<div className='flex-0 ml-32 pt-24'>
						<GameState />
					</div>
				</div>
			</div>
			<Modal ref={winModal}>
				{gameOver && <div className='flex flex-col bg-dark-main p-10 text-second'>
					<span className='text-5xl font-medium '>You won!</span>
					<span>In {gameOver?.turns} turns</span>
					<span>With time: {formatTime(gameOver?.time!)} (NEW RECORD)</span>
					<button onClick={startNewGame}>Start new game</button>
				</div>}
			</Modal>
		</>
	);
}

export default App;
