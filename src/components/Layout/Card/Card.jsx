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
        dark:bg-slate-900
        rounded-xl
        shadow-md
        border
        border-slate-200
        dark:border-slate-700
        overflow-hidden
        ${className}
      `}
    >
      {title && (
        <div
          className="
            px-6 py-4
            flex
            items-center
            justify-between
            border-b
            border-slate-100
            dark:border-slate-700
            bg-slate-50/50
            dark:bg-slate-800/50
          "
        >
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-50 tracking-tight">
            {title}
          </h3>

          {button && (
            <Link
              className="
                px-4 py-2
                bg-linear-to-b from-purple-600 to-purple-700
                hover:from-purple-700 hover:to-purple-800
                text-white text-sm font-semibold
                rounded-lg
                shadow-sm
                transition-all duration-150
              "
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