import { createEffect, createEvent, createStore, sample } from "effector";
import { randomDigits } from "./helpers";

export const newGame = createEvent();

export const $result = createStore<number[]>([])
    .on(newGame, (state) => randomDigits(4))
