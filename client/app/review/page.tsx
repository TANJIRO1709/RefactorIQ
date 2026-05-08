'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import CodeEditor from '@/components/editor/Codeeditor'
import LanguageSelector from '@/components/editor/LanguageSelector'
import ReviewPanel from '@/components/review/ReviewPanel'
import { useReview } from '@/hooks/useReview'
import {
  Play,
  Loader2,
  Code2,
  Sparkles,
  ChevronRight,
  Terminal,
  Zap,
} from 'lucide-react'

export default function ReviewPage() {
  const [code, setCode] = useState('// Paste your code here...')
  const [language, setLanguage] = useState('javascript')
  const { review, loading, error, startReview } = useReview()
  const [mobileTab, setMobileTab] = useState<'editor' | 'review'>('editor')

  const handleSubmit = () => {
    startReview(code, language)
    setMobileTab('review')
  }

  const lineCount = code.split('\n').length

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#080810',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-display  { font-family: 'Syne', sans-serif; }
        .font-mono-rev { font-family: 'JetBrains Mono', monospace; }

        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(124,58,237,0); }
        }

        .spin       { animation: spin 1s linear infinite; }
        .fade-up    { animation: fadeUp 0.35s ease forwards; }
        .pulse-btn  { animation: pulseGlow 2s ease-in-out infinite; }

        .review-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          font-weight: 600; font-size: 14px; color: #fff;
          border: none; cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .review-btn:hover:not(:disabled) { opacity: 0.88; transform: scale(1.02); }
        .review-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .tab-btn {
          flex: 1; padding: 10px 0; border: none; background: none;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: color 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .tab-btn.active  { color: #fff; }
        .tab-btn.inactive { color: rgba(255,255,255,0.38); }

        .panel-divider {
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(124,58,237,0.4) 30%, rgba(236,72,153,0.3) 70%, transparent);
          flex-shrink: 0;
        }

        /* Scrollbar */
        .custom-scroll::-webkit-scrollbar       { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.35); border-radius: 999px; }

        @media (max-width: 768px) {
          .desktop-split { display: none !important; }
          .mobile-tabs   { display: flex !important; }
          .mobile-panel  { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-split { display: flex !important; }
          .mobile-tabs   { display: none !important; }
          .mobile-panel  { display: none !important; }
        }
      `}</style>

      <Navbar />

      {/* Sub-header toolbar */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(8,8,16,0.9)',
          backdropFilter: 'blur(12px)',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Left — breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <div
            style={{
              width: 28, height: 28, borderRadius: 7,
              background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Code2 size={14} />
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>ReviewForge</span>
          <ChevronRight size={13} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
          <span className="font-mono-rev" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            review.{language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : language === 'python' ? 'py' : language}
          </span>
          <span
            style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 999,
              background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)',
              color: '#c4b5fd', flexShrink: 0,
            }}
          >
            {lineCount} lines
          </span>
        </div>

        {/* Center — language + action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <LanguageSelector value={language} onChange={setLanguage} />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`review-btn ${!loading ? 'pulse-btn' : ''}`}
          >
            {loading
              ? <Loader2 size={15} className="spin" />
              : <Zap size={15} />
            }
            {loading ? 'Analyzing...' : 'Run Review'}
          </button>
        </div>

        {/* Right — status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div
            style={{
              width: 7, height: 7, borderRadius: '50%',
              background: loading ? '#f59e0b' : review ? '#4ade80' : 'rgba(255,255,255,0.2)',
              boxShadow: loading ? '0 0 8px #f59e0b' : review ? '0 0 8px #4ade80' : 'none',
              transition: 'all 0.4s',
            }}
          />
          <span
            className="font-mono-rev"
            style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}
          >
            {loading ? 'running' : review ? 'complete' : 'idle'}
          </span>
        </div>
      </div>

      {/* Mobile tab bar */}
      <div
        className="mobile-tabs"
        style={{
          display: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(8,8,16,0.95)',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <button
          className={`tab-btn ${mobileTab === 'editor' ? 'active' : 'inactive'}`}
          onClick={() => setMobileTab('editor')}
        >
          <Terminal size={13} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          Editor
        </button>
        <button
          className={`tab-btn ${mobileTab === 'review' ? 'active' : 'inactive'}`}
          onClick={() => setMobileTab('review')}
        >
          <Sparkles size={13} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
          Review
          {review && (
            <span
              style={{
                display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                background: '#a78bfa', marginLeft: 6, verticalAlign: 'middle',
              }}
            />
          )}
        </button>
        {/* Active tab indicator */}
        <div
          style={{
            position: 'absolute', bottom: 0, height: 2, width: '50%',
            background: 'linear-gradient(90deg,#7c3aed,#ec4899)',
            borderRadius: '2px 2px 0 0',
            transition: 'transform 0.25s ease',
            transform: mobileTab === 'review' ? 'translateX(100%)' : 'translateX(0)',
          }}
        />
      </div>

      {/* ── Desktop split layout ── */}
      <div
        className="desktop-split"
        style={{
          display: 'none',
          flex: 1,
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* Left — Editor panel */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(0,0,0,0.25)',
              flexShrink: 0,
            }}
          >
            <Terminal size={13} style={{ color: '#a78bfa' }} />
            <span className="font-mono-rev" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
              EDITOR
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              {['#ef4444','#f59e0b','#22c55e'].map(c => (
                <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <CodeEditor value={code} onChange={setCode} language={language} />
          </div>
        </div>

        {/* Vertical divider */}
        <div className="panel-divider" />

        {/* Right — Review panel */}
        <div
          className="custom-scroll"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflow: 'hidden',
          }}
        >
          {/* Panel header */}
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(0,0,0,0.25)',
              flexShrink: 0,
            }}
          >
            <Sparkles size={13} style={{ color: '#f472b6' }} />
            <span className="font-mono-rev" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
              AI REVIEW
            </span>
            {review && (
              <span
                style={{
                  marginLeft: 8, fontSize: 10, padding: '2px 8px', borderRadius: 999,
                  background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)',
                  color: '#4ade80',
                }}
              >
                Ready
              </span>
            )}
            {loading && (
              <span
                style={{
                  marginLeft: 8, fontSize: 10, padding: '2px 8px', borderRadius: 999,
                  background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)',
                  color: '#fbbf24',
                }}
              >
                Analyzing…
              </span>
            )}
          </div>

          {/* Review Panel or empty state */}
          <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            {!review && !loading && !error ? (
              <EmptyState onRun={handleSubmit} loading={loading} />
            ) : (
              <div style={{ padding: '16px' }} className="fade-up">
                <ReviewPanel review={review} loading={loading} error={error} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile single-panel layout ── */}
      <div
        className="mobile-panel"
        style={{
          display: 'none',
          flex: 1,
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {mobileTab === 'editor' ? (
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <CodeEditor value={code} onChange={setCode} language={language} />
          </div>
        ) : (
          <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
            {!review && !loading && !error ? (
              <EmptyState onRun={handleSubmit} loading={loading} />
            ) : (
              <div className="fade-up">
                <ReviewPanel review={review} loading={loading} error={error} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer status bar */}
      <div
        style={{
          height: 28, borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center',
          padding: '0 16px', gap: 20,
          flexShrink: 0,
        }}
      >
        {[
          { label: language.toUpperCase(), color: '#a78bfa' },
          { label: `${lineCount} lines`, color: 'rgba(255,255,255,0.3)' },
          { label: 'UTF-8', color: 'rgba(255,255,255,0.3)' },
          { label: 'Claude AI', color: '#f472b6' },
        ].map(({ label, color }) => (
          <span
            key={label}
            className="font-mono-rev"
            style={{ fontSize: 10, color, letterSpacing: '0.06em' }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Empty state component ── */
function EmptyState({ onRun, loading }: { onRun: () => void; loading: boolean }) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: 320, padding: 40, textAlign: 'center', gap: 20,
      }}
    >
      {/* Icon ring */}
      <div
        style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(124,58,237,0.08)',
          border: '1px solid rgba(124,58,237,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Sparkles size={28} style={{ color: '#a78bfa' }} />
      </div>

      <div>
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 18, fontWeight: 700,
            margin: '0 0 8px', letterSpacing: '-0.02em',
          }}
        >
          No review yet
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', margin: 0, lineHeight: 1.7, maxWidth: 220 }}>
          Paste your code in the editor and click Run Review to get AI feedback.
        </p>
      </div>

      <button
        onClick={onRun}
        disabled={loading}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 22px', borderRadius: 10,
          background: 'linear-gradient(135deg,#7c3aed,#ec4899)',
          border: 'none', color: '#fff', fontSize: 14,
          fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.5 : 1,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <Zap size={15} /> Run Review
      </button>
    </div>
  )
}