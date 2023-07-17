import { createStore, createEvent, restore, forward, createEffect, guard } from 'effector';
import { newGame } from './init';
import { delay } from '../utils';

export const addToPrevious = createEvent<PreviousAttemptType>();
export const startTimer = createEvent();
export const stopTimer = createEvent();

export type PreviousAttemptType = {
    values: number[],
    bulls: number,
    cows: number,
}

export const $previousList = createStore<PreviousAttemptType[]>([])
    .on(addToPrevious, (state, att) => [att, ...state]);

export const updateBulls = createEvent<number>();
export const updateCows = createEvent<number>();

export const $bulls = restore(updateBulls, 0).reset(newGame);
export const $cows = restore(updateCows, 0).reset(newGame);


const timerTick = createEvent();
const timerFx = createEffect(() => delay(1000));

const $workingTimer = createStore(true);

$workingTimer.on(stopTimer, () => false).reset(startTimer);

forward({
    from: newGame,
    to: startTimer,
})
guard({
    source: startTimer,
    filter: timerFx.pending.map(is => !is),
    target: timerTick,
})
forward({
    from: timerTick,
    to: timerFx,
})
guard({
    source: timerFx.done,
    filter: $workingTimer,
    target: timerTick
})

export const $timer = createStore(0)
    .on(timerFx.done, (state) => state + 1)
    .reset(startTimer);