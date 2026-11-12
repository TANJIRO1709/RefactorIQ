'use client'
import { useState } from 'react'
import api from '@/lib/api'

export function useReview() {
  const [review, setReview]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const run = async (request) => {
    setLoading(true)
    setError(null)
    setReview(null)

    try {
      const { data } = await request()
      setReview(data.review)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const startReview = (code, language) => run(() => api.post('/api/review', { code, language }))

  // Open a saved review (from dashboard history)
  const loadReview = (id) => run(() => api.get(`/api/review/${encodeURIComponent(id)}`))

  return { review, loading, error, startReview, loadReview }
}
