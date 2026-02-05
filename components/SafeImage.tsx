'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import SkeletonImage from './SkeletonImage'
import { cn } from '@/lib/utils'

const fallbackSrc = 'https://placehold.co/800x1000?text=CABANA'

type SafeImageProps = {
  src?: string
  alt: string
  className?: string
  imageClassName?: string
  sizes?: string
  priority?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
  fill?: boolean
  width?: number
  height?: number
  onClick?: () => void
}

export default function SafeImage({
  src,
  alt,
  className,
  imageClassName,
  sizes,
  priority,
  fetchPriority,
  fill = true,
  width,
  height,
  onClick,
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc)
    setLoaded(false)
  }, [src])

  return (
    <div className={cn('relative overflow-hidden bg-white', className)}>
      {!loaded && <SkeletonImage />}
      <Image
        src={currentSrc}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        fetchPriority={fetchPriority}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none',
          imageClassName,
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoadingComplete={() => setLoaded(true)}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            console.warn(`SafeImage fallback for: ${src}`)
            setCurrentSrc(fallbackSrc)
          }
        }}
        onClick={onClick}
      />
    </div>
  )
}
