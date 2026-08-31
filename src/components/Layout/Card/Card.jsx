import { Link } from "react-router-dom";

const Card = ({
    title,
    button,
    children,
    className = "",
}) => {
    return (
        <div
            className={`
            bg-white
            flex
            justify-between
            items-center
            dark:bg-slate-900
            rounded-xl
            shadow-md
            border
            border-slate-200
            dark:border-slate-700
            ${className}
            `}
        >
            {title && (
                <div
                    className="
                        px-6 py-4
                        border-b
                        text-gray-800 dark:text-gray-50
                        border-slate-200
                        dark:border-slate-700
                    "
                >
                    <h3 className="font-semibold text-lg">
                        {title}
                    </h3>

                    {button && (
                        <Link 
                            className="px-3 py-1 bg-purple-700 text-white rounded-lg"
                            to={`/${button}/novo`}
                        >
                            novo
                        </Link>
                    )}
                </div>
            )}

            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default Card;