import { writeFileSync } from "fs";
// @ts-ignore
import { parse, converter, formatHex } from "culori";
// Import your site-wide config which contains the base HEX colors
import siteInfo from "../siteConfig";

// Create a converter function to turn any color into LCH color-space
const toLch = converter("lch");

/**
 * adjustLightness
 * ───────────────
 * Takes a HEX color and adjusts its lightness by `amount` in LCH space.
 *
 * @param hex    – original color string (e.g. "#f97316")
 * @param amount – positive to lighten, negative to darken
 * @returns      – new HEX string
 */
function adjustLightness(hex: string, amount: number): string {
  // Parse into LCH; if parse fails, just return original
  const c = toLch(hex);
  if (!c) return hex;

  // Clamp lightness (c.l) between 0 and 100
  c.l = Math.max(0, Math.min(100, c.l + amount));

  // Convert back to HEX
  return formatHex(c);
}

/**
 * generateColorVars
 * ─────────────────
 * For a given color name and base HEX, produce three CSS custom-properties:
 *   --color-{name}-200  (lighter)
 *   --color-{name}-300  (original)
 *   --color-{name}-400  (darker)
 *
 * @param name – the token name (e.g. "primary")
 * @param hex  – the base color string
 */
function generateColorVars(name: string, hex: string): string {
  return [
    `--color-${name}-200: ${adjustLightness(hex, +15)};`,
    `--color-${name}-300: ${hex};`,
    `--color-${name}-400: ${adjustLightness(hex, -10)};`,
  ].join("\n");
}

// Build the complete @theme block:
//  - Loop through each entry in siteInfo.colors
//  - Generate its three variable lines
//  - Join everything into one @theme {...} CSS section
const output = `@theme {\n${Object.entries(siteInfo.colors)
  .map(([name, hex]) => generateColorVars(name, hex as string))
  .join("\n")}\n}`;

// Write the generated CSS to disk, overwriting each time
writeFileSync("app/generated-colors.css", output);

console.log("app/generated-colors.css updated.");
