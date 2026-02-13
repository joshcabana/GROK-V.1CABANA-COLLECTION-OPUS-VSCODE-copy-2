'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '@/lib/store';
import { formatMoney } from '@/lib/utils';
import { sitePolicy } from '@/lib/policy';

type LookupState = 'loading' | 'verified' | 'pending' | 'error';

type VerifiedOrder = {
  orderId: string;
  orderNumber: string;
  status: 'paid' | 'refunded' | 'failed';
  currency: string;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  impactCents: number;
  itemCount: number;
  customerEmailMasked: string;
  supportEmail: string;
  createdAt: string;
};

export default function OrderSuccessContent({ sessionId }: { sessionId?: string }) {
  const clearCart = useCartStore((state) => state.clear);
  const clearedRef = useRef(false);

  const [lookupState, setLookupState] = useState<LookupState>(sessionId ? 'loading' : 'pending');
  const [verifiedOrder, setVerifiedOrder] = useState<VerifiedOrder | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setLookupState('pending');
      setStatusMessage('Missing checkout session reference. If you were charged, contact support.');
      return;
    }

    const controller = new AbortController();

    async function verifyOrder() {
      try {
        setLookupState('loading');
        setStatusMessage('');

        const response = await fetch(`/api/orders/by-session/${encodeURIComponent(sessionId!)}`, {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        });

        const payload = (await response.json().catch(() => null)) as
          | (VerifiedOrder & { message?: string })
          | { message?: string; error?: string; status?: string }
          | null;

        if (response.ok && payload && 'orderId' in payload) {
          if (payload.status === 'paid') {
            setVerifiedOrder(payload);
            setLookupState('verified');
            return;
          }

          setLookupState('pending');
          setStatusMessage('Your payment is still processing. Please refresh in a moment.');
          return;
        }

        if (response.status === 404) {
          setLookupState('pending');
          setStatusMessage(
            payload?.message || 'Order verification is pending. Please refresh shortly.'
          );
          return;
        }

        setLookupState('error');
        setStatusMessage(
          (payload && 'error' in payload ? payload.error : undefined) ||
            'Unable to verify this order right now.'
        );
      } catch (error) {
        if (controller.signal.aborted) return;
        setLookupState('error');
        setStatusMessage(
          error instanceof Error ? error.message : 'Unable to verify this order right now.'
        );
      }
    }

    verifyOrder();

    return () => {
      controller.abort();
    };
  }, [sessionId]);

  useEffect(() => {
    if (lookupState !== 'verified') return;
    if (clearedRef.current) return;
    clearCart();
    clearedRef.current = true;
  }, [clearCart, lookupState]);

  return (
    <main className="min-h-screen py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">
          {lookupState === 'verified' ? 'Order confirmed' : 'Order verification'}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.015em] text-[#1d1d1f] md:text-4xl">
          {lookupState === 'verified'
            ? 'Thank you for shopping CABANA'
            : 'We are confirming your order'}
        </h1>

        {lookupState === 'loading' && (
          <p className="mt-4 text-base leading-relaxed text-[#1d1d1f]">
            Verifying your payment with CABANA checkout records...
          </p>
        )}

        {lookupState === 'verified' && verifiedOrder && (
          <>
            <p className="mt-4 text-base leading-relaxed text-[#1d1d1f]">
              Your payment has been verified. A branded confirmation email has been sent to{' '}
              {verifiedOrder.customerEmailMasked}.
            </p>

            <div className="mt-6 rounded-2xl border border-[#d2d2d7] bg-white p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73]">Order Number</p>
              <p className="mt-1 text-lg font-medium text-[#1d1d1f]">{verifiedOrder.orderNumber}</p>
              <div className="mt-4 grid gap-2 text-sm text-[#1d1d1f]">
                <p>
                  Items: <span className="font-medium">{verifiedOrder.itemCount}</span>
                </p>
                <p>
                  Total:{' '}
                  <span className="font-medium">{formatMoney(verifiedOrder.totalCents)}</span>
                </p>
                <p>
                  Impact contribution:{' '}
                  <span className="font-medium">{formatMoney(verifiedOrder.impactCents)}</span>
                </p>
              </div>
            </div>
          </>
        )}

        {lookupState === 'pending' && (
          <p className="mt-4 text-base leading-relaxed text-[#1d1d1f]">
            {statusMessage ||
              'Order verification is still pending. Please refresh this page shortly.'}
          </p>
        )}

        {lookupState === 'error' && (
          <p className="mt-4 text-base leading-relaxed text-[#b3261e]">
            {statusMessage || 'We could not verify your order yet. Please contact support.'}
          </p>
        )}

        {sessionId && (
          <p className="mt-3 text-sm text-[#6e6e73]">
            Reference: <span className="font-mono text-[#1d1d1f]">{sessionId}</span>
          </p>
        )}

        <p className="mt-4 text-sm text-[#6e6e73]">
          Need help? Contact{' '}
          <a className="underline" href={`mailto:${sitePolicy.supportEmail}`}>
            {sitePolicy.supportEmail}
          </a>
          .
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-full bg-[#1d1d1f] px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
          >
            Continue shopping
          </Link>
          <Link
            href="/impact"
            className="rounded-full border border-[#d2d2d7] bg-white px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#6e6e73]"
          >
            See your impact
          </Link>
        </div>
      </div>
    </main>
  );
}
