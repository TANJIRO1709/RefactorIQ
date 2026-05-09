'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Code2, LogOut, LayoutDashboard, GitBranch, Menu, X, Zap, Github } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .nav-root {
          position: sticky; top: 0; z-index: 100;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(8,8,16,0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          font-family: 'DM Sans', sans-serif;
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 20px;
          height: 62px; display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
        .nav-logo-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 18px rgba(124,58,237,0.35); flex-shrink: 0;
        }
        .nav-logo-text { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: #fff; letter-spacing: -0.02em; line-height: 1; }
        .nav-logo-sub { font-family: 'DM Sans', sans-serif; font-size: 10px; color: rgba(255,255,255,0.28); letter-spacing: 0.06em; margin-top: 1px; }

        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 13px; border-radius: 8px;
          font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,0.45); text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .nav-link:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.9); }

        /* ── NEW: active repo-review link style ── */
        .nav-link-repo {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 13px; border-radius: 8px;
          font-size: 13.5px; font-weight: 500;
          color: rgba(167,139,250,0.75); text-decoration: none;
          border: 1px solid rgba(124,58,237,0.2);
          background: rgba(124,58,237,0.07);
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .nav-link-repo:hover { background: rgba(124,58,237,0.14); color: #c4b5fd; border-color: rgba(124,58,237,0.4); }

        .nav-btn-ghost {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 13px; border-radius: 8px;
          font-size: 13.5px; font-weight: 500;
          color: rgba(255,255,255,0.45);
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s, color 0.15s;
        }
        .nav-btn-ghost:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }

        .nav-btn-primary {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 18px; border-radius: 9px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          font-size: 13.5px; font-weight: 600; color: #fff;
          border: none; cursor: pointer; text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 0 22px rgba(124,58,237,0.28);
          white-space: nowrap;
        }
        .nav-btn-primary:hover { opacity: 0.87; transform: scale(1.02); }
        .nav-btn-primary:active { transform: scale(0.98); }

        .nav-signin {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 18px; border-radius: 9px;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          font-size: 13.5px; font-weight: 600; color: #fff;
          border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 0 22px rgba(124,58,237,0.28);
        }
        .nav-signin:hover { opacity: 0.87; transform: scale(1.02); }

        .nav-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.08); flex-shrink: 0; }

        .avatar-ring {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1.5px solid rgba(167,139,250,0.4);
          overflow: hidden; flex-shrink: 0; transition: border-color 0.2s;
        }
        .avatar-ring:hover { border-color: rgba(167,139,250,0.8); }
        .avatar-ring img { width: 100%; height: 100%; object-fit: cover; }

        .hamburger {
          display: none; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.6); cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .hamburger:hover { background: rgba(255,255,255,0.08); color: #fff; }

        .mobile-drawer {
          display: none; flex-direction: column;
          padding: 12px 20px 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(8,8,16,0.97); gap: 4px;
        }
        .mobile-drawer.open { display: flex; }

        .mobile-link {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 14px; border-radius: 10px;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.55); text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .mobile-link:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .mobile-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 6px 0; }

        @media (max-width: 640px) {
          .hamburger  { display: flex !important; }
          .nav-links  { display: none !important; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">

          {/* Logo */}
          <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">
              <Code2 size={16} color="#fff" />
            </div>
            <div>
              <div className="nav-logo-text">ReviewForge</div>
              <div className="nav-logo-sub">AI · CODE · REVIEW</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="nav-links" style={{ marginLeft: 'auto', marginRight: 12 }}>
            {session ? (
              <>
                <Link href="/dashboard" className="nav-link">
                  <LayoutDashboard size={14} /> Dashboard
                </Link>

                {/* ── NEW: Repo Review link ── */}
                <Link href="/repo-review" className="nav-link-repo">
                  <Github size={14} /> Repo Review
                </Link>

                <div className="nav-divider" />

                <Link href="/review" className="nav-btn-primary">
                  <Zap size={14} /> New Review
                </Link>

                <div className="nav-divider" />

                <button onClick={() => signOut()} className="nav-btn-ghost" title="Sign out">
                  <LogOut size={14} /> Sign out
                </button>

                {session.user?.image && (
                  <div className="avatar-ring">
                    <img src={session.user.image} alt={session.user.name ?? 'avatar'} />
                  </div>
                )}
              </>
            ) : (
              <button onClick={() => signIn('github')} className="nav-signin">
                <GitBranch size={14} /> Sign in with GitHub
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
          {session ? (
            <>
              {session.user && (
                <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', marginBottom:4 }}>
                  {session.user.image && (
                    <div className="avatar-ring">
                      <img src={session.user.image} alt="avatar" />
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>{session.user.name}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)' }}>{session.user.email}</div>
                  </div>
                </div>
              )}

              <div className="mobile-divider" />

              <Link href="/dashboard" className="mobile-link" onClick={() => setMobileOpen(false)}>
                <LayoutDashboard size={15} /> Dashboard
              </Link>

              {/* ── NEW: Repo Review in mobile drawer ── */}
              <Link href="/repo-review" className="mobile-link" onClick={() => setMobileOpen(false)}
                style={{ color: '#c4b5fd' }}>
                <Github size={15} /> Repo Review
              </Link>

              <Link href="/review" className="mobile-link" onClick={() => setMobileOpen(false)}
                style={{ color:'#c4b5fd' }}>
                <Zap size={15} /> New Review
              </Link>

              <div className="mobile-divider" />

              <button
                onClick={() => { signOut(); setMobileOpen(false) }}
                className="mobile-link"
                style={{ background:'none', border:'none', cursor:'pointer', width:'100%', textAlign:'left', fontFamily:"'DM Sans', sans-serif" }}
              >
                <LogOut size={15} /> Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="nav-btn-primary"
              style={{ width:'100%', justifyContent:'center', padding:'12px' }}
            >
              <GitBranch size={15} /> Sign in with GitHub
            </button>
          )}
        </div>
      </nav>
    </>
  )
}