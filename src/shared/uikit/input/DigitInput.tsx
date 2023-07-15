import React, { forwardRef } from 'react'

type Props = {
    value: number | '',
    onChange: (val: number | '') => void,
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

const DigitInput = forwardRef(({ value, onChange, onKeyPress }: Props, ref: React.Ref<HTMLInputElement>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value.match(/^\d+$/))
            return;
        onChange(parseInt(e.currentTarget.value.at(-1)!));
    }
    /**
     * If you press before the digit, the carriage will stand in front of the digit
     */
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const end = e.currentTarget.value.length;
        e.currentTarget.setSelectionRange(end, end);
        e.currentTarget.focus();
    }

    return (
        <input
            type="text"
            onChange={handleChange}
            onClick={handleClick}
            onKeyUp={onKeyPress}
            className='text-5xl font-medium rounded w-10 h-14 text-center caret-transparent select-none'
            maxLength={2}
            size={1}
            value={value}
            ref={ref}
        />
    )
});

export default DigitInput;