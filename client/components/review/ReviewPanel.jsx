'use client'
import ReactMarkdown from 'react-markdown'
import { AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react'

export default function ReviewPanel({ review, loading, error }) {
  if (error) return (
    <div className="flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-900 rounded-xl p-4 text-sm">
      <AlertTriangle size={16} /> {error}
    </div>
  )

  if (!review && !loading) return (
    <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-3">
      <BookOpen size={40} />
      <p className="text-sm">Your AI review will appear here...</p>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-violet-400">
        <CheckCircle2 size={16} />
        <span>{loading ? 'Reviewing your code...' : 'Review Complete'}</span>
      </div>

      {/* Streamed markdown review */}
      <div className="prose prose-invert prose-sm max-w-none glass rounded-2xl p-5 text-gray-300">
        <ReactMarkdown>{review}</ReactMarkdown>
        {/* Blinking cursor while streaming */}
        {loading && <span className="animate-pulse text-violet-400">▋</span>}
      </div>
    </div>
  )
}