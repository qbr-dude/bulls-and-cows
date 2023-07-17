export const formatTime = (time: number): string =>
    (time - (time %= 60)) / 60 + (9 < time ? ':' : ':0') + time;

export const delay = (delay: number) => new Promise<void>(resolve => setTimeout(() => resolve(), delay))

