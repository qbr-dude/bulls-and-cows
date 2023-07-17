import { createEvent, createStore } from "effector";
import { randomDigits } from "./helpers";

export const newGame = createEvent();

export const $result = createStore<number[]>([])
    .on(newGame, (state) => randomDigits(4));

$result.watch(e => console.log(e));
