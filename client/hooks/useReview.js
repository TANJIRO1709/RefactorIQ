'use client'
import { useState } from 'react'

export function useReview() {
  const [review, setReview]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const startReview = async (code, language) => {
    setLoading(true)
    setError(null)
    setReview('')

    try {
      // POST to Express backend — returns SSE stream
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })

      if (!res.ok) throw new Error('Review request failed')

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        // SSE lines come as "data: <text>\n\n"
        chunk.split('\n').forEach(line => {
          if (line.startsWith('data: ')) {
            const txt = line.replace('data: ', '')
            if (txt === '[DONE]') return
            setReview(prev => (prev || '') + txt)
          }
        })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { review, loading, error, startReview }
}
