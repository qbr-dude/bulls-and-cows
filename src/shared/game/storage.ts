
import { createEffect, createStore } from 'effector';

export const saveConfig = createEffect((data: any) => {
    localStorage.setItem('game', JSON.stringify(data, null))
})

export const loadConfig = createEffect(() => {
    return JSON.parse('game');
})

export const gameConfig = createStore({})
    .on(loadConfig.done, (state, { result }) => result);