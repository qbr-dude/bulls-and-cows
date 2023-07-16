import { createStore, createEvent } from 'effector';

export const addToPrevious = createEvent<PreviousAttemptType>();

export type PreviousAttemptType = {
    values: number[],
    bulls: number,
    cows: number,
}

export const $previous = createStore<PreviousAttemptType[]>([])
    .on(addToPrevious, (state, att) => {
        if (state.length < 10)
            return [att, ...state];
        else
            return [att, ...state.slice(1)];
    });
