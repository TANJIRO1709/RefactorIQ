import { severityColor } from '@/lib/utils'
import type { Issue } from '@/lib/types'
import { Bug, ShieldAlert, Zap, Paintbrush, ExternalLink } from 'lucide-react'

const icons = {
  bug:         Bug,
  security:    ShieldAlert,
  performance: Zap,
  style:       Paintbrush,
}

export default function IssueCard({ issue }: { issue: Issue }) {
  const Icon = icons[issue.type] || Bug

  return (
    <div className="glass rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Icon size={15} className="text-violet-400" />
          {issue.title}
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColor(issue.severity)}`}>
          {issue.severity}
        </span>
      </div>

      <p className="text-gray-400 text-sm">{issue.description}</p>

      {issue.fix && (
        <div className="bg-[#111] rounded-lg p-3 text-xs font-mono text-green-400 border border-green-900/30">
          {issue.fix}
        </div>
      )}

      {issue.resources?.length ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {issue.resources.map(r => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition"
            >
              <ExternalLink size={11} /> {r.title}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )
}