const { writeFileSync } = require("fs");
const { parse, converter, formatHex } = require("culori");
//Load your siteConfig
const { colors } = require("../configs/colorConfig.json");

//Create a converter to turn any color into OKLCH space
const toLch = converter("lch");

/**
 * adjustLightness
 * ─────────────────────
 * Given a hex string and an amount, adjust its lightness in OKLCH.
 *
 * @param {string} hex     – base color, e.g. "#f97316"
 * @param {number} amount  – positive → lighter, negative → darker
 * @returns {string}       – new hex string
 */
function adjustLightness(hex, amount) {
  // Parse into an OKLCH object; bail out if it fails
  const c = toLch(hex);
  if (!c) return hex;

  // Clamp lightness value between 0–100, then apply the shift
  c.l = Math.max(0, Math.min(100, c.l + amount));

  return formatHex(c);
}

/**
 * generateColorVars
 * ─────────────────────
 * Emit three CSS custom‐properties for a given color token:
 *  • 200 → lighter variant
 *  • 300 → original
 *  • 400 → darker variant
 *
 * @param {string} name  – token name, e.g. "primary"
 * @param {string} hex   – base hex color
 * @returns {string}     – three lines of CSS variables
 */
function generateColorVars(name, hex) {
  return [
    `--color-${name}-200: ${adjustLightness(hex, +15)};`,
    `--color-${name}-300: ${hex};`,
    `--color-${name}-400: ${adjustLightness(hex, -10)};`,
  ].join("\n");
}

// 5. Build the full `@theme { ... }` block by mapping over each color entry
const output = `@theme {\n${Object.entries(colors)
  // For each [tokenName, hexValue], generate that token’s vars
  .map(([name, hex]) => generateColorVars(name, hex))
  .join("\n")}\n}`;

// 6. Write (or overwrite) the generated CSS file in your app folder
writeFileSync("app/[locale]/generated-colors.css", output);

// 7. Log success so you know it ran
console.log("app/generated-colors.css updated successfully.");
