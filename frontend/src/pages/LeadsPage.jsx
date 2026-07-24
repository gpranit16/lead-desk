import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronLeft, ChevronRight, Clock, Trash2, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { Badge } from '../components/ui/Badge'
import { Drawer } from '../components/ui/Drawer'
import { Select } from '../components/ui/Select'
import Button from '../components/ui/Button'
import { formatRelative, formatCurrency, formatDate, truncate } from '../lib/utils'
import { cn } from '../lib/utils'

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'New', label: 'New' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Closed', label: 'Closed' },
]

function LeadDrawer({ lead, onClose, onStatusUpdate }) {
  const [status, setStatus] = useState(lead?.status || 'New')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (lead) setStatus(lead.status)
  }, [lead])

  const handleUpdate = async () => {
    if (!lead || status === lead.status) return
    setUpdating(true)
    try {
      await api.patch(`/leads/${lead._id}/status`, { status })
      toast.success(`Status updated to ${status}`)
      onStatusUpdate(lead._id, status)
      onClose()
    } catch {
      toast.error('Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  if (!lead) return null

  return (
    <div className="p-6 space-y-6">
      {/* Lead info */}
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted mb-1 uppercase tracking-widest">Name</p>
          <p className="text-sm font-medium text-primary">{lead.name}</p>
        </div>
        <div>
          <p className="text-xs text-muted mb-1 uppercase tracking-widest">Email</p>
          <a href={`mailto:${lead.email}`} className="text-sm text-blue hover:underline">{lead.email}</a>
        </div>
        <div>
          <p className="text-xs text-muted mb-1 uppercase tracking-widest">Budget</p>
          <p className="font-num text-sm text-primary">{formatCurrency(lead.budget)}</p>
        </div>
        {lead.message && (
          <div>
            <p className="text-xs text-muted mb-1 uppercase tracking-widest">Message</p>
            <p className="text-sm text-secondary leading-relaxed bg-surface rounded-xl p-3 border border-border">
              {lead.message}
            </p>
          </div>
        )}
        <div>
          <p className="text-xs text-muted mb-1 uppercase tracking-widest">Submitted</p>
          <p className="text-sm text-secondary">{formatDate(lead.createdAt)}</p>
        </div>
        <div>
          <p className="text-xs text-muted mb-1 uppercase tracking-widest">Current Status</p>
          <Badge status={lead.status} />
        </div>
      </div>

      {/* Status Update */}
      <div className="border-t border-border pt-6">
        <p className="text-xs font-medium text-secondary mb-3 uppercase tracking-widest">Update Status</p>
        <Select
          value={status}
          onChange={setStatus}
          options={[
            { value: 'New', label: 'New' },
            { value: 'Contacted', label: 'Contacted' },
            { value: 'Closed', label: 'Closed' },
          ]}
        />
        <Button
          variant="blue"
          size="md"
          className="w-full mt-3"
          loading={updating}
          onClick={handleUpdate}
          disabled={status === lead.status}
        >
          Update Status
        </Button>
      </div>
    </div>
  )
}

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 })
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: pagination.limit })
      if (search) params.append('search', search)
      if (status) params.append('status', status)
      const { data } = await api.get(`/leads?${params}`)
      setLeads(data.data.leads || [])
      setPagination(data.data.pagination)
    } catch (err) {
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }, [search, status, pagination.limit])

  useEffect(() => {
    const debounce = setTimeout(() => fetchLeads(1), 300)
    return () => clearTimeout(debounce)
  }, [search, status])

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!confirm('Are you sure you want to delete this lead?')) return
    setDeleting(id)
    try {
      await api.delete(`/leads/${id}`)
      toast.success('Lead deleted')
      setLeads((prev) => prev.filter((l) => l._id !== id))
    } catch {
      toast.error('Failed to delete lead')
    } finally {
      setDeleting(null)
    }
  }

  const handleStatusUpdate = (id, newStatus) => {
    setLeads((prev) => prev.map((l) => l._id === id ? { ...l, status: newStatus } : l))
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-primary">Leads</h1>
          <p className="text-xs text-muted mt-0.5">
            <span className="font-num text-secondary">{pagination.total}</span> total leads
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fetchLeads(pagination.page)}
          className="gap-2"
        >
          <RefreshCw size={14} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-border rounded-input text-sm text-primary placeholder:text-muted h-10 pl-9 pr-4 focus:outline-none focus:border-blue/60 focus:ring-1 focus:ring-blue/20 transition-all"
          />
        </div>
        <div className="w-44">
          <Select
            value={status}
            onChange={(v) => setStatus(v)}
            options={STATUS_OPTIONS}
            placeholder="All Statuses"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Budget</th>
                <th>Message</th>
                <th>Status</th>
                <th>Submitted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j}><div className="h-3 bg-white/5 rounded animate-pulse w-20" /></td>
                    ))}
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-muted text-sm">
                    No leads found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <motion.tr
                    key={lead._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="text-primary font-medium">{lead.name}</td>
                    <td>{lead.email}</td>
                    <td className="font-num">{formatCurrency(lead.budget)}</td>
                    <td className="max-w-[180px]">
                      <span className="text-muted">{truncate(lead.message, 30) || '—'}</span>
                    </td>
                    <td><Badge status={lead.status} /></td>
                    <td>
                      <span className="flex items-center gap-1.5 text-muted">
                        <Clock size={11} />
                        {formatRelative(lead.createdAt)}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleDelete(lead._id, e)}
                        disabled={deleting === lead._id}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red/10 text-muted hover:text-red transition-colors"
                        aria-label="Delete lead"
                      >
                        {deleting === lead._id
                          ? <RefreshCw size={12} className="animate-spin" />
                          : <Trash2 size={12} />
                        }
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-border">
            <p className="text-xs text-muted">
              Page <span className="font-num text-secondary">{pagination.page}</span> of{' '}
              <span className="font-num text-secondary">{pagination.totalPages}</span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page <= 1}
                onClick={() => fetchLeads(pagination.page - 1)}
                className="gap-1"
              >
                <ChevronLeft size={14} /> Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchLeads(pagination.page + 1)}
                className="gap-1"
              >
                Next <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Drawer */}
      <Drawer
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title={selectedLead?.name || 'Lead Details'}
      >
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      </Drawer>
    </div>
  )
}
