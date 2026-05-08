'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/api'
import type { Review, ReviewStats } from '@/lib/types'

export function useDashboard() {
  const [reviews, setReviews]   = useState<Review[]>([])
  const [stats,   setStats]     = useState<ReviewStats | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error,   setError]     = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewRes, statsRes] = await Promise.all([
          api.get<Review[]>('/api/reviews'),
          api.get<ReviewStats>('/api/reviews/stats'),
        ])
        setReviews(reviewRes.data)
        setStats(statsRes.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { reviews, stats, loading, error }
}
