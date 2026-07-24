import { motion } from 'framer-motion'
import { Inbox, BarChart3, Bell, ShieldCheck, Zap, Globe } from 'lucide-react'

const features = [
  {
    icon: Inbox,
    title: 'Instant Lead Capture',
    description: 'Beautiful, conversion-optimized forms that embed seamlessly into your website. Every submission lands directly in your dashboard.',
    color: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Real-time charts, conversion metrics, and pipeline visibility. Know exactly where your leads are in the funnel.',
    color: 'purple',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Instant alerts when high-value leads submit enquiries. Never miss a critical opportunity again.',
    color: 'orange',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'JWT authentication, bcrypt encryption, and role-based access control. Your data stays yours.',
    color: 'green',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on MongoDB Atlas with sub-100ms queries. Your team works without friction, at any scale.',
    color: 'blue',
  },
  {
    icon: Globe,
    title: 'API First',
    description: 'Every feature exposed via a clean REST API. Integrate with any tool in your existing tech stack.',
    color: 'purple',
  },
]

const colorMap = {
  blue: { bg: 'bg-blue/10', icon: 'text-blue', border: 'border-blue/20', hover: 'hover:border-blue/40' },
  purple: { bg: 'bg-purple/10', icon: 'text-purple', border: 'border-purple/20', hover: 'hover:border-purple/40' },
  green: { bg: 'bg-green/10', icon: 'text-green', border: 'border-green/20', hover: 'hover:border-green/40' },
  orange: { bg: 'bg-orange/10', icon: 'text-orange', border: 'border-orange/20', hover: 'hover:border-orange/40' },
}

export default function Features() {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-blue uppercase tracking-widest mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Everything you need to
            <br />
            close more deals.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-secondary max-w-2xl mx-auto"
          >
            LeadDesk Pro combines the best parts of enterprise CRMs with the simplicity teams actually want to use.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const c = colorMap[feature.color]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-card border ${c.border} ${c.hover} rounded-card p-6 transition-colors duration-300 group cursor-default`}
              >
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-5`}>
                  <feature.icon size={18} className={c.icon} />
                </div>
                <h3 className="font-display text-base font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
