'use client'
import Editor from '@monaco-editor/react'

interface Props {
  original: string
  fixed:    string
  language: string
}

export default function DiffView({ original, fixed, language }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <p className="text-xs text-red-400 mb-1 font-medium">Before</p>
        <div className="rounded-xl overflow-hidden border border-red-900/30">
          <Editor height="300px" language={language} value={original}
            theme="vs-dark" options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13 }} />
        </div>
      </div>
      <div>
        <p className="text-xs text-green-400 mb-1 font-medium">After (AI Fix)</p>
        <div className="rounded-xl overflow-hidden border border-green-900/30">
          <Editor height="300px" language={language} value={fixed}
            theme="vs-dark" options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13 }} />
        </div>
      </div>
    </div>
  )
}