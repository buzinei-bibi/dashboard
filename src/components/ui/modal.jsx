import React from 'react'
import Button from './button'

export default function Modal({
  open = false,
  title = 'Excluir item?',
  description = 'Tem certeza de que deseja excluir este item? Essa ação não pode ser desfeita.',
  confirmLabel = 'Excluir',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-purple-950/40 dark:bg-black/60 backdrop-blur-sm px-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel?.()
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-purple-200/70 dark:border-white/10 bg-app p-6 shadow-[0_20px_50px_-24px_rgba(91,33,182,0.6)] dark:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <h2 id="delete-modal-title" className="text-lg font-semibold">
          {title}
        </h2>

        <p id="delete-modal-description" className="mt-2 text-sm text-slate-600 dark:text-purple-200/70">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            className="border border-purple-200 dark:border-white/15 text-purple-700 dark:text-purple-200 hover:bg-purple-200/40 dark:hover:bg-white/10"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            className="bg-red-600 text-white hover:bg-red-700 shadow-[0_10px_30px_-10px_rgba(220,38,38,0.6)]"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
