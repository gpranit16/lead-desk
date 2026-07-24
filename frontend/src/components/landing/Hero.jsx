import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Leads Captured', value: '12,847', icon: Users },
  { label: 'Conversion Rate', value: '34.2%', icon: Target },
  { label: 'Revenue Tracked', value: '$2.4M', icon: TrendingUp },
]

function AnimatedStat({ stat, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center">
        <stat.icon size={16} className="text-blue" />
      </div>
      <div>
        <p className="font-num text-xl font-semibold text-primary">{stat.value}</p>
        <p className="text-xs text-muted">{stat.label}</p>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouse = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left - rect.width / 2) / 30)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / 30)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100" />

      {/* Radial glow */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 radial-glow pointer-events-none"
      />

      {/* Animated particles */}
      <Particles />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs text-secondary mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          Now in Beta — Free for the first 500 users
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          Capture Every
          <br />
          <span className="gradient-text-blue">Opportunity.</span>
          <br />
          Turn Visitors Into
          <br />
          Customers.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base md:text-lg text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          LeadDesk Pro is the modern CRM built for teams who move fast. Collect leads from your website, track every touchpoint, and close deals — all from a single, beautiful dashboard.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-4 mb-16 flex-wrap"
        >
          <a href="#contact">
            <Button variant="blue" size="lg" className="gap-2">
              Start Capturing Leads
              <ArrowRight size={16} />
            </Button>
          </a>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Admin Login
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-8 md:gap-12 flex-wrap"
        >
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} delay={0.5 + i * 0.1} />
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  )
}

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
