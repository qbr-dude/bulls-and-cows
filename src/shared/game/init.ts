import { createEvent, createStore } from "effector";
import { randomDigits } from "./helpers";

export const newGame = createEvent();

export const $result = createStore<number[]>([])
    .on(newGame, (state) => randomDigits(4));

export const $generalGames = createStore(0)
    .on(newGame, (state) => state + 1);

$result.watch(e => console.log(e));
