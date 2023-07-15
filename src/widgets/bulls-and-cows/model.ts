import { createEffect, createStore, sample } from "effector";
import { updateBulls, updateCows } from "../../shared/game";

const abortableDelay = createEffect(() =>
    new Promise<void>(resolve => setTimeout(() => resolve(), 1000)))

export const $hasBullsChanges = createStore(false)
    .on(updateBulls, () => true)
    .reset(abortableDelay.done);

export const $hasCowsChanges = createStore(false)
    .on(updateCows, () => true)
    .reset(abortableDelay.done);

sample({
    clock: [updateBulls, updateCows],
    target: abortableDelay
})