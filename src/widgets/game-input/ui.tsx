import React, { useEffect, useRef } from 'react'
import { DigitInput } from '../../shared/uikit/input';
import { useStore } from 'effector-react';

import { $focusedCell, $unsetted, $values, handleKeyPress, update } from './model'

const GameInputModel = () => {
    const values = useStore($values);
    const focusedCell = useStore($focusedCell);
    const unsetted = useStore($unsetted);
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        refs.current[focusedCell]?.focus();
    }, [focusedCell, values]);

    useEffect(() => {
        if (!unsetted)
            return;
        // TODO find better option
        refs.current.forEach(ref => ref?.classList.remove('bg-clip-content', 'border-red-400', 'border-4'));
        unsetted.forEach(id => {
            refs.current[id]?.classList.add('bg-clip-content', 'border-red-400', 'border-4');
        });
    }, [unsetted])

    return (
        <div className='my-5 flex'>
            {[0, 1, 2, 3].map(id => (
                <div className='mx-2' key={id}>
                    <DigitInput
                        value={values[id]}
                        ref={el => refs.current[id] = el}
                        onChange={(value) => update({ id, value })}
                        onKeyPress={(e) => handleKeyPress(e, id)}
                    />
                </div>
            ))}
        </div>
    )
}

export default GameInputModel;