export interface Review {
  _id:       string
  userId:    string
  code:      string
  language:  string
  result:    string           // raw markdown from AI
  issues:    Issue[]
  score:     number           // 0–100
  createdAt: string
}

export interface Issue {
  type:        'bug' | 'security' | 'performance' | 'style'
  severity:    'critical' | 'warning' | 'info'
  title:       string
  description: string
  line?:       number
  fix?:        string
  resources?:  Resource[]
}

export interface Resource {
  title: string
  url:   string
}

export interface User {
  id:    string
  name:  string
  email: string
  image: string
}

export interface ReviewStats {
  totalReviews:  number
  avgScore:      number
  issuesByType:  Record<string, number>
  topLanguages:  { language: string; count: number }[]
  trend:         { date: string; score: number }[]
}