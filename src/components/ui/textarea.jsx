import React from 'react';

const Textarea = ({
    required = false,
    name,
    placeholder,
    value,
    onChange,
    maxLength,
    rows = 4,
    className = "",
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
        <textarea
            required={required}
            maxLength={maxLength}
            rows={rows}
            value={value}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
            className={`
                mt-1 block w-full rounded-xl border border-purple-200 bg-field
                px-3.5 py-2.5 text-sm placeholder:text-slate-400 resize-none uppercase
                focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20
                dark:border-white/10 dark:placeholder:text-purple-200/30
                dark:[color-scheme:dark]
                ${className}
            `}
        />
    );
};

export default Textarea;
