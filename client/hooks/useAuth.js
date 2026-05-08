'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    user:          session?.user ?? null,
    accessToken:   session?.accessToken ?? null,
    isLoading:     status === 'loading',
    isAuth:        status === 'authenticated',
    signInGitHub:  () => signIn('github'),
    signOut:       () => signOut({ callbackUrl: '/' }),
  }
}
