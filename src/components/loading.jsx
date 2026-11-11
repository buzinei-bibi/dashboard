const Loading = ({ text = "Carregando..." }) => {
    return (
        <div
            className="
                fixed inset-0
                bg-purple-950/40
                dark:bg-black/60
                backdrop-blur-sm
                flex flex-col
                items-center
                justify-center
                gap-4
                z-50
            "
        >
            <span className="h-20 w-20 grid place-items-center rounded-2xl bg-accent shadow-glow">
                <svg
                    className="w-10 h-10 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            </span>

            <p className="text-white text-sm font-semibold tracking-wide">
                {text}
            </p>
        </div>
    );
};

export default Loading;
