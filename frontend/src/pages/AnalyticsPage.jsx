import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import api from '../lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'

const COLORS = { New: '#3B82F6', Contacted: '#F59E0B', Closed: '#22C55E' }

const weeklyData = [
  { week: 'Week 1', leads: 12 },
  { week: 'Week 2', leads: 19 },
  { week: 'Week 3', leads: 8 },
  { week: 'Week 4', leads: 25 },
]

const monthlyData = [
  { month: 'Jan', leads: 32 },
  { month: 'Feb', leads: 41 },
  { month: 'Mar', leads: 28 },
  { month: 'Apr', leads: 55 },
  { month: 'May', leads: 47 },
  { month: 'Jun', leads: 63 },
  { month: 'Jul', leads: 71 },
]

const CustomTooltipBar = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-elevated border border-border rounded-xl px-3 py-2">
        <p className="text-xs text-muted mb-1">{label}</p>
        <p className="font-num text-sm font-semibold text-primary">{payload[0].value} leads</p>
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/leads/stats')
      .then((res) => setStats(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const pieData = stats ? [
    { name: 'New', value: stats.newLeads },
    { name: 'Contacted', value: stats.contactedLeads },
    { name: 'Closed', value: stats.closedLeads },
  ] : []

  const conversionRate = stats?.totalLeads > 0
    ? ((stats.closedLeads / stats.totalLeads) * 100).toFixed(1)
    : '0.0'

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="font-display text-xl font-bold text-primary">Analytics</h1>
        <p className="text-xs text-muted mt-0.5">Pipeline performance and lead trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Conversion Rate', value: `${conversionRate}%`, color: 'text-green' },
          { label: 'Total Leads', value: stats?.totalLeads || 0, color: 'text-blue' },
          { label: 'In Pipeline', value: stats?.contactedLeads || 0, color: 'text-orange' },
          { label: 'Closed Deals', value: stats?.closedLeads || 0, color: 'text-green' },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-card p-5"
          >
            <p className="text-xs text-muted uppercase tracking-widest mb-2">{kpi.label}</p>
            <p className={`font-num text-3xl font-semibold ${kpi.color}`}>
              {loading ? '…' : kpi.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-card p-6"
        >
          <h2 className="font-display text-sm font-semibold text-primary mb-6">Status Distribution</h2>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-muted text-sm">Loading...</div>
          ) : pieData.every((d) => d.value === 0) ? (
            <div className="h-48 flex items-center justify-center text-muted text-sm">No data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name]} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#151515', border: '1px solid #232323', borderRadius: '12px', color: '#F8F8F8' }}
                  itemStyle={{ color: '#A1A1AA' }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-secondary">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Weekly Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-card p-6"
        >
          <h2 className="font-display text-sm font-semibold text-primary mb-6">Weekly Leads</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#232323" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltipBar />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
              <Bar dataKey="leads" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Monthly Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-card p-6"
      >
        <h2 className="font-display text-sm font-semibold text-primary mb-6">Monthly Leads Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#232323" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltipBar />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
            <Bar dataKey="leads" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
