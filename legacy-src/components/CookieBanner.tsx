'use client';

import { useEffect, useState } from 'react';

const storageKey = 'cabana.cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    window.localStorage.setItem(storageKey, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-3xl bg-white p-4 shadow-soft border border-black/10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-black/60">
          We use cookies to improve site performance and analytics. By continuing, you agree to our
          use of cookies. Learn more in our Privacy Policy.
        </p>
        <button
          onClick={accept}
          className="rounded-full bg-ink px-6 py-2 text-xs uppercase tracking-[0.2em] text-white"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
