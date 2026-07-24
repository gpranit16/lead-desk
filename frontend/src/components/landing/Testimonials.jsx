import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "LeadDesk Pro transformed how we handle inbound leads. We went from spreadsheets to a real pipeline in under an hour. The dashboard alone is worth it.",
    name: "Sarah Chen",
    role: "Head of Growth, Arcflow",
    avatar: "SC",
  },
  {
    quote: "The cleanest CRM interface I've ever used. It doesn't try to do everything — it does the right things, perfectly. Our team actually enjoys using it.",
    name: "Marcus Rivera",
    role: "Founder, Pulse Digital",
    avatar: "MR",
  },
  {
    quote: "We capture 3x more leads now because the public form is so frictionless. The admin dashboard gives us exactly what we need without the noise.",
    name: "Priya Nair",
    role: "Marketing Director, Vertex Studio",
    avatar: "PN",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-green uppercase tracking-widest mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-primary"
          >
            Teams love LeadDesk Pro.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-card p-6 flex flex-col gap-6 hover:border-border/60 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-orange text-xs">★</span>
                ))}
              </div>

              <p className="text-sm text-secondary leading-relaxed flex-1">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs font-semibold text-blue">{t.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
