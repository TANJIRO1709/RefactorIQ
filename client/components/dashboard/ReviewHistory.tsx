import { formatDate, truncate } from '@/lib/utils'
import type { Review } from '@/lib/types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ReviewHistory({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return (
    <p className="text-gray-600 text-sm text-center py-10">No reviews yet. Start by reviewing some code!</p>
  )

  return (
    <div className="space-y-3">
      {reviews.map(r => (
        <div key={r._id} className="glass rounded-xl p-4 flex items-center justify-between group hover:border-violet-800 transition">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-violet-900/40 text-violet-300 px-2 py-0.5 rounded-full border border-violet-800">
                {r.language}
              </span>
              <span className="text-xs text-gray-600">{formatDate(r.createdAt)}</span>
            </div>
            <p className="text-sm text-gray-400 font-mono">{truncate(r.code, 70)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-white">{r.score}<span className="text-xs text-gray-600">/100</span></span>
            <Link href={`/review?id=${r._id}`} className="text-gray-600 group-hover:text-violet-400 transition">
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}