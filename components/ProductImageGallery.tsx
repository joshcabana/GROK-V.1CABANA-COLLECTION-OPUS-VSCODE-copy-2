'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRight, X, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import SafeImage from './SafeImage'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/data/products'

const GALLERY_SIZES = '(max-width: 1024px) 100vw, 60vw'

function getFocusable(container: HTMLElement | null) {
  if (!container) return []
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  )
}

export default function ProductImageGallery({ images }: { images: ProductImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [zoomIndex, setZoomIndex] = useState(0)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  const openZoom = useCallback(
    (index: number) => {
      setZoomIndex(index)
      setZoomOpen(true)
    },
    []
  )

  const closeZoom = useCallback(() => {
    setZoomOpen(false)
  }, [])

  useEffect(() => {
    if (!zoomOpen) return
    previousFocusRef.current = document.activeElement as HTMLElement
    const modal = modalRef.current
    const focusables = getFocusable(modal)
    focusables[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeZoom()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setZoomIndex((prev) => (prev - 1 + images.length) % images.length)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setZoomIndex((prev) => (prev + 1) % images.length)
      }
      if (event.key !== 'Tab') return
      const items = getFocusable(modal)
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [zoomOpen, images.length, closeZoom])

  const dotButtons = useMemo(
    () =>
      images.map((_, index) => (
        <button
          key={`dot-${index}`}
          className={cn(
            'h-2 w-2 rounded-full transition-colors',
            selectedIndex === index ? 'bg-[#1d1d1f]' : 'bg-[#d2d2d7]'
          )}
          aria-label={`Go to slide ${index + 1}`}
          onClick={() => scrollTo(index)}
        />
      )),
    [images, scrollTo, selectedIndex]
  )

  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden rounded-2xl bg-white"
        ref={emblaRef}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            emblaApi?.scrollPrev()
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            emblaApi?.scrollNext()
          }
        }}
      >
        <div className="flex">
          {images.map((image, index) => (
            <div key={image.url} className="min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[4/5]">
                <SafeImage
                  src={image.url}
                  alt={image.alt}
                  sizes={GALLERY_SIZES}
                  priority={index === 0}
                  className="absolute inset-0"
                  imageClassName="transition-transform duration-500 md:hover:scale-105 motion-reduce:transform-none"
                  onClick={() => openZoom(index)}
                />
                <button
                  className="absolute right-4 top-4 hidden items-center gap-2 rounded-full border border-[#d2d2d7] bg-white/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#1d1d1f] transition-colors hover:bg-white md:flex"
                  onClick={() => openZoom(index)}
                >
                  <ZoomIn className="h-4 w-4" />
                  Zoom
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 md:hidden">{dotButtons}</div>

      <div className="mt-6 hidden grid-cols-6 gap-3 md:grid">
        {images.map((image, index) => (
          <button
            key={`thumb-${image.url}`}
            className={cn(
              'relative aspect-[4/5] overflow-hidden rounded-xl border transition-colors',
              selectedIndex === index ? 'border-[#1d1d1f]' : 'border-transparent'
            )}
            onClick={() => scrollTo(index)}
          >
            <SafeImage src={image.url} alt={image.alt} sizes="120px" className="absolute inset-0" />
          </button>
        ))}
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-10"
          ref={modalRef}
        >
          <div className="absolute inset-0" onClick={closeZoom} aria-hidden="true" />
          <div className="relative z-10 flex w-full max-w-4xl flex-col gap-4">
            <div className="flex items-center justify-between text-white">
              <p className="text-xs uppercase tracking-[0.2em]">Zoom</p>
              <button
                className="rounded-full border border-white/40 p-2"
                onClick={closeZoom}
                aria-label="Close zoom"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black">
              <Image
                src={images[zoomIndex]?.url || 'https://placehold.co/800x1000?text=CABANA'}
                alt={images[zoomIndex]?.alt || 'CABANA product image'}
                fill
                sizes="100vw"
                className="object-contain"
                style={{ touchAction: 'pinch-zoom' }}
                priority
              />
            </div>
            <div className="flex items-center justify-between text-white">
              <button
                className="flex items-center gap-2 text-sm uppercase tracking-[0.2em]"
                onClick={() => setZoomIndex((prev) => (prev - 1 + images.length) % images.length)}
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Prev
              </button>
              <button
                className="flex items-center gap-2 text-sm uppercase tracking-[0.2em]"
                onClick={() => setZoomIndex((prev) => (prev + 1) % images.length)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
