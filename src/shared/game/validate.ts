import {  createEffect, createStore, forward } from 'effector';
import { $result} from './init';
import { $bulls, $cows, $previousList, $timer, addToPrevious, updateBulls, updateCows, stopTimer } from './state';
import { sample } from 'effector';

export const validateAnswerFx = createEffect<number[], boolean, void>((ans) => {
    const result = $result.getState();
    if (ans.every((a, i) => a === result[i])) {
        return Promise.resolve(true);
    } else {
        let cows = 0, bulls = 0;
        ans.forEach((digit, index) => {
            result.indexOf(digit) === index && bulls++;
            result.includes(digit) && cows++;
        })
        if (bulls !== $bulls.getState())
            updateBulls(bulls);
        if (cows !== $cows.getState())
            updateCows(cows);
        addToPrevious({ values: ans, bulls, cows });
        return Promise.reject();
    }
});

type GameResultType = {
    turns: number,
    time: number,
}

export const $gameResult = createStore<GameResultType | null>(null);

sample({
    source: { previous: $previousList, timer: $timer },
    clock: validateAnswerFx.doneData,
    fn: ({ previous, timer }) => ({
        turns: previous.length,
        time: timer
    }),
    target: $gameResult
})

forward({
    from: validateAnswerFx.done,
    to: stopTimer
})