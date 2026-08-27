---
target: "src/app/page.tsx (home: hero + stats + team + footer)"
total_score: 19
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-27T12-51-38Z
slug: src-app-page-tsx-home-hero-stats-team-footer
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Hover/reveal feedback present; nothing async to report yet |
| 2 | Match System / Real World | 4 | Real MLS zones, real agent names, real address, Ecuador-Spanish copy |
| 3 | User Control and Freedom | 2 | Header is `absolute`, scrolls away permanently; no way back to nav without scrolling to top |
| 4 | Consistency and Standards | 3 | Hero CTAs are pill buttons; recruitment CTAs are plain underlined text — different "clickable" language for parallel actions |
| 5 | Error Prevention | n/a | No form inputs in scope yet |
| 6 | Recognition Rather Than Recall | 3 | Anchor nav disappears with header past the fold |
| 7 | Flexibility and Efficiency | n/a | No repeat-task workflow on a single-scroll marketing page |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained single-accent palette, no clutter |
| 9 | Error Recovery | n/a | No error-producing interactions yet |
| 10 | Help and Documentation | n/a | Not applicable to this surface type |
| **Total** | | **19/24** | **Good (79%)** |

## Design Specificity Verdict

**Pass, with a credibility-undermining data bug.** The headline "La costa tiene dueño, no inquilino." is category-specific — it wouldn't work for cars, resorts, or fashion. The navy/red/cream palette comes from the real brand manual, not a generic scheme. The hero photo placeholder is honest and explicit rather than disguised stock art. But the StatsStrip's own numbers didn't add up (708+168 ≠ 866) — on the one section built specifically to prove "catálogo real, nada inventado," that's the fastest way to lose the trust of the numerate investor persona this page targets.

