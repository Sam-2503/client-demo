import React from 'react'
import './styles/ProgressBar.css'
import { cn } from '../utils/cn'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string | React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  showPercent?: boolean
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  size = 'md',
  animated = true,
  showPercent = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn('progress-container', className)}>
      {(label || showPercent) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercent && (
            <span className="progress-percent">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={cn('progress', `progress-${size}`)}>
        <div
          className={cn(
            'progress-fill',
            animated && 'progress-animated'
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
