import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, User, Mail, DollarSign, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../lib/api'
import Button from '../ui/Button'
import Input from '../ui/Input'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().min(1, 'Budget is required').refine((v) => !isNaN(Number(v)) && Number(v) >= 0, 'Budget must be a valid number'),
  message: z.string().optional(),
})

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    try {
      await api.post('/leads', { ...data, budget: Number(data.budget) })
      setSubmitted(true)
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-32 border-t border-border relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue/3 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-blue uppercase tracking-widest mb-4"
          >
            Get Started
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Let's talk business.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary"
          >
            Tell us about your project and budget. Our team will get back to you within 24 hours.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-green/30 rounded-card p-10 text-center"
            >
              <div className="w-16 h-16 bg-green/10 border border-green/25 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-green" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-2">Lead Received!</h3>
              <p className="text-secondary mb-6">We've got your details. Our team will reach out within 24 hours.</p>
              <Button variant="secondary" size="md" onClick={() => setSubmitted(false)}>
                Submit Another
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-card border border-border rounded-card p-8 space-y-5"
              noValidate
            >
              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  icon={User}
                  placeholder="Pranit Gupta"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Email Address"
                  icon={Mail}
                  type="email"
                  placeholder="pranit@company.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <Input
                label="Project Budget (USD)"
                icon={DollarSign}
                type="number"
                placeholder="5000"
                error={errors.budget?.message}
                {...register('budget')}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-secondary uppercase tracking-wide">
                  Message <span className="text-muted normal-case">(optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare size={15} className="text-muted" />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project, timeline, or anything else..."
                    className="w-full bg-surface border border-border rounded-input text-sm text-primary placeholder:text-muted pl-9 pr-4 py-3 focus:outline-none focus:border-blue/60 focus:ring-1 focus:ring-blue/20 transition-all resize-none"
                    {...register('message')}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="blue"
                size="lg"
                loading={isSubmitting}
                className="w-full gap-2"
              >
                <Send size={16} />
                Send Enquiry
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
