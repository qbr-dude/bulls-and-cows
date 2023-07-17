import { createStore, createEvent, restore } from 'effector';
import { newGame } from './init';

export const addToPrevious = createEvent<PreviousAttemptType>();

export type PreviousAttemptType = {
    values: number[],
    bulls: number,
    cows: number,
}

export const $previousList = createStore<PreviousAttemptType[]>([])
    .on(addToPrevious, (state, att) => [att, ...state]);

export const $timer = createStore<Date>(new Date())
    .on(newGame, () => new Date())


export const updateBulls = createEvent<number>();
export const updateCows = createEvent<number>();

export const $bulls = restore(updateBulls, 0).reset(newGame);
export const $cows = restore(updateCows, 0).reset(newGame);