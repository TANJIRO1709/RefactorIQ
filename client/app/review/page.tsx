'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import CodeEditor from '@/components/editor/Codeeditor'
import LanguageSelector from '@/components/editor/LanguageSelector'
import ReviewPanel from '@/components/review/ReviewPanel'
import { useReview } from '@/hooks/useReview'
import { Play, Loader2 } from 'lucide-react'

export default function ReviewPage() {
  const [code, setCode]         = useState('// Paste your code here...')
  const [language, setLanguage] = useState('javascript')
  const { review, loading, error, startReview } = useReview()

  const handleSubmit = () => startReview(code, language)

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">

        {/* Left — Editor */}
        <div className="flex flex-col w-1/2 border-r border-[#2a2a2a] p-4 gap-3">
          <div className="flex items-center justify-between">
            <LanguageSelector value={language} onChange={setLanguage} />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
              {loading ? 'Reviewing...' : 'Review Code'}
            </button>
          </div>
          <CodeEditor value={code} onChange={setCode} language={language} />
        </div>

        {/* Right — Review Output */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <ReviewPanel review={review} loading={loading} error={error} />
        </div>

      </div>
    </div>
  )
}