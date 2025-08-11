# Mobile QA Checklist (360–430px)

Use this checklist page-by-page. Target width 360–430px, iOS Safari and Android Chrome.

## Viewport & Base

- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1" />` present
- [ ] Base text size ≥ 16px; body line-height ≥ 1.4
- [ ] No horizontal scroll at 360px width
- [ ] Reduced motion respected (no layout-affecting animations on mobile)

## Header / Navigation

- [ ] Header collapses to mobile drawer
- [ ] Hamburger/tap targets ≥ 44×44px
- [ ] Body scroll locks when drawer open
- [ ] Safe-area insets (top/bottom) applied

## Hero / Sections

- [ ] No 100vh bug (use min-h: 100svh with 100vh fallback)
- [ ] Images/videos responsive: `w-full` + `h-auto` or fixed aspect
- [ ] Hero media has poster/explicit sizing to reduce CLS

## Images & Media

- [ ] Images lazy-loaded below the fold (`loading="lazy"`)
- [ ] 360° videos pause when offscreen (IntersectionObserver)

## Forms & Buttons

- [ ] Inputs legible and accessible
- [ ] Buttons/pills ≥ 44×44px
- [ ] Focus states visible; errors announced

## Content

- [ ] Grids wrap; no clipped text
- [ ] Long words/links wrap and do not overflow

## Sticky / Drawers / Modals

- [ ] Sticky bars do not overlap content
- [ ] Modals center; background scroll locked
- [ ] Close with ESC and outside click

## Footer

- [ ] Links legible and tappable (≥ 44px touch)

Notes:

- iOS: verify safe-areas and `100svh` behavior
- Android: verify video autoplay policy and offscreen pause
