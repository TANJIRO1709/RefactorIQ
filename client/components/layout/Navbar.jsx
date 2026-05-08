'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Code2, LogOut, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b border-[#2a2a2a] px-6 py-3 flex items-center justify-between bg-[#0f0f0f]">
      <Link href="/" className="flex items-center gap-2 text-white font-semibold text-lg">
        <Code2 size={22} className="text-violet-500" />
        CodeReview AI
      </Link>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link href="/dashboard" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition">
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link href="/review" className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-lg transition">
              New Review
            </Link>
            <button onClick={() => signOut()} className="text-gray-500 hover:text-gray-300 transition">
              <LogOut size={18} />
            </button>
            <img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full" />
          </>
        ) : (
          <button
            onClick={() => signIn('github')}
            className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition"
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </nav>
  )
}