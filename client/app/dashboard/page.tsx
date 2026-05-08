'use client'

import Navbar from '@/components/layout/Navbar'
import StatsCard from '@/components/dashboard/StatsCard'
import ReviewHistory from '@/components/dashboard/ReviewHistory'
import Spinner from '@/components/ui/Spinner'
import { useDashboard } from '@/hooks/useDashboard'

import {
  BarChart2,
  Code2,
  ShieldCheck,
  TrendingUp
} from 'lucide-react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function DashboardPage() {
  const { reviews, stats, loading } = useDashboard()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              title="Total Reviews"
              value={stats.totalReviews}
              icon={Code2}
            />

            <StatsCard
              title="Average Score"
              value={`${stats.avgScore}/100`}
              icon={BarChart2}
              trend="up"
              sub="+4 this week"
            />

            <StatsCard
              title="Issues Fixed"
              value={stats.issuesByType?.bug ?? 0}
              icon={ShieldCheck}
            />

            <StatsCard
              title="Streak"
              value="7 days"
              icon={TrendingUp}
              trend="up"
            />
          </div>
        )}

        {stats?.trend?.length ? (
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm font-medium text-gray-400 mb-4">
              Score trend
            </h2>

            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={stats.trend}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#555', fontSize: 11 }}
                />

                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#555', fontSize: 11 }}
                />

                <Tooltip
                  contentStyle={{
                    background: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: 8
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : null}

        <div>
          <h2 className="text-sm font-medium text-gray-400 mb-4">
            Recent reviews
          </h2>

          <ReviewHistory reviews={reviews} />
        </div>
      </main>
    </div>
  )
}