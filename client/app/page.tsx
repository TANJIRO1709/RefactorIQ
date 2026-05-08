'use client'

import Link from 'next/link'
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Code2,
  Zap,
  BookOpen,
  GitBranch,
  Star,
  Play,
  Terminal,
  CheckCircle2,
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'AI Code Reviews',
    desc: 'Instantly analyze code quality, bugs, architecture, and performance bottlenecks.',
    accent: '#a78bfa',
    tag: 'Core',
  },
  {
    icon: ShieldCheck,
    title: 'Security Detection',
    desc: 'Detect vulnerabilities, insecure patterns, and OWASP issues automatically.',
    accent: '#f87171',
    tag: 'Security',
  },
  {
    icon: BookOpen,
    title: 'Smart Learning',
    desc: 'Get curated learning resources based on your exact coding mistakes.',
    accent: '#34d399',
    tag: 'Growth',
  },
  {
    icon: GitBranch,
    title: 'GitHub Integration',
    desc: 'Review pull requests automatically with AI-generated inline comments.',
    accent: '#60a5fa',
    tag: 'DevOps',
  },
]

const stats = [
  { value: '50K+', label: 'Reviews Done', color: '#a78bfa' },
  { value: '98%', label: 'Accuracy Rate', color: '#f472b6' },
  { value: '12+', label: 'Languages', color: '#34d399' },
]

