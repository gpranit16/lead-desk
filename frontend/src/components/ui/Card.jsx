import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function Card({ children, className, hover = false, ...props }) {
  return (
    <motion.div
      initial={false}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={cn(
        'bg-card border border-border rounded-card',
        hover && 'cursor-pointer transition-colors hover:border-border/80',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-6 pt-6 pb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={cn('text-base font-semibold text-primary', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('px-6 pb-6', className)} {...props}>
      {children}
    </div>
  )
}

export function StatCard({ label, value, icon: Icon, color = 'blue', change, glowClass, children }) {
  const colorMap = {
    blue: { icon: 'text-blue', bg: 'bg-blue/10', border: 'border-blue/20', glow: 'stat-glow-blue' },
    purple: { icon: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/20', glow: 'stat-glow-purple' },
    green: { icon: 'text-green', bg: 'bg-green/10', border: 'border-green/20', glow: 'stat-glow-green' },
    orange: { icon: 'text-orange', bg: 'bg-orange/10', border: 'border-orange/20', glow: 'stat-glow-orange' },
  }
  const c = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('bg-card border rounded-card p-6 flex flex-col gap-4', c.border, c.glow)}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-muted uppercase tracking-widest">{label}</p>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', c.bg)}>
          {Icon && <Icon size={16} className={c.icon} />}
        </div>
      </div>
      <div>
        <p className="font-num text-3xl font-semibold text-primary tracking-tight">
          {value}
        </p>
        {change !== undefined && (
          <p className="mt-1 text-xs text-muted">
            <span className={change >= 0 ? 'text-green' : 'text-red'}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            {' '}vs last period
          </p>
        )}
      </div>
      {children}
    </motion.div>
  )
}
