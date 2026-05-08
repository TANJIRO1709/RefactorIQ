import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Props {
  title:   string
  value:   string | number
  sub?:    string
  icon:    LucideIcon
  trend?:  'up' | 'down'
}

export default function StatsCard({ title, value, sub, icon: Icon, trend }: Props) {
  return (
    <div className="glass rounded-2xl p-5 flex items-start gap-4">
      <div className="bg-violet-900/30 p-2.5 rounded-xl">
        <Icon size={20} className="text-violet-400" />
      </div>
      <div>
        <p className="text-gray-500 text-xs mb-0.5">{title}</p>
        <p className="text-white text-2xl font-semibold">{value}</p>
        {sub && (
          <p className={cn('text-xs mt-0.5', trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-500')}>
            {sub}
          </p>
        )}
      </div>
    </div>
  )
}