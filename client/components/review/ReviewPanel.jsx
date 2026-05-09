'use client'

import { useState } from 'react'
import {
  CheckCircle2, AlertTriangle, BookOpen, Loader2,
  Zap, ChevronDown, ChevronUp, Copy, Check,
  ShieldCheck, Info, AlertCircle, Flame,
  Code2, GitCompare, FileText, Clock,
} from 'lucide-react'

const SEVERITY = {
  Critical: { color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.22)', icon: Flame },
  High:     { color: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.22)',  icon: AlertCircle },
  Medium:   { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.22)',  icon: AlertTriangle },
  Low:      { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.22)',  icon: Info },
}

function CodeBlock({ code, label, accent = '#a78bfa' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div style={{
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden',
      background: 'rgba(0,0,0,0.35)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>
            {label}
          </span>
        </div>
        <button onClick={handleCopy} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          color: copied ? '#4ade80' : 'rgba(255,255,255,0.4)',
          fontSize: 11, cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          transition: 'color 0.2s',
        }}>
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{
        margin: 0, padding: '14px 16px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12.5, lineHeight: 1.75,
        color: '#e2e8f0',
        overflowX: 'auto',
        whiteSpace: 'pre',
      }}>
        {code}
      </pre>
    </div>
  )
}

export default function ReviewPanel({ review, loading, error }) {
  const [showOriginal, setShowOriginal] = useState(false)
  const [showImproved, setShowImproved] = useState(true)

  if (loading) return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: 320, gap: 20, padding: 40,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(124,58,237,0.08)',
        border: '1px solid rgba(124,58,237,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Loader2 size={26} style={{ color: '#a78bfa', animation: 'spin 0.9s linear infinite' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>Analyzing your code…</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Claude AI is reviewing for bugs, security & best practices</p>
      </div>
    </div>
  )

  if (error) return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      margin: 16, padding: '14px 16px', borderRadius: 12,
      background: 'rgba(248,113,113,0.07)',
      border: '1px solid rgba(248,113,113,0.2)',
      color: '#f87171', fontSize: 13,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <AlertTriangle size={15} style={{ marginTop: 2, flexShrink: 0 }} />
      <div>
        <div style={{ fontWeight: 600, marginBottom: 3 }}>Review failed</div>
        {error}
      </div>
    </div>
  )

  if (!review) return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: 320, gap: 16, padding: 40, textAlign: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(124,58,237,0.08)',
        border: '1px solid rgba(124,58,237,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <BookOpen size={26} style={{ color: '#a78bfa' }} />
      </div>
      <div>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>No review yet</p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Paste your code and click Run Review</p>
      </div>
    </div>
  )

  const issueCount    = review.issues?.length ?? 0
  const criticalCount = review.issues?.filter(i => i.severity === 'Critical').length ?? 0
  const highCount     = review.issues?.filter(i => i.severity === 'High').length ?? 0
  const hasProblems   = criticalCount > 0 || highCount > 0
  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        .rf-fade { animation: fadeUp 0.3s ease forwards; }
        .collapsible-btn:hover { background: rgba(255,255,255,0.05) !important; }
      `}</style>

      <div className="rf-fade" style={{
        display: 'flex', flexDirection: 'column', gap: 14,
        padding: 16, fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* Status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', borderRadius: 10,
          background: hasProblems ? 'rgba(251,146,60,0.07)' : 'rgba(74,222,128,0.07)',
          border: `1px solid ${hasProblems ? 'rgba(251,146,60,0.22)' : 'rgba(74,222,128,0.22)'}`,
          flexWrap: 'wrap', gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {hasProblems
              ? <AlertTriangle size={15} style={{ color: '#fb923c' }} />
              : <CheckCircle2 size={15} style={{ color: '#4ade80' }} />
            }
            <span style={{ fontSize: 13, fontWeight: 600, color: hasProblems ? '#fb923c' : '#4ade80' }}>
              Review Complete
            </span>
            <span style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 999,
              background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.22)',
              color: '#c4b5fd',
            }}>
              {review.language?.toUpperCase()}
            </span>
          </div>
          {formattedDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
              <Clock size={11} /> {formattedDate}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { label: 'Issues Found',   value: issueCount,                         color: issueCount === 0 ? '#4ade80' : '#fb923c',               icon: <ShieldCheck size={16} /> },
            { label: 'Critical / High', value: `${criticalCount} / ${highCount}`, color: (criticalCount + highCount) === 0 ? '#4ade80' : '#f87171', icon: <Flame size={16} /> },
            { label: 'Code Improved',  value: review.reviewedCode ? 'Yes' : 'No', color: review.reviewedCode ? '#4ade80' : 'rgba(255,255,255,0.4)', icon: <Zap size={16} /> },
          ].map(({ label, value, color, icon }) => (
            <div key={label} style={{
              borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.025)', padding: '12px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
                {icon}
                <span style={{ fontSize: 11 }}>{label}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'Syne', sans-serif" }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {review.summary && (
          <div style={{
            borderRadius: 12, border: '1px solid rgba(167,139,250,0.18)',
            background: 'rgba(167,139,250,0.05)', padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
              <FileText size={14} style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa', letterSpacing: '0.06em' }}>SUMMARY</span>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75 }}>
              {review.summary}
            </p>
          </div>
        )}

        {/* Issues */}
        {issueCount > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
              <AlertTriangle size={14} style={{ color: '#fbbf24' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>
                ISSUES · {issueCount}
              </span>
            </div>
            {review.issues.map((issue, i) => {
              const s = SEVERITY[issue.severity] ?? SEVERITY.Low
              const SIcon = s.icon
              return (
                <div key={i} style={{
                  borderRadius: 12, border: `1px solid ${s.border}`,
                  background: s.bg, padding: '13px 15px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <SIcon size={14} style={{ color: s.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{issue.severity}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>· {issue.type}</span>
                    </div>
                    {issue.line && (
                      <span style={{
                        fontSize: 10, padding: '2px 8px', borderRadius: 999, flexShrink: 0,
                        fontFamily: "'JetBrains Mono', monospace",
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.4)',
                      }}>
                        line {issue.line}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>
                    {issue.message}
                  </p>
                </div>
              )
            })}
          </div>
        )}

        {/* Improved Code */}
        {review.reviewedCode && (
          <div>
            <button
              className="collapsible-btn"
              onClick={() => setShowImproved(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '10px 14px',
                borderRadius: showImproved ? '10px 10px 0 0' : 10,
                border: '1px solid rgba(74,222,128,0.2)',
                borderBottom: showImproved ? '1px solid rgba(74,222,128,0.1)' : undefined,
                background: 'rgba(74,222,128,0.06)',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Code2 size={14} style={{ color: '#4ade80' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#4ade80', letterSpacing: '0.06em' }}>IMPROVED CODE</span>
              </div>
              {showImproved ? <ChevronUp size={14} style={{ color: '#4ade80' }} /> : <ChevronDown size={14} style={{ color: '#4ade80' }} />}
            </button>
            {showImproved && (
              <div style={{ borderRadius: '0 0 10px 10px', overflow: 'hidden', border: '1px solid rgba(74,222,128,0.15)', borderTop: 'none' }}>
                <CodeBlock code={review.reviewedCode} label="suggested.js" accent="#4ade80" />
              </div>
            )}
          </div>
        )}

        {/* Original Code */}
        {review.originalCode && (
          <div>
            <button
              className="collapsible-btn"
              onClick={() => setShowOriginal(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '10px 14px',
                borderRadius: showOriginal ? '10px 10px 0 0' : 10,
                border: '1px solid rgba(255,255,255,0.08)',
                borderBottom: showOriginal ? '1px solid rgba(255,255,255,0.05)' : undefined,
                background: 'rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <GitCompare size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>ORIGINAL CODE</span>
              </div>
              {showOriginal ? <ChevronUp size={14} style={{ color: 'rgba(255,255,255,0.3)' }} /> : <ChevronDown size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />}
            </button>
            {showOriginal && (
              <div style={{ borderRadius: '0 0 10px 10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', borderTop: 'none' }}>
                <CodeBlock code={review.originalCode} label="original.js" accent="rgba(255,255,255,0.25)" />
              </div>
            )}
          </div>
        )}

      </div>
    </>
  )
}