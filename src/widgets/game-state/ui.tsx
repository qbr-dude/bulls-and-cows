import React from 'react'
import Timer from './timer';
import { useStore } from 'effector-react';
import { $generalGames } from '../../shared/game/init';

type Props = {}

const GameState = (props: Props) => {
    const games = useStore($generalGames);
    return (
        <div className='p-10 bg-medium-main rounded flex flex-col text-second '>
            <span className='text-3xl font-medium mb-2'>
                Game State
            </span>
            <Timer />
            <div>
                Number of games: {games}
            </div>
        </div>
    )
}

export default GameState;