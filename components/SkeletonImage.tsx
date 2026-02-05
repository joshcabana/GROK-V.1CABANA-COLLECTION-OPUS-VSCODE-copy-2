'use client'

import { cn } from '@/lib/utils'

type SkeletonImageProps = {
  className?: string
}

export default function SkeletonImage({ className }: SkeletonImageProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute inset-0 bg-[linear-gradient(110deg,#e6e6ea,45%,#f5f5f7,55%,#e6e6ea)] bg-[length:200%_100%] animate-shimmer',
        className,
      )}
    />
  )
}
