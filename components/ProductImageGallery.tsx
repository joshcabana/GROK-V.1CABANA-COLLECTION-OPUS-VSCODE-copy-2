'use client'

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { X, ZoomIn } from 'lucide-react'
import type { ProductImage } from '@/data/products'
import { cn } from '@/lib/utils'
import SafeImage from './SafeImage'

const gallerySizes = '(max-width: 1024px) 100vw, 60vw'

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return []
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ]
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
}

type ProductImageGalleryProps = {
  images: ProductImage[]
  priorityFirst?: boolean
}

export default function ProductImageGallery({ images, priorityFirst }: ProductImageGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const zoomRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(selectedIndex)
    }
  }, [emblaApi, selectedIndex])

  useEffect(() => {
    if (!zoomOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement | null
    const focusable = getFocusableElements(zoomRef.current)
    focusable[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomOpen(false)
      }
      if (event.key !== 'Tab') return
      const elements = getFocusableElements(zoomRef.current)
      if (!elements.length) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [zoomOpen])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      setSelectedIndex((current) => Math.min(current + 1, images.length - 1))
    }
    if (event.key === 'ArrowLeft') {
      setSelectedIndex((current) => Math.max(current - 1, 0))
    }
  }

  const openZoom = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      return
    }
    setZoomOpen(true)
  }

  return (
    <div className="space-y-4" onKeyDown={handleKeyDown} tabIndex={0} aria-label="Product gallery">
      <div className="md:hidden">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div
                  className="relative flex-[0_0_100%] aspect-[4/5] overflow-hidden rounded-3xl bg-white"
                  key={image.url}
                  onClick={openZoom}
                >
                  <SafeImage
                    src={image.url}
                    alt={image.alt}
                    sizes={gallerySizes}
                    priority={priorityFirst && index === 0}
                    className="transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none"
                  />
                  <button
                    type="button"
                    onClick={openZoom}
                    className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs uppercase tracking-[0.1em] text-ink shadow-sm"
                  >
                    <ZoomIn className="h-4 w-4" />
                    Zoom
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors',
                  selectedIndex === index ? 'bg-ink' : 'bg-line',
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white group">
          <SafeImage
            src={images[selectedIndex]?.url}
            alt={images[selectedIndex]?.alt ?? 'Product image'}
            sizes={gallerySizes}
            priority={priorityFirst && selectedIndex === 0}
            className="transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none group-hover:scale-105"
          />
        </div>
        <div className="mt-4 grid grid-cols-6 gap-3">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              aria-label={`Select image ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative aspect-[4/5] overflow-hidden rounded-2xl border transition-colors',
                selectedIndex === index ? 'border-ink' : 'border-line',
              )}
            >
              <SafeImage src={image.url} alt={image.alt} sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {zoomOpen && (
        <div
          className="motion-fade fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={zoomRef}
            className="motion-rise relative w-full max-w-4xl rounded-3xl bg-white p-4"
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-300 hover:border-ink"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone"
              style={{ touchAction: 'pinch-zoom' }}
            >
              <SafeImage
                src={images[selectedIndex]?.url}
                alt={images[selectedIndex]?.alt ?? 'Product image zoom'}
                sizes={gallerySizes}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
