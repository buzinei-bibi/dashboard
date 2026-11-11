import React from 'react'

const Input = ({
    required,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    maxLength,
    mask,
    className = "",
}) => {

    const applyMask = (value, mask) => {
        if (!mask) return value;

        // Máscara monetária
        if (mask === "money") {
            const numbers = value.replace(/\D/g, "");

            if (!numbers) return "";

            const amount = (parseInt(numbers, 10) / 100).toFixed(2);

            return amount.replace(".", ",").replace(
                /\B(?=(\d{3})+(?!\d))/g,
                "."
            );
        }

        let maskedValue = "";
        let valueIndex = 0;

        const numbers = value.replace(/\D/g, "");

        for (
            let maskIndex = 0;
            maskIndex < mask.length && valueIndex < numbers.length;
            maskIndex++
        ) {
            if (mask[maskIndex] === "9") {
                maskedValue += numbers[valueIndex];
                valueIndex++;
            } else {
                maskedValue += mask[maskIndex];
            }
        }

        return maskedValue;
    };

    const handleChange = (e) => {
        const maskedValue = applyMask(e.target.value, mask);

        onChange({
            target: {
                name,
                value: maskedValue,
            },
        });
    };

    return (
        <input
            required={required}
            maxLength={maxLength}
            type={type}
            value={value}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
            className={`
                mt-1 block w-full rounded-xl border border-purple-200 bg-field
                px-3.5 py-2.5 text-sm placeholder:text-slate-400
                focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20
                dark:border-white/10 dark:placeholder:text-purple-200/30
                dark:[color-scheme:dark]
                ${className}
            `}
        />
    );
};

export default Input;
