import { cn } from '@/lib/utils'

type BrandWordmarkProps = {
  className?: string
  cabanaClassName?: string
  collectionsClassName?: string
}

export default function BrandWordmark({
  className,
  cabanaClassName,
  collectionsClassName,
}: BrandWordmarkProps) {
  return (
    <div className={cn('select-none text-[#101417]', className)}>
      <div
        className={cn(
          "font-['Didot','Baskerville','Times_New_Roman',serif] leading-none uppercase",
          cabanaClassName
        )}
      >
        CABANA
      </div>
      <div
        className={cn(
          'mt-2 font-sans leading-none uppercase',
          collectionsClassName
        )}
      >
        COLLECTIONS
      </div>
    </div>
  )
}
