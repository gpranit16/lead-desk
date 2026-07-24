import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogOut, Mail, User, Shield, Calendar } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'
import { formatDate } from '../lib/utils'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-primary">Profile</h1>
        <p className="text-xs text-muted mt-0.5">Your admin account information</p>
      </div>

      {/* Avatar Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue/15 border border-blue/25 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-xl font-bold text-blue">
              {user?.name?.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-primary">{user?.name}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Shield size={12} className="text-blue" />
              <span className="text-xs text-blue">Administrator</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-card divide-y divide-border"
      >
        {[
          { icon: User, label: 'Full Name', value: user?.name },
          { icon: Mail, label: 'Email Address', value: user?.email },
          {
            icon: Calendar,
            label: 'Account Created',
            value: user?.createdAt ? formatDate(user.createdAt) : 'N/A',
          },
          { icon: Shield, label: 'Role', value: 'Super Admin' },
        ].map((field) => (
          <div key={field.label} className="flex items-center gap-4 px-6 py-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              <field.icon size={14} className="text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted uppercase tracking-widest mb-0.5">{field.label}</p>
              <p className="text-sm text-primary truncate">{field.value || '—'}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-red/20 rounded-card p-6"
      >
        <h3 className="font-display text-sm font-semibold text-primary mb-1">Sign Out</h3>
        <p className="text-xs text-muted mb-4">
          You'll be redirected to the login page after signing out.
        </p>
        <Button variant="danger" size="md" onClick={handleLogout} className="gap-2">
          <LogOut size={14} />
          Sign Out
        </Button>
      </motion.div>
    </div>
  )
}
