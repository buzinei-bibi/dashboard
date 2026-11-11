import React from 'react'

const Button = ({
    className = 'btn-primary',
    children,
    type = 'button',
    onClick
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                px-4 py-2
                rounded-xl
                transition-colors
                cursor-pointer
                text-sm
                font-semibold
                ${className}
            `}
        >
            {children}
        </button>
    )
}

export default Button
