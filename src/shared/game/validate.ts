import { restore, createEffect, createStore } from 'effector';
import { $result, newGame } from './init';
import { $bulls, $cows, $previousList, $timer, addToPrevious, updateBulls, updateCows } from './state';
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
    time: Date,
}

export const $gameResult = createStore<GameResultType | null>(null);

sample({
    source: { previous: $previousList, timer: $timer },
    clock: validateAnswerFx.doneData,
    fn: ({ previous, timer }) => ({
        turns: previous.length,
        time: new Date(Date.now() - timer.getTime())
    }),
    target: $gameResult
})