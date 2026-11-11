import React from 'react'

const Label = ({
    htmlFor,
    children,
    required = false,
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`
                block text-sm font-medium
                text-slate-700
                dark:text-purple-100/80
            `}
        >
            {children}
            {required && (
                <span className="ml-1 text-fuchsia-600 dark:text-fuchsia-400">*</span>
            )}
        </label>
    )
}

export default Label
