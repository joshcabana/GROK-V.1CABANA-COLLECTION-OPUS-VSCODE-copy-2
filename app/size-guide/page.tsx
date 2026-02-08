import { supportEmailHref, sitePolicy } from '@/lib/policy'

const sizeRows = [
  { size: 'XS', waist: '65-70 cm', hips: '85-90 cm' },
  { size: 'S', waist: '71-76 cm', hips: '91-96 cm' },
  { size: 'M', waist: '77-82 cm', hips: '97-102 cm' },
  { size: 'L', waist: '83-88 cm', hips: '103-108 cm' },
  { size: 'XL', waist: '89-95 cm', hips: '109-115 cm' },
]

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Size Guide</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          Size Guide
        </h1>
        <p className="mt-6 text-sm text-[#6e6e73]">
          Measurements are a guide. If you are between sizes, choose based on your preferred fit.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-[#d2d2d7] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f5f5f7] text-[#6e6e73]">
              <tr>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Waist</th>
                <th className="px-4 py-3 font-medium">Hips</th>
              </tr>
            </thead>
            <tbody>
              {sizeRows.map((row) => (
                <tr key={row.size} className="border-t border-[#d2d2d7] text-[#1d1d1f]">
                  <td className="px-4 py-3">{row.size}</td>
                  <td className="px-4 py-3">{row.waist}</td>
                  <td className="px-4 py-3">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-[#6e6e73]">
          Need help with fit? Contact{' '}
          <a href={supportEmailHref} className="underline hover:no-underline">
            {sitePolicy.supportEmail}
          </a>
          .
        </p>
      </div>
    </main>
  )
}
