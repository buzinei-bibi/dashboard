import { useEffect } from 'react'

// janela de confirmação (usada para excluir)
const Modal = ({
  open = false,
  title = 'EXCLUIR ITEM?',
  description = 'TEM CERTEZA DE QUE DESEJA EXCLUIR ESTE ITEM? ESSA AÇÃO NÃO PODE SER DESFEITA.',
  confirmLabel = 'EXCLUIR',
  cancelLabel = 'CANCELAR',
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!open) return
    const fecharNoEsc = (e) => e.key === 'Escape' && onCancel?.()
    window.addEventListener('keydown', fecharNoEsc)
    return () => window.removeEventListener('keydown', fecharNoEsc)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-purple-950/40 dark:bg-black/60 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onCancel?.()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        aria-describedby="modal-descricao"
        className="w-full max-w-md rounded-2xl border border-purple-200/70 dark:border-white/10 bg-app p-6 shadow-[0_20px_50px_-24px_rgba(91,33,182,0.6)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)]"
      >
        <h2 id="modal-titulo" className="text-lg font-semibold">{title}</h2>
        <p id="modal-descricao" className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">{description}</p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-purple-200 dark:border-white/15 text-purple-700 dark:text-purple-200 text-sm font-semibold hover:bg-purple-200/40 dark:hover:bg-white/10 cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(220,38,38,0.6)] cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
