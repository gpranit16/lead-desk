import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const variants = {
  primary: 'bg-primary text-bg hover:bg-primary/90 active:scale-[0.98]',
  secondary: 'bg-transparent border border-border text-secondary hover:border-muted hover:text-primary',
  ghost: 'bg-transparent text-secondary hover:text-primary hover:bg-white/4',
  danger: 'bg-red/10 border border-red/25 text-red hover:bg-red/20',
  blue: 'bg-blue text-white hover:bg-blue/90 active:scale-[0.98]',
  outline: 'bg-transparent border border-border text-primary hover:bg-white/4',
}

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-button',
  md: 'h-10 px-4 text-sm rounded-button',
  lg: 'h-12 px-6 text-base rounded-button',
  xl: 'h-14 px-8 text-base rounded-button',
  icon: 'h-9 w-9 rounded-xl',
}

const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/50 disabled:opacity-40 disabled:cursor-not-allowed select-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {children}
        </span>
      ) : children}
    </motion.button>
  )
})

export default Button
