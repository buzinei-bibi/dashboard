import { Link } from 'react-router-dom'
import { HiPlus } from 'react-icons/hi'

const Card = ({ title, button, children, className = '' }) => {
  return (
    <div
      className={`rounded-2xl border border-purple-200/70 dark:border-white/10 bg-surface backdrop-blur-xl shadow-[0_20px_50px_-24px_rgba(91,33,182,0.35)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.8)] ${className}`}
    >
      {title && (
        <div className="px-6 py-4 flex items-center justify-between border-b border-purple-100 dark:border-white/10">
          <h3 className="font-semibold text-base tracking-tight">{title}</h3>

          {button && (
            <Link to={`/${button}/novo`} className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm">
              <HiPlus /> NOVO
            </Link>
          )}
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  )
}

export default Card
