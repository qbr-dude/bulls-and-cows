import { createEvent, createEffect, createStore } from 'effector';
import { validateAnswerFx } from './../../shared/game/index';
import { sample } from 'effector';


type UpdateProps = {
    id: number,
    value: number | '',
};

export const update = createEvent<UpdateProps>();
export const clearInput = createEvent();
export const moveFocus = createEvent<UpdateProps['id']>();

export const enterPressFx = createEffect<UpdateProps['id'], UpdateProps['value'][], number[]>((id) => {
    const values = $values.getState();
    const unsetted = values
        .map((value, index) => value === '' ? index : null)
        .filter(index => index !== null);
    if (unsetted.length) {
        moveFocus(unsetted[0]!); // move to first unsetted
        return Promise.reject(unsetted)
    } else {
        clearInput();
        moveFocus(0);
        return Promise.resolve(values);
    }
});

export const $values = createStore<(number | '')[]>(['', '', '', ''])
    .on(update, (state, { id, value }) =>
        state.map((val, index) => index === id ? value : val))
    .reset(clearInput);

export const $focusedCell = createStore<number>(0)
    .on(update, (state, { id }) => id + 1)
    .on(moveFocus, (state, id) => id);

export const $unsetted = createStore<number[]>([])
    .on(enterPressFx.failData, (state, unsetted) => [...unsetted])
    .on(update, (state, { id }) => state.filter(index => id !== index));

sample({
    source: enterPressFx.doneData,
    fn: (values) => values as number[],
    target: validateAnswerFx,
})

export const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    switch (e.key) {
        case 'ArrowLeft':
            moveFocus(id - 1);
            return;
        case 'ArrowRight':
            moveFocus(id + 1);
            return;
        case 'Enter':
            enterPressFx(id);
            return;
        case 'Backspace':
            update({ id, value: '' });
            moveFocus(id - 1);
            return;

        default:
            return;
    }
}