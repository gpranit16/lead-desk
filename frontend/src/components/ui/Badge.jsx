import { getStatusConfig } from '../../lib/utils'
import { cn } from '../../lib/utils'

export function Badge({ status, className }) {
  const config = getStatusConfig(status)
  return (
    <span className={cn(config.className, className)}>
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: config.dot }}
      />
      {config.label}
    </span>
  )
}

export function TagBadge({ children, color = 'default' }) {
  const colorMap = {
    default: 'bg-white/5 text-secondary border-border',
    blue: 'bg-blue/10 text-blue border-blue/20',
    green: 'bg-green/10 text-green border-green/20',
    red: 'bg-red/10 text-red border-red/20',
    orange: 'bg-orange/10 text-orange border-orange/20',
    purple: 'bg-purple/10 text-purple border-purple/20',
  }
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md border',
      colorMap[color]
    )}>
      {children}
    </span>
  )
}
