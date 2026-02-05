const badges = [
  {
    title: 'Sustainable Materials',
    description: 'Low-impact modal and responsible production partners.',
  },
  {
    title: '15% Donated',
    description: 'Supporting mental health and women’s empowerment initiatives.',
  },
  {
    title: 'Secure Checkout',
    description: 'Encrypted payments and privacy-first order handling.',
  },
];

export default function TrustBadges() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {badges.map((badge) => (
        <div key={badge.title} className="section-card p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-black/70">Trust</p>
          <h3 className="mt-2 font-heading text-lg">{badge.title}</h3>
          <p className="mt-2 text-sm text-black/60">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