export default function LandingPage() {
  return (
    <main className="bg-[#080810] text-white min-h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        .font-display { font-family: 'Syne', sans-serif; }
        .font-mono-custom { font-family: 'JetBrains Mono', monospace; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.3); }
          70% { box-shadow: 0 0 0 16px rgba(167, 139, 250, 0); }
          100% { box-shadow: 0 0 0 0 rgba(167, 139, 250, 0); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(800%); opacity: 0; }
        }
        .float-card { animation: float 6s ease-in-out infinite; }
        .cta-pulse { animation: pulse-ring 2.5s ease-out infinite; }
        .scan-line { animation: scan 4s linear infinite; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotate(-5deg);
          transition: transform 0.3s ease;
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.5);
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1px;
          background: #a78bfa;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: white; }
        .nav-link:hover::after { width: 100%; }

        .code-highlight { color: #c084fc; }
        .code-string { color: #86efac; }
        .code-keyword { color: #60a5fa; }
        .code-fn { color: #fbbf24; }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 -z-10 grid-bg" />
      <div className="fixed inset-0 -z-10">
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}>
              <Code2 size={18} />
            </div>
            <div>
              <span className="font-display" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>ReviewForge</span>
              <span className="font-mono-custom" style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>v2.4.1</span>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 36, fontSize: 14 }}>
            {['Home', 'Dashboard', 'Review'].map(item => (
              <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="nav-link">{item}</Link>
            ))}
          </nav>

          <Link href="/review" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 20px', borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', fontSize: 14, fontWeight: 500, transition: 'opacity 0.2s', boxShadow: '0 0 32px rgba(124,58,237,0.3)' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 2rem 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

        {/* Left */}
        <div>
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.08)', fontSize: 12, color: '#c4b5fd', marginBottom: 32, fontWeight: 500, letterSpacing: '0.04em' }}>
            <Sparkles size={12} />
            POWERED BY CLAUDE AI + RAG
          </div>

          {/* Headline */}
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
            Code review
            <span style={{ display: 'block', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', backgroundImage: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 50%, #fb923c 100%)' }}>
              that thinks.
            </span>
          </h1>

          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 440, margin: '0 0 40px' }}>
            Analyze repositories, detect bugs, find vulnerabilities, and get AI-generated mentorship — all in seconds.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 56 }}>
            <Link href="/review" className="cta-pulse" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', fontWeight: 600, fontSize: 15, transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              Start Reviewing <ArrowRight size={16} />
            </Link>
            <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontSize: 15, cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}>
              <Play size={15} fill="currentColor" /> Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48 }}>
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-display" style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 6, letterSpacing: '0.02em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Code Terminal Card */}
        <div className="float-card" style={{ position: 'relative' }}>

          {/* Glow */}
          <div style={{ position: 'absolute', inset: '-40px', background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          {/* Card */}
          <div style={{ position: 'relative', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', overflow: 'hidden' }}>

            {/* Terminal Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['#ef4444','#f59e0b','#22c55e'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
              </div>
              <div className="font-mono-custom" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Terminal size={11} /> auth.js
              </div>
              <div style={{ fontSize: 11, background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '2px 10px', borderRadius: 999, border: '1px solid rgba(34,197,94,0.2)' }}>✓ Analyzed</div>
            </div>

            {/* Code */}
            <div style={{ padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
              {/* Scanner line */}
              <div className="scan-line" style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)', pointerEvents: 'none' }} />

              <pre className="font-mono-custom" style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
<span className="code-keyword">const</span> <span className="code-highlight">password</span> = <span className="code-string">"123456"</span>{'\n\n'}<span className="code-fn">app</span>.<span className="code-fn">post</span>(<span className="code-string">"/login"</span>, (<span className="code-highlight">req</span>, <span className="code-highlight">res</span>) {'=>'} {'{'}{'\n'}
  <span className="code-keyword">if</span>(<span className="code-highlight">password</span> === <span className="code-highlight">req</span>.<span className="code-highlight">body</span>.<span className="code-highlight">password</span>){'{'}{'\n'}
    <span className="code-keyword">return</span> <span className="code-keyword">true</span>{'\n'}
  {'}'}{'\n'}
{'}'})</pre>
            </div>

            {/* Findings */}
            <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>

              <div style={{ borderRadius: 12, border: '1px solid rgba(248,113,113,0.2)', background: 'rgba(248,113,113,0.07)', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f87171', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                  <ShieldCheck size={15} /> Security Vulnerability · CRITICAL
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  Hardcoded credentials detected. Use environment variables and bcrypt hashing.
                </p>
              </div>

              <div style={{ borderRadius: 12, border: '1px solid rgba(167,139,250,0.2)', background: 'rgba(167,139,250,0.07)', padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c4b5fd', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                  <Star size={15} /> AI Recommendation
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  Secure auth flow with JWT + bcrypt generated. 3 learning resources attached.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 120px' }}>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <p className="font-mono-custom" style={{ fontSize: 11, color: '#a78bfa', letterSpacing: '0.15em', marginBottom: 12 }}>CAPABILITIES</p>
            <h2 className="font-display" style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>
              Built for modern<br />developers.
            </h2>
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 280, textAlign: 'right', lineHeight: 1.7, marginBottom: 4 }}>
            Everything you need for AI-powered analysis, mentorship, and security scanning.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(124,58,237,0.4), rgba(236,72,153,0.4), transparent)', marginBottom: 48 }} />

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {features.map(({ icon: Icon, title, desc, accent, tag }) => (
            <div key={title} className="feature-card" style={{ position: 'relative', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)', padding: '28px 24px', cursor: 'pointer', transition: 'border-color 0.3s, background 0.3s', overflow: 'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}40`; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; }}>

              {/* Corner accent */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: `radial-gradient(circle at 100% 0%, ${accent}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

              {/* Tag */}
              <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', color: accent, background: `${accent}15`, border: `1px solid ${accent}30`, padding: '3px 10px', borderRadius: 999, marginBottom: 20 }}>{tag.toUpperCase()}</div>

              {/* Icon */}
              <div className="feature-icon" style={{ width: 44, height: 44, borderRadius: 10, background: `${accent}15`, border: `1px solid ${accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: accent, transition: 'transform 0.3s ease' }}>
                <Icon size={22} />
              </div>

              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em' }}>{title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div style={{ marginTop: 48, borderRadius: 16, border: '1px solid rgba(124,58,237,0.2)', background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(236,72,153,0.06))', padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              {[0,1,2].map(i => (
                <CheckCircle2 key={i} size={16} style={{ color: '#4ade80' }} />
              ))}
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginLeft: 4 }}>No credit card · Free tier available · Cancel anytime</span>
            </div>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
              Start your first review in under 60 seconds.
            </p>
          </div>
          <Link href="/review" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 10, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Try ReviewForge Free <ArrowRight size={15} />
          </Link>
        </div>

      </section>

    </main>
  )
}