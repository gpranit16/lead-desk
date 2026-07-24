import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { cn } from '../../lib/utils'

export default function AdminTopbar({ title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-border bg-surface flex-shrink-0">
      {/* Left: Page title */}
      <h1 className="font-display text-base font-semibold text-primary">{title}</h1>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-muted hover:text-primary transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue" />
        </button>

        {/* Avatar + User */}
        {user && (
          <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
            <div className="w-7 h-7 rounded-full bg-blue/20 flex items-center justify-center">
              <span className="font-mono text-[10px] font-semibold text-blue">
                {user.name?.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-secondary hidden md:block">{user.name}</span>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red/10 text-muted hover:text-red transition-colors ml-1"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  )
}
