import { motion } from 'framer-motion'
import { Globe, Inbox, LayoutDashboard, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    icon: Globe,
    label: 'Visitor',
    desc: 'A potential customer lands on your website and fills out the lead form.',
    color: 'blue',
    num: '01',
  },
  {
    icon: Inbox,
    label: 'Lead Captured',
    desc: 'Their details are instantly saved to your MongoDB-backed lead database.',
    color: 'purple',
    num: '02',
  },
  {
    icon: LayoutDashboard,
    label: 'Dashboard Review',
    desc: 'Your team sees the lead in real-time — filter, search, and open detailed profiles.',
    color: 'orange',
    num: '03',
  },
  {
    icon: CheckCircle2,
    label: 'Conversion',
    desc: 'Update the lead status to Contacted or Closed. Track your conversion pipeline.',
    color: 'green',
    num: '04',
  },
]

const colorMap = {
  blue: { icon: 'text-blue', bg: 'bg-blue/10', border: 'border-blue/25', line: 'from-blue/30' },
  purple: { icon: 'text-purple', bg: 'bg-purple/10', border: 'border-purple/25', line: 'from-purple/30' },
  orange: { icon: 'text-orange', bg: 'bg-orange/10', border: 'border-orange/25', line: 'from-orange/30' },
  green: { icon: 'text-green', bg: 'bg-green/10', border: 'border-green/25', line: 'from-green/30' },
}

export default function Workflow() {
  return (
    <section id="workflow" className="py-32 relative border-t border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-purple uppercase tracking-widest mb-4"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-primary"
          >
            From visitor to closed deal
            <br />
            in four steps.
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-border via-border to-transparent hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => {
              const c = colorMap[step.color]
              const isEven = i % 2 === 0
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
                    <span className={`font-num text-xs ${c.icon} mb-2 block`}>{step.num}</span>
                    <h3 className="font-display text-xl font-semibold text-primary mb-2">{step.label}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{step.desc}</p>
                  </div>

                  {/* Icon node */}
                  <div className={`relative flex-shrink-0 z-10`}>
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                      <step.icon size={22} className={c.icon} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
