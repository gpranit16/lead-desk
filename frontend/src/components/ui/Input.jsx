import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Input = forwardRef(function Input(
  { className, label, error, icon: Icon, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-secondary tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Icon size={15} className="text-muted" />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-surface border border-border rounded-input text-sm text-primary placeholder:text-muted transition-all duration-200',
            'focus:outline-none focus:border-blue/60 focus:ring-1 focus:ring-blue/20',
            'h-11',
            Icon ? 'pl-9 pr-4' : 'px-4',
            error && 'border-red/50 focus:border-red/70 focus:ring-red/20',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red inline-block" />
          {error}
        </p>
      )}
    </div>
  )
})

export default Input
