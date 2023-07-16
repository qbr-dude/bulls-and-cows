import React from 'react'
import { PreviousAttemptType } from '../../shared/game/state';
import classNames from 'classnames';

import { ReactComponent as Bull } from './../../shared/svg/bull.svg';
import { ReactComponent as Cow } from './../../shared/svg/cow.svg';
import { ReactComponent as Angle } from './../../shared/svg/angle.svg';

type AttemptHintProps = {
    isActive: boolean
} & Omit<PreviousAttemptType, 'values'>

const AttemptHint = ({ isActive, bulls, cows }: AttemptHintProps) => (
    <div className={classNames(
        'absolute -right-5 -top-5 py-2 px-5 bg-medium-main rounded-md translate-x-full',
        { 'block': isActive, 'hidden': !isActive }
    )}>
        <div className='flex'>
            <span className='text-2xl mr-2 text-third'>{bulls}</span>
            <Bull width={40} height={40} transform='scale(-1, 1)' />
        </div>
        <div className='flex'>
            <span className='text-2xl mr-2 text-second'>{cows}</span>
            <Cow width={40} height={40} />
        </div>
        <Angle width={20} height={20} className='absolute -left-3 top-10' />
    </div>
)

export default AttemptHint;