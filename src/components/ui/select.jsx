import React from 'react';

const Select = ({
    required = false,
    name,
    value,
    onChange,
    options = [],
    placeholder = 'Selecione...',
    className = '',
}) => {

    const handleChange = (e) => {
        onChange({
            target: {
                name,
                value: e.target.value,
            },
        });
    };

    return (
        <select
            required={required}
            name={name}
            value={value}
            onChange={handleChange}
            className={`
                mt-1 block w-full rounded-xl border border-purple-200 bg-field
                px-3.5 py-2.5 text-sm uppercase
                focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20
                dark:border-white/10
                dark:[color-scheme:dark]
                ${className}
            `}
        >
            <option value="">
                {placeholder}
            </option>

            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
