import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Select({ value, onChange, options, placeholder = 'Select...', className }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full bg-surface border border-border rounded-input text-sm text-primary',
          'h-11 pl-4 pr-8 appearance-none focus:outline-none focus:border-blue/60 focus:ring-1 focus:ring-blue/20 transition-all',
          !value && 'text-muted',
          className
        )}
      >
        <option value="" disabled hidden>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-card text-primary">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
      />
    </div>
  )
}

export function DropdownMenu({ trigger, items, align = 'right' }) {
  const ref = useRef(null)

  return (
    <div className="relative inline-block" ref={ref}>
      {trigger}
    </div>
  )
}
