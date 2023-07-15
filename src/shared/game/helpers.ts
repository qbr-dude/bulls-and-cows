export const randomDigits = (size: number): number[] => {
    let result: number[] = [];
    let current = Math.round(Math.random() * 10);
    for (let i = 0; i < 4; i++) {
        while (result.includes(current) || current > 9)
            current = Math.round(Math.random() * 10);
        result.push(current);
    }
    return result;
}