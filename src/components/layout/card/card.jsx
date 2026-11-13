
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import Button from "../../ui/button";

const Card = ({
    title,
    button,
    actions,
    children,
    className = "",
}) => {
    return (
        <div
            className={`
            rounded-2xl
            border
            border-purple-200/70
            dark:border-white/10
            bg-surface
            backdrop-blur-xl
            shadow-[0_20px_50px_-24px_rgba(91,33,182,0.35)]
            dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)]
            ${className}
            `}
        >
            {title && (
                <div
                    className="
                        flex
                        justify-between
                        items-center
                        px-6 py-4
                        border-b
                        border-purple-100
                        dark:border-white/10
                    "
                >
                    <h3 className="font-semibold text-base tracking-tight">
                        {title}
                    </h3>
                    {actions}
                    {button && (
                        <Link
                            to={`/${button}/novo`}>
                            <Button
                                className="
                                btn-primary
                                inline-flex
                                items-center
                                gap-1.5
                                ">
                                <HiPlus /> Novo
                            </Button>
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
