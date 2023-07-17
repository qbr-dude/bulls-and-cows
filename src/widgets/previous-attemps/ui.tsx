import React, { useState } from 'react'
import { useStore } from 'effector-react';
import { $previousList, type PreviousAttemptType } from '../../shared/game';

import AttemptHint from './hint';

const Attempt = ({ values, ...rest }: PreviousAttemptType) => {
    const [isHintActive, setIsHintActive] = useState(false);
    return (
        <div
            className='relative mb-2 border border-green-800 py-2 rounded'
            onMouseEnter={() => setIsHintActive(true)}
            onMouseLeave={() => setIsHintActive(false)}
        >
            {values.map((value, index) => (
                <span
                    className='px-5 text-3xl cursor-pointer font-medium'
                    key={`val-${value}-${index}`}
                >
                    {value}
                </span>
            ))}
            <AttemptHint isActive={isHintActive} {...rest} />
        </div>
    )
}

const PreviousAttempts = () => {
    const previous = useStore($previousList).slice(0, 9);
    return (
        <div className=''>
            {previous.map((attempt, index) => (
                <Attempt key={`att-${index}`} {...attempt} />
            ))}
        </div>
    )
}

export default PreviousAttempts;