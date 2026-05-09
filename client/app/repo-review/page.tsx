'use client'

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import {
  Github, Loader2, ChevronDown, ChevronUp,
  Zap, CheckCircle2, AlertTriangle, FileCode2,
  Lock, Eye, EyeOff,
} from 'lucide-react'

// ── helpers ──────────────────────────────────────────────────────────────────

function langFromFilename(filename: string) {
  const ext = filename.split('.').pop() ?? ''
  const map: Record<string, string> = {
    js:'JavaScript', jsx:'JSX', ts:'TypeScript', tsx:'TSX',
    py:'Python', java:'Java', go:'Go', rb:'Ruby',
    php:'PHP', cs:'C#', cpp:'C++', rs:'Rust',
    vue:'Vue', svelte:'Svelte', swift:'Swift', kt:'Kotlin',
  }
  return map[ext] ?? ext.toUpperCase()
}

// ── FileCard ─────────────────────────────────────────────────────────────────

function FileCard({
  filename, content, isActive, isDone, index,
}: {
  filename: string; content: string; isActive: boolean; isDone: boolean; index: number
}) {
  // collapsed once done and no longer active; user can still toggle manually
  const [manualOpen, setManualOpen] = useState<boolean | null>(null)
  const derivedOpen = manualOpen !== null ? manualOpen : (isActive || !isDone)
  const open = derivedOpen

  return (
    <div style={{
      borderRadius: 12,
      border: `1px solid ${isActive ? 'rgba(124,58,237,0.5)' : isDone ? 'rgba(74,222,128,0.18)' : 'rgba(255,255,255,0.07)'}`,
      background: 'rgba(0,0,0,0.25)',
      overflow: 'hidden',
      transition: 'border-color 0.3s',
      opacity: !isActive && !isDone ? 0.45 : 1,
    }}>
      {/* header */}
      <button
        onClick={() => setManualOpen(p => !(p !== null ? p : open))}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '11px 16px',
          background: isActive ? 'rgba(124,58,237,0.08)' : 'rgba(0,0,0,0.2)',
          border: 'none', cursor: 'pointer',
          borderBottom: open && content ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'background 0.2s',
        }}
      >
        {/* status dot */}
        <span style={{
          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
          background: isActive ? '#a78bfa' : isDone ? '#4ade80' : 'rgba(255,255,255,0.15)',
          boxShadow: isActive ? '0 0 8px #a78bfa' : isDone ? '0 0 6px #4ade80' : 'none',
          animation: isActive ? 'rfPulse 1.4s ease-in-out infinite' : 'none',
        }} />

        {/* filename */}
        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <p style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {filename}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            {langFromFilename(filename)}
          </p>
        </div>

        {/* badge */}
        <span style={{
          fontSize: 10, padding: '3px 9px', borderRadius: 999, flexShrink: 0,
          background: isActive ? 'rgba(124,58,237,0.18)' : isDone ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isActive ? 'rgba(124,58,237,0.35)' : isDone ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.08)'}`,
          color: isActive ? '#c4b5fd' : isDone ? '#4ade80' : 'rgba(255,255,255,0.3)',
          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
        }}>
          {isActive ? 'Reviewing…' : isDone ? 'Done' : `#${index + 1}`}
        </span>

        {open
          ? <ChevronUp size={13} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
          : <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
        }
      </button>

      {/* body */}
      {open && content && (
        <div style={{ padding: '14px 16px' }}>
          {content.split('\n').map((line, i) => {
            const isHeading = line.startsWith('## ') || line.startsWith('# ')
            const isBullet  = line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')
            const lower     = line.toLowerCase()
            const bulletColor =
              lower.includes('critical') || lower.includes('error') || lower.includes('bug') ? '#f87171' :
              lower.includes('warn') || lower.includes('security') || lower.includes('vuln') ? '#fbbf24' :
              lower.includes('suggest') || lower.includes('consider') || lower.includes('improve') ? '#60a5fa' :
              'rgba(255,255,255,0.65)'

            return (
              <p key={i} style={{
                margin: isHeading ? '14px 0 6px' : '2px 0',
                fontFamily: isHeading ? "'Syne', sans-serif" : "'DM Sans', sans-serif",
                fontSize: isHeading ? 13 : 13,
                fontWeight: isHeading ? 700 : 400,
                color: isHeading ? '#c4b5fd' : isBullet ? bulletColor : 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
              }}>
                {line || '\u00A0'}
              </p>
            )
          })}
          {isActive && (
            <span style={{ display:'inline-block', width:2, height:14, background:'#a78bfa', animation:'rfBlink 1s step-end infinite', verticalAlign:'middle', marginLeft:4 }} />
          )}
        </div>
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function RepoReviewPage() {
  const [repoUrl, setRepoUrl]     = useState('')
  const [token, setToken]         = useState('')
  const [showToken, setShowToken] = useState(false)

  const [status, setStatus]         = useState<string | null>(null)
  const [meta, setMeta]             = useState<{ totalFiles: number; owner: string; repo: string } | null>(null)
  const [fileOrder, setFileOrder]   = useState<string[]>([])
  const [fileContent, setFileContent] = useState<Record<string, string>>({})
  const [activeFile, setActiveFile] = useState<string | null>(null)
  const [doneFiles, setDoneFiles]   = useState<Set<string>>(new Set())
  const [isStreaming, setIsStreaming] = useState(false)
  const [isDone, setIsDone]         = useState(false)
  const [error, setError]           = useState<string | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isStreaming) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [fileContent, isStreaming])

  const reset = () => {
    setStatus(null); setMeta(null); setFileOrder([]); setFileContent({})
    setActiveFile(null); setDoneFiles(new Set()); setIsDone(false); setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl.trim()) return
    reset()
    setIsStreaming(true)

    try {
      const res = await fetch('/api/review/repo/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl: repoUrl.trim(), token: token.trim() || undefined }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Request failed')
      }

      const reader  = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer    = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()!

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const raw = line.slice(6).trim()
          if (!raw) continue
          type SSEEvent = {
            type: string
            message?: string
            totalFiles?: number
            owner?: string
            repo?: string
            filename?: string
            content?: string
          }
          let ev: SSEEvent
          try { ev = JSON.parse(raw) as SSEEvent } catch { continue }

          switch (ev.type) {
            case 'status':
              setStatus(ev.message ?? null)
              break
            case 'meta':
              setMeta({ totalFiles: ev.totalFiles ?? 0, owner: ev.owner ?? '', repo: ev.repo ?? '' })
              break
            case 'file_start': {
              const fname = ev.filename ?? ''
              setActiveFile(fname)
              setFileOrder(p => p.includes(fname) ? p : [...p, fname])
              break
            }
            case 'chunk': {
              const fname = ev.filename ?? ''
              const chunk = ev.content ?? ''
              setFileContent(p => ({ ...p, [fname]: (p[fname] ?? '') + chunk }))
              break
            }
            case 'file_done': {
              const fname = ev.filename ?? ''
              setDoneFiles(p => new Set([...p, fname]))
              setActiveFile(null)
              break
            }
            case 'file_error': {
              const fname = ev.filename ?? ''
              setFileContent(p => ({ ...p, [fname]: `⚠️ ${ev.message ?? 'Failed'}` }))
              setDoneFiles(p => new Set([...p, fname]))
              break
            }
            case 'done':
              setIsDone(true)
              setIsStreaming(false)
              setStatus(ev.message ?? null)
              break
            case 'error':
              setError(ev.message ?? 'Unknown error')
              setIsStreaming(false)
              break
          }
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsStreaming(false)
    }
  }

  const progress  = meta ? Math.round((doneFiles.size / meta.totalFiles) * 100) : 0
  const lineCount = repoUrl.split('/').filter(Boolean).length

  return (
    <div style={{ minHeight:'100vh', background:'#080810', color:'#fff', display:'flex', flexDirection:'column', fontFamily:"'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes rfSpin  { to { transform: rotate(360deg); } }
        @keyframes rfPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes rfBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes rfFadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rfPulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(124,58,237,0.4)} 50%{box-shadow:0 0 0 8px rgba(124,58,237,0)} }

        .rf-spin     { animation: rfSpin 0.9s linear infinite; }
        .rf-fade-up  { animation: rfFadeUp 0.35s ease forwards; }
        .rf-pulse-btn { animation: rfPulseGlow 2s ease-in-out infinite; }

        .rf-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px; padding: 11px 14px;
          color: #fff; font-size: 14px;
          font-family: 'JetBrains Mono', monospace;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .rf-input:focus { border-color: rgba(124,58,237,0.5); box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
        .rf-input::placeholder { color: rgba(255,255,255,0.2); }

        .rf-submit {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px; border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          font-size: 14px; font-weight: 600; color: #fff;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 0 22px rgba(124,58,237,0.28);
        }
        .rf-submit:hover:not(:disabled) { opacity: 0.87; transform: scale(1.01); }
        .rf-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .rf-stop {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px; border-radius: 10px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.6);
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
        }
        .rf-stop:hover { background: rgba(255,255,255,0.09); }

        .custom-scroll::-webkit-scrollbar       { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.35); border-radius: 999px; }
      `}</style>

      <Navbar />

      {/* Sub-header — matches review/page.tsx toolbar style */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(8,8,16,0.9)', backdropFilter: 'blur(12px)',
        padding: '0 20px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 56, gap: 12, flexShrink: 0,
      }}>
        {/* breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
          <div style={{
            width:28, height:28, borderRadius:7, flexShrink:0,
            background:'linear-gradient(135deg,#7c3aed,#ec4899)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <Github size={14} />
          </div>
          <span style={{ color:'rgba(255,255,255,0.3)', fontSize:13 }}>ReviewForge</span>
          <span style={{ color:'rgba(255,255,255,0.15)', fontSize:13 }}>›</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, color:'rgba(255,255,255,0.7)' }}>
            repo-review
          </span>
          {meta && (
            <span style={{
              fontSize:11, padding:'2px 8px', borderRadius:999,
              background:'rgba(124,58,237,0.15)', border:'1px solid rgba(124,58,237,0.25)',
              color:'#c4b5fd', flexShrink:0,
            }}>
              {meta.owner}/{meta.repo}
            </span>
          )}
        </div>

        {/* status indicator */}
        <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
          <div style={{
            width:7, height:7, borderRadius:'50%',
            background: isStreaming ? '#f59e0b' : isDone ? '#4ade80' : 'rgba(255,255,255,0.2)',
            boxShadow: isStreaming ? '0 0 8px #f59e0b' : isDone ? '0 0 8px #4ade80' : 'none',
            transition:'all 0.4s',
          }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.35)' }}>
            {isStreaming ? 'running' : isDone ? 'complete' : 'idle'}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex:1, display:'flex', overflow:'hidden', minHeight:0 }}>

        {/* Left panel — input form */}
        <div style={{
          width: 340, flexShrink:0, borderRight:'1px solid rgba(255,255,255,0.06)',
          background:'rgba(0,0,0,0.2)', display:'flex', flexDirection:'column',
          overflowY:'auto', padding:20, gap:18,
        }} className="custom-scroll">

          {/* Panel label */}
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <Github size={13} style={{ color:'#a78bfa' }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em' }}>
              REPOSITORY
            </span>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>

            {/* Repo URL */}
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em', marginBottom:8 }}>
                GITHUB URL
              </label>
              <input
                className="rf-input"
                type="url"
                value={repoUrl}
                onChange={e => setRepoUrl(e.target.value)}
                placeholder="https://github.com/owner/repo"
                required
                disabled={isStreaming}
              />
            </div>

            {/* Token */}
            <div>
              <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em', marginBottom:8 }}>
                <Lock size={10} /> GITHUB TOKEN
                <span style={{ fontWeight:400, color:'rgba(255,255,255,0.2)', letterSpacing:0, textTransform:'none', fontSize:10 }}>
                  (optional)
                </span>
              </label>
              <div style={{ position:'relative' }}>
                <input
                  className="rf-input"
                  type={showToken ? 'text' : 'password'}
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxx"
                  disabled={isStreaming}
                  style={{ paddingRight:40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowToken(p => !p)}
                  style={{
                    position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.3)',
                    display:'flex', alignItems:'center',
                  }}
                >
                  {showToken ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <p style={{ margin:'6px 0 0', fontSize:11, color:'rgba(255,255,255,0.2)', lineHeight:1.6 }}>
                Required for private repos. Gives higher rate limits for large repos.
              </p>
            </div>

            {/* Submit / Stop */}
            {!isStreaming ? (
              <button
                type="submit"
                disabled={!repoUrl.trim()}
                className={`rf-submit ${repoUrl.trim() ? 'rf-pulse-btn' : ''}`}
              >
                <Github size={15} /> Analyze Repository
              </button>
            ) : (
              <button type="button" onClick={() => setIsStreaming(false)} className="rf-stop">
                <Loader2 size={15} className="rf-spin" /> Analyzing…
              </button>
            )}

            {(isDone || error) && !isStreaming && (
              <button
                type="button"
                onClick={reset}
                style={{
                  padding:'9px', borderRadius:10, border:'1px solid rgba(255,255,255,0.08)',
                  background:'rgba(255,255,255,0.03)', color:'rgba(255,255,255,0.4)',
                  fontSize:13, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
                }}
              >
                Clear &amp; Reset
              </button>
            )}
          </form>

          {/* Progress card */}
          {meta && (
            <div style={{
              borderRadius:12, border:'1px solid rgba(124,58,237,0.2)',
              background:'rgba(124,58,237,0.06)', padding:'14px 16px',
            }} className="rf-fade-up">
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                <span style={{ fontSize:12, color:'rgba(255,255,255,0.5)' }}>Progress</span>
                <span style={{ fontSize:12, fontWeight:700, color:'#a78bfa' }}>{progress}%</span>
              </div>
              <div style={{ height:4, background:'rgba(255,255,255,0.07)', borderRadius:999, overflow:'hidden' }}>
                <div style={{
                  height:'100%', borderRadius:999,
                  background:'linear-gradient(90deg,#7c3aed,#ec4899)',
                  width:`${progress}%`, transition:'width 0.4s ease',
                }} />
              </div>
              <p style={{ margin:'10px 0 0', fontSize:11, color:'rgba(255,255,255,0.3)' }}>
                {doneFiles.size} / {meta.totalFiles} files reviewed
              </p>
              {status && (
                <p style={{ margin:'6px 0 0', fontSize:11, color:'rgba(167,139,250,0.7)', lineHeight:1.5 }}>
                  {status}
                </p>
              )}
            </div>
          )}

          {/* Pre-stream status */}
          {status && !meta && isStreaming && (
            <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'rgba(255,255,255,0.4)' }}>
              <Loader2 size={14} className="rf-spin" style={{ color:'#a78bfa' }} /> {status}
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              borderRadius:10, border:'1px solid rgba(248,113,113,0.25)',
              background:'rgba(248,113,113,0.07)', padding:'12px 14px',
              display:'flex', gap:8, alignItems:'flex-start',
            }}>
              <AlertTriangle size={14} style={{ color:'#f87171', marginTop:2, flexShrink:0 }} />
              <div>
                <p style={{ margin:'0 0 2px', fontSize:12, fontWeight:600, color:'#f87171' }}>Error</p>
                <p style={{ margin:0, fontSize:12, color:'rgba(248,113,113,0.8)' }}>{error}</p>
              </div>
            </div>
          )}

          {/* Done banner */}
          {isDone && (
            <div style={{
              borderRadius:10, border:'1px solid rgba(74,222,128,0.2)',
              background:'rgba(74,222,128,0.07)', padding:'12px 14px',
              display:'flex', gap:8, alignItems:'center',
            }} className="rf-fade-up">
              <CheckCircle2 size={14} style={{ color:'#4ade80', flexShrink:0 }} />
              <p style={{ margin:0, fontSize:12, color:'#4ade80' }}>
                Review complete — {doneFiles.size} files analyzed
              </p>
            </div>
          )}
        </div>

        {/* Right panel — streaming results */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minHeight:0 }}>
          {/* Panel label */}
          <div style={{
            display:'flex', alignItems:'center', gap:8, padding:'10px 20px',
            borderBottom:'1px solid rgba(255,255,255,0.05)',
            background:'rgba(0,0,0,0.25)', flexShrink:0,
          }}>
            <FileCode2 size={13} style={{ color:'#f472b6' }} />
            <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:'0.08em' }}>
              AI REVIEW
            </span>
            {fileOrder.length > 0 && (
              <span style={{
                marginLeft:8, fontSize:10, padding:'2px 8px', borderRadius:999,
                background:'rgba(167,139,250,0.1)', border:'1px solid rgba(167,139,250,0.2)',
                color:'#c4b5fd',
              }}>
                {fileOrder.length} files
              </span>
            )}
          </div>

          {/* File cards */}
          <div className="custom-scroll" style={{ flex:1, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', gap:10 }}>
            {fileOrder.length === 0 && !isStreaming && (
              <div style={{
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                minHeight:320, gap:16, textAlign:'center',
              }}>
                <div style={{
                  width:72, height:72, borderRadius:'50%',
                  background:'rgba(124,58,237,0.08)', border:'1px solid rgba(124,58,237,0.18)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <Github size={28} style={{ color:'#a78bfa' }} />
                </div>
                <div>
                  <p style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, margin:'0 0 8px', letterSpacing:'-0.02em' }}>
                    No review yet
                  </p>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.35)', margin:0, lineHeight:1.7, maxWidth:240 }}>
                    Paste a GitHub repo URL on the left and click Analyze Repository.
                  </p>
                </div>
              </div>
            )}

            {fileOrder.map((filename, i) => (
              <div key={filename} className="rf-fade-up">
                <FileCard
                  filename={filename}
                  content={fileContent[filename] ?? ''}
                  isActive={activeFile === filename}
                  isDone={doneFiles.has(filename)}
                  index={i}
                />
              </div>
            ))}

            <div ref={bottomRef} />
          </div>
        </div>
      </div>

      {/* Footer status bar — matches review/page.tsx */}
      <div style={{
        height:28, borderTop:'1px solid rgba(255,255,255,0.05)',
        background:'rgba(0,0,0,0.4)',
        display:'flex', alignItems:'center', padding:'0 16px', gap:20, flexShrink:0,
      }}>
        {[
          { label:'REPO REVIEW',  color:'#a78bfa' },
          { label: meta ? `${meta.totalFiles} files` : '0 files', color:'rgba(255,255,255,0.3)' },
          { label:'GitHub API',  color:'rgba(255,255,255,0.3)' },
          { label:'Claude AI',   color:'#f472b6' },
        ].map(({ label, color }) => (
          <span key={label} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color, letterSpacing:'0.06em' }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}