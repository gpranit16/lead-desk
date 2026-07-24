import { Zap, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const links = {
  Product: ['Features', 'How it works', 'Pricing', 'Changelog'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-blue rounded-lg flex items-center justify-center">
                <Zap size={13} className="text-white fill-white" />
              </div>
              <span className="font-display text-sm font-bold text-primary">
                LeadDesk <span className="text-blue">Pro</span>
              </span>
            </Link>
            <p className="text-xs text-muted leading-relaxed mb-6">
              Capture. Track. Convert. The modern CRM for teams who move fast.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'GitHub', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-xs text-muted hover:text-secondary transition-colors"
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-medium text-primary uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs text-muted hover:text-secondary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} LeadDesk Pro. All rights reserved.
          </p>
          <p className="text-xs text-muted text-center">
            Built for{' '}
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:text-blue/80 transition-colors inline-flex items-center gap-1"
            >
              Digital Heroes Training Task
              <ExternalLink size={10} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
