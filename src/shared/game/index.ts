import { restore, createEvent, createEffect } from 'effector';
import { $result, newGame } from './init';
import { addToPrevious } from './state';

export const updateBulls = createEvent<number>();
export const updateCows = createEvent<number>();

export const $bulls = restore(updateBulls, 0).reset(newGame);
export const $cows = restore(updateCows, 0).reset(newGame);

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

export const $gameOver = restore(validateAnswerFx.doneData, false).reset(newGame);