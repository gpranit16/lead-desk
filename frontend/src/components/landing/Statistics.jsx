import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const metrics = [
  { value: 12847, label: 'Leads Captured', suffix: '+', prefix: '' },
  { value: 34, label: 'Avg. Conversion Rate', suffix: '%', prefix: '' },
  { value: 2.4, label: 'Revenue Tracked', suffix: 'M', prefix: '$' },
  { value: 98, label: 'Uptime Guarantee', suffix: '%', prefix: '' },
]

function useCounter(target, duration = 2000, isDecimal = false) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime = null
    const start = 0
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(isDecimal ? +(start + eased * (target - start)).toFixed(1) : Math.floor(start + eased * (target - start)))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration, isDecimal])

  return { count, ref }
}

function StatCounter({ metric }) {
  const isDecimal = !Number.isInteger(metric.value)
  const { count, ref } = useCounter(metric.value, 2200, isDecimal)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="font-num text-5xl md:text-6xl font-bold text-primary mb-2 tracking-tight">
        {metric.prefix}{count.toLocaleString()}{metric.suffix}
      </p>
      <p className="text-sm text-muted">{metric.label}</p>
    </motion.div>
  )
}

export default function Statistics() {
  return (
    <section id="stats" className="py-32 border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue/3 via-transparent to-purple/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Numbers that speak
            <br />
            for themselves.
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {metrics.map((metric) => (
            <StatCounter key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  )
}
