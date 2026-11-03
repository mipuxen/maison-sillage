# Image prompts for the 10 silhouettes

Use these with any image generator (Midjourney, Flux, DALL·E, Ideogram...).
Keep **the same base prompt** for all ten so the collection looks like one shoot.

## Base prompt (prepend to every shoe)

```
studio product photograph of a single sneaker, perfect side profile, toe pointing right,
camera at sole height, soft key light from the upper left, gentle contact shadow,
plain seamless light grey background, ultra sharp, high detail materials,
no logos, no text, no brand marks, centered, full shoe visible, 2:1 aspect ratio
```

(Midjourney: add `--ar 2:1 --style raw`.)

## One line per shoe (append to the base prompt)

| File | Prompt detail |
|---|---|
| `ambre-01.webp` | chunky runner, peach orange moulded leather upper with sculpted wave lines, translucent amber air-bubble sole |
| `foret-02.webp` | high-top basketball shoe, forest green pebbled leather with cream panels, wide ankle strap with a buckle, off-white rubber cupsole |
| `azur-03.webp` | chunky sneaker, cobalt blue padded leather cells over white mesh, clear light blue cushioning pods in the sole |
| `lilas-04.webp` | high-top trail sneaker, dusty lilac suede overlays in layered soft tones, sculpted foam midsole |
| `mousse-05.webp` | low trail shoe, moss green ripstop and suede, bright orange quick-pull lace, aggressive black lug outsole |
| `bordeaux-06.webp` | retro running shoe, burgundy nylon with sand suede overlays, speckled cream EVA sole |
| `ardoise-07.webp` | high-top sneaker, slate grey brushed canvas, thick padded collar, cobalt blue midsole stripe, gum rubber sole |
| `argent-08.webp` | sleek slip-on sneaker, smooth silver-white leather, metallic silver heel, champagne-tinted clear air sole |
| `terre-09.webp` | minimal leather court sneaker, white full-grain leather, terracotta suede heel, stitched off-white cupsole |
| `corail-10.webp` | knit sock sneaker, coral and sky blue two-tone knit upper, sculpted lime green fluted foam sole |

## After generating

1. **Remove the background**: transparent PNG (remove.bg, Photoshop, or Figma's remove background).
2. **Crop** to a 2:1 canvas, e.g. **2400 x 1200 px**, the sole touching the bottom edge, about 5% side margin.
3. **Export as WebP** (quality 80–85) with the exact file name above. Aim for under 300 KB each
   (squoosh.app does this in the browser).
4. Put the files in `public/shoes/`. No code change is needed.
