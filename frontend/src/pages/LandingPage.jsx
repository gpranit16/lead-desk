import { motion } from 'framer-motion'
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Workflow from '../components/landing/Workflow'
import Statistics from '../components/landing/Statistics'
import LeadForm from '../components/landing/LeadForm'
import Footer from '../components/landing/Footer'

// Trusted companies marquee
const companies = ['Stripe', 'Vercel', 'Linear', 'Notion', 'Supabase', 'Figma', 'GitHub', 'Raycast', 'Arc', 'Resend']

function TrustedBy() {
  return (
    <section className="py-16 border-t border-border overflow-hidden">
      <p className="text-center text-xs text-muted uppercase tracking-widest mb-8">
        Trusted by teams at
      </p>
      <div className="relative flex overflow-hidden">
        <div className="marquee-track">
          {[...companies, ...companies].map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center mx-8 flex-shrink-0"
            >
              <span className="text-sm font-medium text-muted hover:text-secondary transition-colors cursor-default opacity-50 hover:opacity-100">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Global noise texture */}
      <div className="noise-overlay" />

      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <Workflow />
      <Statistics />
      <LeadForm />
      <Footer />
    </div>
  )
}
