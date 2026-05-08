'use client'
import Editor from '@monaco-editor/react'

export default function CodeEditor({ value, onChange, language }) {
  return (
    <div style={{ flex: 1, overflow: 'hidden', height: '100%', minHeight: '70vh' }}>
      <Editor
        height="100%"
        language={language}
        value={value}
        defaultValue={value}
        onChange={(val) => onChange(val ?? '')}
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
          automaticLayout: true,
          tabSize: 2,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          contextmenu: true,
          quickSuggestions: true,
        }}
      />
    </div>
  )
}