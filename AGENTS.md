# AGENTS.md

## What this is

Static single-page website for Khan Reno Inc (solo general contractor). No build tools, no bundler, no npm. Just HTML/CSS/JS + images, deployed to GitHub Pages.

## Deployment

No git CLI or terminal auth available. All pushes use the GitHub REST API with a PAT:
- Auth header: `Authorization: token <PAT>`
- Content must be base64-encoded JSON with `message`, `content`, and `sha` (for updates)
- Repo: `lucifer2091/contractor_website`
- Live: https://khanreno.ca

## Critical gotchas

### PNG-as-JPG breaks images
Never save a PNG file with a `.jpg` extension. Browsers can't decode it — renders as a broken triangle/artifact. TikTok screenshots are APNG (animated PNG with multiple frames). Must flatten before uploading:
```powershell
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("input.png")
$bitmap = New-Object System.Drawing.Bitmap($img)
$bitmap.Save("output.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bitmap.Dispose(); $img.Dispose()
```
Verify output is real JPG: first 2 bytes must be `FF D8`.

### UTF-8 encoding
Use `[System.IO.File]::ReadAllBytes()` + `[System.Convert]::ToBase64String()` for GitHub API uploads. `Get-Content -Encoding UTF8` mangles em dashes and special chars.

## File structure

- `index.html` — single page (nav, hero, about, why-choose, services, gallery, reviews, CTA, footer)
- `styles.css` — all styles including responsive breakpoints (1024px, 768px, 480px)
- `script.js` — nav toggle, testimonial slider, scroll reveal, smooth scroll
- `images/` — all photo assets

## Conventions

- Solo contractor — first-person singular ("I", "my"), never plural
- No section labels ("About", "Services") in the HTML
- Color scheme: monochrome (black/white/gray), no accent colors
- Font pairing: Inter (body) + Playfair Display (headings)
- Hero background: CSS `background-image` on `::before` pseudo-element
- Scroll animations: IntersectionObserver + `reveal`/`reveal-left`/`reveal-right`/`reveal-up` classes with stagger delays
