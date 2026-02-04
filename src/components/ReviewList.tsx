const reviews = [
  {
    name: 'Sienna R.',
    location: 'Canberra, ACT',
    quote: 'Hands down the softest underwear I have owned. The fit is perfect and the waistband never digs in.',
  },
  {
    name: 'Liam P.',
    location: 'Byron Bay, NSW',
    quote: 'Premium quality and genuinely breathable. Love the minimal look and the mission behind the brand.',
  },
  {
    name: 'Eloise M.',
    location: 'Melbourne, VIC',
    quote: 'Elegant packaging, quick delivery, and the set feels luxurious. I will be ordering more.',
  },
];

export default function ReviewList() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {reviews.map((review) => (
        <div key={review.name} className="section-card p-6">
          <p className="text-sm text-black/70">“{review.quote}”</p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-black/50">
            {review.name} — {review.location}
          </p>
        </div>
      ))}
    </div>
  );
}
