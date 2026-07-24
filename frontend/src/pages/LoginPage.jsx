import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, Lock, Zap, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    setError(null)
    const result = await login(data.email, data.password)
    if (result.success) {
      navigate('/admin/dashboard')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-bg grid-bg flex items-center justify-center relative overflow-hidden">
      <div className="noise-overlay" />
      <div className="radial-glow absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-blue rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue/20">
            <Zap size={22} className="text-white fill-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-primary tracking-tight">
            LeadDesk <span className="text-blue">Pro</span>
          </h1>
          <p className="text-xs text-muted mt-1">Admin Control Panel</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-card p-8">
          <div className="mb-6">
            <h2 className="font-display text-lg font-semibold text-primary">Sign in</h2>
            <p className="text-xs text-muted mt-1">Enter your admin credentials to continue.</p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl bg-red/10 border border-red/25 text-xs text-red"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="admin@leaddesk.pro"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-secondary uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock size={15} className="text-muted" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className={`w-full bg-surface border rounded-input text-sm text-primary placeholder:text-muted h-11 pl-9 pr-10 focus:outline-none transition-all duration-200 ${
                    errors.password
                      ? 'border-red/50 focus:border-red/70 focus:ring-1 focus:ring-red/20'
                      : 'border-border focus:border-blue/60 focus:ring-1 focus:ring-blue/20'
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-secondary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red inline-block" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border bg-surface accent-blue"
                {...register('rememberMe')}
              />
              <span className="text-xs text-secondary">Remember me for 30 days</span>
            </label>

            <Button
              type="submit"
              variant="blue"
              size="lg"
              loading={isSubmitting}
              className="w-full mt-2"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-muted mt-6">
            Don't have access?{' '}
            <span className="text-secondary">Contact your administrator.</span>
          </p>
        </div>

        {/* Back link */}
        <p className="text-center mt-4">
          <a href="/" className="text-xs text-muted hover:text-secondary transition-colors">
            ← Back to LeadDesk Pro
          </a>
        </p>
      </motion.div>
    </div>
  )
}
