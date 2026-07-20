# UX Audit · drd.com.np · July 2026

Audit of the portfolio with a focus on landing UI/UX and product design roles in Germany. Items marked FIXED were implemented directly in this pass.

## 1. Critical issues

**Old template pages were live and indexable.** blog.html still carried the title "Gerold Personal Portfolio HTML5 Template", and caseStudies.html, digitalDesigns.html, FoodAI.html, InfoNav.html and Litter Leap.html were outdated versions with wrong titles. A recruiter or Google could land on any of them. FIXED: all six now carry noindex, nofollow. Recommended next step: delete them from the repo entirely, since the revised pages (index, all-work, the three case studies) are the real site.

**Two different contact emails.** The hero used dayaraj.dhungana07514@gmail.com while the contact section used dhunganadayaraj@gmail.com. FIXED: unified to dhunganadayaraj@gmail.com everywhere.

**Broken image on the FoodAI case study.** foodai-all-screens.png was referenced but did not exist. FIXED: generated the composite from the five individual screen shots (145 KB).

## 2. Germany focus

The site said Saarbrücken but never said Germany, and gave a recruiter no signal about language or openness to relocate within the country. FIXED:

Titles and meta descriptions now say "Product Designer & UI/UX Designer · Saarbrücken, Germany" and include German search terms (Produktdesigner, UX Designer Deutschland, UX Designer Saarbrücken). The hero eyebrow now reads "Product Designer · UI/UX · Saarbrücken, Germany" and the fourth hero stat reads "Open to roles in Germany". The About stats gained two rows: Languages (English · Nepali · German A2, learning) and Location (Saarbrücken, Germany). Structured data now includes knowsLanguage and the UI/UX job title, and og:locale:alternate de_DE was added.

**Full EN/DE language toggle.** New file assets/js/i18n.js, loaded on index, all-work and all three case studies. It injects an EN/DE pill next to the theme toggle. The homepage, the all-work page and all three case studies are now fully translated, roughly 470 strings in total. Each case study carries its complete German text in its own file (assets/js/i18n-de-providhy.js, i18n-de-foodai.js, i18n-de-epl.js), covering every section from context and research through design decisions, outcomes, quotes and reflection. Only proper nouns, metrics and tool names stay as they are. The choice persists in localStorage and the html lang attribute updates for accessibility and SEO. English stays the single source of truth in the HTML; German lives only in the i18n files, so edits stay in one place. Recommendation: have a native speaker read the German once. It is written in professional Sie form, but a native check is always worth it before recruiters see it.

## 3. Content and writing

**Em dashes removed everywhere** per your request. Section labels like "01 — Context" now use "01 · Context", decision headings use colons, quote attributions use "·", and prose sentences were reworded. Zero em dashes remain on the live pages.

**Copy refined for role keywords.** Case study titles now include "UX Case Study" and "Product Designer Germany" so they rank for the searches hiring managers actually make. The homepage description now names the target roles explicitly.

## 4. Performance

Large images were the main cost. FIXED: logo.png was 3853×3853 at 88 KB for a 40 px slot, now 320 px at 10 KB. epl-ramailo-preview.png went from 1.36 MB to 419 KB and providhy-erp-preview.png from 920 KB to 494 KB via palette quantization with no visible loss. All content images now use loading="lazy" and decoding="async".

Still recommended: the case study pages carry many 100 to 350 KB PNGs; converting them to WebP with PNG fallback would roughly halve total page weight. providhy-erp-demo.mp4 (1.5 MB) should get preload="none" if it does not already.

## 5. SEO housekeeping

FIXED: all-work.html added to sitemap.xml and given a canonical tag. Legacy pages noindexed. Remaining recommendations: after deleting the legacy files, return 404 or redirect them; resubmit the sitemap in Google Search Console; consider a German meta description via a small server side or build step if you ever move off plain GitHub Pages.

## 6. Recommendations not implemented (your call)

The resume links to Google Drive. German recruiters expect a CV instantly and often save it; host the PDF on the site (cv-daya-raj-dhungana-en.pdf) and add a German CV (Lebenslauf) once ready. Consider adding a photo in the About section, still common in German hiring. Consider a short "Working in Germany" line in the contact section stating your work authorization status, since visa status is the first silent question every German recruiter has; only add it if the answer helps you. The old template files should be deleted from the repo. The commented out placeholder projects in all-work.html (Business Intelligence Dashboard etc.) describe work that is not yours; they are invisible but should be removed from the source before anyone reads the code, since the repo is public.

## Files changed

index.html, all-work.html, providhy-case-study.html, foodai-case-study.html, epl-case-study.html, 404.html, sitemap.xml, blog.html, caseStudies.html, digitalDesigns.html, FoodAI.html, InfoNav.html, Litter Leap.html (noindex only), logo.png, epl-ramailo-preview.png, providhy-erp-preview.png, foodai-all-screens.png (new), assets/js/i18n.js (new).