**Deterministic scan**: `detect.mjs` ran clean, 0 findings, both times it was run (mine and Assessment B's, independently). No false positives to report — the mechanical checks (comments, banned patterns, obvious a11y gaps) genuinely pass.

**Additional finding past both assessments**: I re-verified the stats bug against the source CSV directly — Assessment B computed contrast correctly for the elements it was asked to check, but neither assessment audited the low-opacity uppercase labels used across the page (stat labels, footer eyebrows, copyright). I computed those separately below (**Priority Issues**, new P1) — several fail WCAG AA.

## Overall Impression

Strong bones — the direction is genuinely built for this client, not a template. Two things keep it from shipping: a data-integrity bug that contradicts the page's own "real catálogo" pitch, and a navigation pattern that fails mobile users (the actual majority audience) the moment they scroll past the hero.

## What's Working

1. **Direction-contract fidelity** — headline, CTA hierarchy, stats-as-secondary-section, and the honest hero placeholder all trace directly back to the client's Fase 0 brief, not a generic template wearing brand colors.
2. **Contrast on the elements that were checked is solid** — 7.48:1 on the primary CTA, 4.79:1 on red headline text against navy, all comfortably clearing WCAG AA. The team already caught and fixed the white-on-bright-red button issue before this critique ran (documented inline in `Hero.tsx`).
3. **`prefers-reduced-motion` handled globally and correctly** — not bolted on later, built into `globals.css` from the start.

## Priority Issues

**[P0] StatsStrip figures don't sum to the headline total**
- **Why it matters**: The page's positioning claim is "real catálogo, nunca inventado." 708 + 168 = 876, not 866 — a numerate visitor doing the arithmetic (exactly the "inversores de nivel medio-alto" persona) catches this in seconds and it undermines the entire credibility pitch. Root cause found: the venta/alquiler split was pulled from *all* CSV rows (including 12 "Reservada" listings), not filtered to "Activa" only.
- **Fix**: Verified correct figures against the source CSV, filtered to Status = Activa: **697 venta / 169 alquiler = 866**. Ready to apply.
- **Suggested command**: direct fix (data correction, not a design judgment call).

**[P1] Low-opacity uppercase labels fail contrast in several places**
- **Why it matters**: `text-navy/40` (TeamSection listing-count labels) computes to **~2.6:1** on cream — well under the 4.5:1 floor for small text. `text-cream/35` (footer copyright line) computes to **~3.0:1** on navy — also under 4.5:1. Neither assessment's contrast pass covered these (Assessment B checked the elements I named; Assessment A flagged them as "worth checking" without computing). Real WCAG AA failures for a Sam/Riley-type user.
- **Fix**: Raise opacity floors — `/40` → at least `/70` on cream backgrounds, `/35` → at least `/65` on navy, re-verify each computed ratio ≥4.5:1.
- **Suggested command**: `$impeccable harden` (accessibility pass), or a direct fix now.

**[P1] Header disappears past the fold; no mobile nav fallback**
- **Why it matters**: `SiteHeader` is `position: absolute`, so it scrolls away with the hero and never returns. `NAV_LINKS` is `hidden md:flex` with no hamburger menu — mobile visitors (the majority for this audience) lose the WhatsApp CTA and all in-page navigation the moment they scroll past the first viewport. Both heuristic 3 (user control) and heuristic 6 (recognition) fail here, and it costs the stated conversion goal directly.
- **Fix**: Make the header `sticky top-0` with a background swap once scrolled (transparent-over-hero → solid navy/cream), and add a minimal mobile nav (or at minimum keep the WhatsApp pill reachable at every breakpoint once sticky).
- **Suggested command**: live-iterate on `SiteHeader.tsx`, or a direct fix now.

**[P2] Recruitment CTAs use a different visual language than buyer CTAs**
- **Why it matters**: PRODUCT.md asks recruitment CTAs to be visually *subordinate*, not visually *unrelated* — pill buttons in the hero vs. plain underlined text in TeamSection/Footer reads as "a different kind of thing" rather than "the same kind of action, quieter." Mild consistency (heuristic 4) hit.
- **Fix**: Give secondary CTAs a shared quieter button style (same corner language, smaller/lower-contrast) instead of switching to underlined text entirely.
- **Suggested command**: `$impeccable polish`, scoped to CTA components.

**[P3] Craft-floor check: footer "Contacto" / "Asesores" labels read as eyebrows**
- **Why it matters**: The impeccable craft floor explicitly bans a kicker/eyebrow above a heading ("no brief earns it back" — the heading/content should carry its own weight). The footer's small caps "Contacto" and "Asesores" labels sitting above the phone number and recruitment line are that pattern in miniature.
- **Fix**: Fold the label into the content itself (e.g. lead with the phone number styled distinctly, drop the standalone caption) or restructure as a single line rather than label+value.
- **Suggested command**: fold into the P1 header/footer pass.

## Persona Red Flags

**Jordan (skeptical, trust-scanning buyer/investor)**: The stats math error is precisely what this persona catches first — an investor evaluating "is this a serious real-data brokerage" does the addition and immediately questions the whole "catálogo real" claim.

**Casey (mobile-first, low-patience scroller)**: Loses all navigation and the WhatsApp CTA the moment they scroll past the hero, with no hamburger fallback — for the persona least likely to scroll back up, this risks losing the conversion outright.

**Sam (accessibility-dependent)**: `prefers-reduced-motion` and keyboard focus (default browser outline, functional but unstyled) both work. But the low-opacity label failures above are a real, measured problem for this persona, not a hypothetical one.

## Minor Observations

- Focus rings work (verified via real Tab key presses) but rely entirely on the browser's default outline — no branded `focus-visible:` treatment exists anywhere in the five files.
- `WHATSAPP_HREF` / `RECRUIT_WHATSAPP_HREF` are redeclared independently in four files — not a design issue, but a future phone-number change means four edits instead of one.
- Add `scroll-margin-top` to the `#catalogo` / `#equipo` / `#contacto` anchor targets once the header goes sticky, so smooth-scroll doesn't tuck section headings under it.
