import { motion } from 'framer-motion'
import { Accordion } from '../ui/Accordion'

const faqs = [
  {
    question: "How do I add the lead form to my website?",
    answer: "Simply embed our public API endpoint POST /api/leads into any HTML form. You can also use our pre-built form component that handles validation and success states automatically.",
  },
  {
    question: "Is there a registration page for admins?",
    answer: "No. For security, admin accounts are created manually in the database or via our CLI seed command. This prevents unauthorized admin account creation. Once created, admins log in at /login.",
  },
  {
    question: "What happens when I delete a lead?",
    answer: "Leads are never permanently deleted. We use a soft-delete mechanism — the lead is hidden from the main view but preserved in the database for compliance and audit purposes.",
  },
  {
    question: "Can I filter and search leads?",
    answer: "Yes. The leads dashboard supports real-time search by name or email, filtering by status (New, Contacted, Closed), sorting by date, and full pagination with configurable page sizes.",
  },
  {
    question: "How is authentication handled?",
    answer: "We use JSON Web Tokens (JWT) with a 30-day expiry. Passwords are hashed using bcrypt with a salt factor of 10. All admin routes are protected by JWT middleware.",
  },
  {
    question: "Is the API rate limited?",
    answer: "The current version does not include rate limiting, but it's on our roadmap. We recommend using a reverse proxy like Nginx or Cloudflare to handle rate limiting at the infrastructure level for now.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-32 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-orange uppercase tracking-widest mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-primary"
          >
            Frequently asked questions.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion items={faqs} />
        </motion.div>
      </div>
    </section>
  )
}
