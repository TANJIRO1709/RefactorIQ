'use client'
import { useState } from 'react'

export function useReview() {
  const [review, setReview]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const startReview = async (code, language) => {
    setLoading(true)
    setError(null)
    setReview(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || `Server error ${res.status}`)
      }

      // data.review is the full review object from your backend
      setReview(data.review)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { review, loading, error, startReview }
}