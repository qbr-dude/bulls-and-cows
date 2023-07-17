import React from 'react'
import { useStore } from 'effector-react';
import { $timer } from '../../shared/game/state';
import { formatTime } from './../../shared/utils/index';

const Timer = () => {
    const timer = useStore($timer);

    return (
        <div>Time: <span className='font-medium'>{formatTime(timer)}</span></div>
    )
}

export default Timer;