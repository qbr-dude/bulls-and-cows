import React from 'react'
import { useStore } from 'effector-react';
import { $previous } from '../../shared/game/state';

type Props = {}

const PreviousAttempts = (props: Props) => {
    const previous = useStore($previous);
    return (
        <div>
            {previous.map((attempt, index) => (
                <span key={index}>{attempt.join('')}</span>
            ))}
        </div>
    )
}

export default PreviousAttempts;