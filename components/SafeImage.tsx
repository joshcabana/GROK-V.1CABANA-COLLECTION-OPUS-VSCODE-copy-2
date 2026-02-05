'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import SkeletonImage from './SkeletonImage'
import { cn } from '@/lib/utils'

const FALLBACK_SRC = 'https://placehold.co/800x1000?text=Image+Unavailable'

type SafeImageProps = {
  src?: string | null
  alt: string
  sizes: string
  priority?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
  className?: string
  onClick?: () => void
}

export default function SafeImage({
  src,
  alt,
  sizes,
  priority,
  fetchPriority,
  className,
  onClick,
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src || FALLBACK_SRC)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!src) {
      console.warn('SafeImage received empty src, using fallback image.')
    }
    setCurrentSrc(src || FALLBACK_SRC)
    setIsLoaded(false)
  }, [src])

  const handleError = () => {
    if (currentSrc !== FALLBACK_SRC) {
      console.warn(`SafeImage failed to load: ${currentSrc}`)
      setCurrentSrc(FALLBACK_SRC)
    }
  }

  return (
    <div className="absolute inset-0">
      {!isLoaded && <SkeletonImage />}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={fetchPriority}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={cn('object-cover', className)}
        onClick={onClick}
      />
    </div>
  )
}
