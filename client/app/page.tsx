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
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'AI Code Reviews',
    desc: 'Instantly analyze code quality, bugs, architecture, and performance bottlenecks.',
  },
  {
    icon: ShieldCheck,
    title: 'Security Detection',
    desc: 'Detect vulnerabilities, insecure patterns, and OWASP issues automatically.',
  },
  {
    icon: BookOpen,
    title: 'Smart Learning',
    desc: 'Get curated learning resources based on your exact coding mistakes.',
  },
  {
    icon: GitBranch,
    title: 'GitHub Integration',
    desc: 'Review pull requests automatically with AI-generated inline comments.',
  },
]

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-black text-white min-h-screen">

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-100px] h-[500px] w-[500px] rounded-full bg-violet-600/30 blur-3xl" />
        <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Code2 size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide">
                ReviewForge
              </h1>

              <p className="text-xs text-gray-500">
                AI Code Intelligence
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>

            <Link href="/dashboard" className="hover:text-white transition">
              Dashboard
            </Link>

            <Link href="/review" className="hover:text-white transition">
              Review
            </Link>
          </nav>

          <Link
            href="/review"
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-90 transition px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-violet-500/20"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>

            <div className="inline-flex items-center gap-2 border border-violet-500/20 bg-violet-500/10 text-violet-300 px-4 py-2 rounded-full text-sm mb-8">
              <Sparkles size={14} />
              Powered by Claude AI + RAG
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">

              AI-Powered

              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Code Review
              </span>

              Platform
            </h1>

            <p className="mt-8 text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
              Analyze repositories, detect bugs, find vulnerabilities,
              optimize performance, and learn from AI-generated mentorship.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <Link
                href="/review"
                className="group bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:scale-[1.02] transition-all duration-300 px-7 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-2xl shadow-violet-500/20"
              >
                Start Reviewing

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </Link>

              <button className="border border-white/10 hover:border-violet-500/40 hover:bg-white/5 transition px-7 py-4 rounded-2xl font-medium flex items-center justify-center gap-2">
                <Play size={16} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 mt-14">

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-violet-400">
                  50K+
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Reviews
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-400">
                  98%
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Accuracy
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-pink-400">
                  12+
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Languages
                </p>
              </div>

            </div>
          </div>

          {/* Right Hero UI */}
          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-3xl rounded-full" />

            <div className="relative rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl overflow-hidden shadow-2xl">

              {/* Top Bar */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">

                {/* Code Block */}
                <div className="rounded-2xl bg-black/50 border border-white/5 overflow-hidden">

                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <span className="text-xs text-gray-500">
                      auth.js
                    </span>

                    <span className="text-xs text-green-400">
                      Analyzed
                    </span>
                  </div>

                  <pre className="p-5 text-sm overflow-x-auto">
                    <code className="text-gray-300">
{`const password = "123456"

app.post("/login", (req, res) => {
  if(password === req.body.password){
    return true
  }
})`}
                    </code>
                  </pre>
                </div>

                {/* AI Warning */}
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

                  <div className="flex items-center gap-2 text-red-400 font-semibold mb-3">
                    <ShieldCheck size={18} />
                    Security Vulnerability
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    Hardcoded credentials detected. Store secrets in
                    environment variables and use password hashing.
                  </p>
                </div>

                {/* Suggestion */}
                <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

                  <div className="flex items-center gap-2 text-violet-300 font-semibold mb-3">
                    <Star size={18} />
                    AI Recommendation
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    Suggested secure authentication implementation generated
                    with bcrypt and JWT best practices.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-28">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            Built For Modern Developers
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything needed for AI-powered code analysis,
            mentorship, and productivity enhancement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-violet-500/30"
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5" />

              <div className="relative">

                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center mb-6">
                  <Icon className="text-violet-400" size={26} />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}