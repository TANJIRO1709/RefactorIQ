// Mirrors server/src/models/Review.js
export interface Review {
  _id:          string
  language:     string
  originalCode: string
  reviewedCode?: string
  summary?:     string
  score?:       number | null   // 0–100
  issues:       Issue[]
  createdAt:    string
}

export interface Issue {
  type:     string            // bug | security | performance | style
  severity: string            // Critical | High | Medium | Low
  line?:    number
  message:  string
}

export interface ReviewStats {
  totalReviews:  number
  avgScore:      number
  totalIssues:   number
  issuesByType:  Record<string, number>
  topLanguages:  { language: string; count: number }[]
  trend:         { date: string; score: number }[]
}
