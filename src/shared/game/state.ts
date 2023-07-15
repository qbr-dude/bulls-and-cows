import { createStore, createEvent } from 'effector';

export const addToPrevious = createEvent<number[]>();

export const $previous = createStore<number[][]>([])
    .on(addToPrevious, (state, att) => [...state, att]);
