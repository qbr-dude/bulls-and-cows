import React from 'react'
import { useStore } from 'effector-react';
import { $bulls, $cows } from '../../shared/game';

import { ReactComponent as Bull } from './../../shared/svg/bull.svg';
import { ReactComponent as Cow } from './../../shared/svg/cow.svg';
import classNames from 'classnames';
import { $hasBullsChanges, $hasCowsChanges } from './model';

const BullsAndCows = () => {
    const bulls = useStore($bulls);
    const cows = useStore($cows);
    const hasBullsChanges = useStore($hasBullsChanges);
    const hasCowsChanges = useStore($hasCowsChanges);

    return (
        <div className='flex h-24'>
            <div className='relative flex justify-center items-center w-24 mr-8'>
                <Bull width={150} height={150} className='absolute right-8 bottom-0' />
                <span className={classNames(
                    'z-10 text-6xl text-third transition-transform duration-150 ease-in',
                    { 'scale-110': hasBullsChanges }
                )}>
                    {bulls}
                </span>
            </div>
            <div className='relative flex justify-center items-center w-24'>
                <Cow width={150} height={150} className='absolute bottom-0 left-8' />
                <span className={classNames(
                    'z-10 text-6xl text-second transition-transform duration-150 ease-in',
                    { 'scale-110': hasCowsChanges }
                )}>
                    {cows}
                </span>
            </div>
        </div>
    )
}

export default BullsAndCows;