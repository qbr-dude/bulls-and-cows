import React, { useEffect, useRef } from 'react'
import { DigitInput } from '../../../shared/uikit/input';
import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

type UpdateProps = {
    id: number,
    value: number | '',
};

const update = createEvent<UpdateProps>();

const $values = createStore<(number | '')[]>(['', '', '', ''])
    .on(update, (state, { id, value }) =>
        state.map((val, index) => index === id ? value : val));

const $focusedCell = createStore<number>(0)
    .on(update, (state, { id }) => id + 1);

const GameInputModel = () => {
    const values = useStore($values);
    const focusedCell = useStore($focusedCell);
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        refs.current[focusedCell]?.focus();
    }, [focusedCell, values])

    return (
        <div className='my-5 flex'>
            {[0, 1, 2, 3].map(id => (
                <div className='mx-2' key={id}>
                    <DigitInput
                        value={values[id]}
                        onChange={(value) => update({ id, value })}
                        ref={el => refs.current[id] = el}
                    />
                </div>
            ))}
        </div>
    )
}

export default GameInputModel;