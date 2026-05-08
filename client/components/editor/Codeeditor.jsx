'use client'
import Editor from '@monaco-editor/react'

export default function CodeEditor({ value, onChange, language }) {
  return (
    <div className="flex-1 rounded-xl overflow-hidden border border-[#2a2a2a] min-h-[70vh]">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          lineNumbers: 'on',
          padding: { top: 16 },
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
        }}
      />
    </div>
  )
}