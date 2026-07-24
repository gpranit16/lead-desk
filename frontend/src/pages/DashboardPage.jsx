import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Inbox, PhoneCall, CheckCircle2,
  TrendingUp, Clock, ArrowRight
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'
import api from '../lib/api'
import { StatCard } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { formatRelative, formatCurrency } from '../lib/utils'
import { Link } from 'react-router-dom'

const chartData = [
  { name: 'Mon', leads: 4 },
  { name: 'Tue', leads: 7 },
  { name: 'Wed', leads: 5 },
  { name: 'Thu', leads: 12 },
  { name: 'Fri', leads: 8 },
  { name: 'Sat', leads: 3 },
  { name: 'Sun', leads: 6 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-elevated border border-border rounded-xl px-3 py-2">
        <p className="text-xs text-muted mb-1">{label}</p>
        <p className="font-num text-sm font-semibold text-primary">{payload[0].value} leads</p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [recentLeads, setRecentLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, leadsRes] = await Promise.all([
          api.get('/leads/stats'),
          api.get('/leads?limit=5&page=1'),
        ])
        setStats(statsRes.data.data)
        setRecentLeads(leadsRes.data.data.leads || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Leads', value: stats?.totalLeads ?? '—', icon: Users, color: 'blue' },
    { label: 'New', value: stats?.newLeads ?? '—', icon: Inbox, color: 'purple' },
    { label: 'Contacted', value: stats?.contactedLeads ?? '—', icon: PhoneCall, color: 'orange' },
    { label: 'Closed', value: stats?.closedLeads ?? '—', icon: CheckCircle2, color: 'green' },
  ]

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={loading ? '…' : String(card.value)}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      {/* Charts + Recent Leads */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-card border border-border rounded-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-sm font-semibold text-primary">Weekly Leads</h2>
              <p className="text-xs text-muted mt-0.5">Last 7 days overview</p>
            </div>
            <div className="flex items-center gap-1.5 text-green text-xs font-medium">
              <TrendingUp size={14} />
              +12.4%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#232323" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#232323', strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#leadGradient)"
                dot={false}
                activeDot={{ r: 4, fill: '#3B82F6', stroke: '#050505', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-card p-6"
        >
          <h2 className="font-display text-sm font-semibold text-primary mb-4">Pipeline Overview</h2>
          <div className="space-y-4">
            {[
              { label: 'New', value: stats?.newLeads || 0, total: stats?.totalLeads || 1, color: '#3B82F6' },
              { label: 'Contacted', value: stats?.contactedLeads || 0, total: stats?.totalLeads || 1, color: '#F59E0B' },
              { label: 'Closed', value: stats?.closedLeads || 0, total: stats?.totalLeads || 1, color: '#22C55E' },
            ].map((item) => {
              const pct = Math.round((item.value / item.total) * 100) || 0
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-secondary">{item.label}</span>
                    <span className="font-num text-xs text-primary">{item.value} <span className="text-muted">({pct}%)</span></span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Conversion Rate</span>
              <span className="font-num text-sm font-semibold text-green">
                {stats?.totalLeads > 0
                  ? Math.round((stats.closedLeads / stats.totalLeads) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Leads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card border border-border rounded-card"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display text-sm font-semibold text-primary">Recent Leads</h2>
          <Link
            to="/admin/leads"
            className="flex items-center gap-1 text-xs text-blue hover:text-blue/80 transition-colors"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j}><div className="h-3 bg-white/5 rounded animate-pulse w-24" /></td>
                    ))}
                  </tr>
                ))
              ) : recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted text-sm">
                    No leads yet. Submit your first one from the landing page.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="text-primary font-medium">{lead.name}</td>
                    <td>{lead.email}</td>
                    <td className="font-num">{formatCurrency(lead.budget)}</td>
                    <td><Badge status={lead.status} /></td>
                    <td className="flex items-center gap-1.5">
                      <Clock size={12} className="text-muted" />
                      {formatRelative(lead.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
