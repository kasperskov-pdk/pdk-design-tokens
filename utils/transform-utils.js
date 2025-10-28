/**
 * Shared utility functions for token transformations
 */

/**
 * Converts font weight strings to numeric values
 * @param {string} val - Font weight string
 * @returns {number|string} - Numeric font weight value
 */
exports.cleanFontWeight = (val) => {
  if (val === "Light") {
    return 100;
  } else if (val === "Regular") {
    return 200;
  } else if (val === "Medium") {
    return 400;
  } else {
    return "bold";
  }
}

/**
 * Converts pixel or percentage values to rem (for text-related properties)
 * @param {number|string} val - Value to convert
 * @returns {string} - Rem value
 */
exports.cleanRemSize = (val) => {
  // Handle percentage values (for text properties like font-size)
  if (typeof val === 'string' && val.includes('%')) {
    const numericValue = parseFloat(val.replace('%', ''));
    return (numericValue / 100) + 'rem';
  }
  
  // Check if value already has a unit (rem, px, em, etc.) - return as-is
  if (typeof val === 'string' && /\d+(rem|px|em|vh|vw|%)/.test(val) && !val.includes('*')) {
    return val;
  }
  
  // Handle math expressions like "8px * 1.5" or "8px * -2"
  if (typeof val === 'string' && val.includes('*')) {
    const match = val.match(/([0-9.]+)\s*px\s*\*\s*(-?[0-9.]+)/);
    if (match) {
      const pixels = parseFloat(match[1]);
      const multiplier = parseFloat(match[2]);
      return (pixels * multiplier) / 16 + "rem";
    }
  }
  
  // Handle numeric values (pixels)
  if (typeof val === 'number') {
    return val / 16 + "rem";
  }
  
  // Handle string numbers
  if (typeof val === 'string' && !isNaN(parseFloat(val))) {
    return parseFloat(val) / 16 + "rem";
  }
  
  // Return as-is if already in rem or other unit
  return val;
}

/**
 * Converts pixel values to rem (does NOT handle percentages - for spacing, borders, etc.)
 * @param {number|string} val - Value to convert
 * @returns {string} - Rem value
 */
exports.cleanRemSizeNoPercent = (val) => {
  // Return percentages as-is (don't convert them)
  if (typeof val === 'string' && val.includes('%')) {
    return val;
  }
  
  // Check if value already has a unit (rem, px, em, etc.) - return as-is
  if (typeof val === 'string' && /\d+(rem|px|em|vh|vw|%)/.test(val) && !val.includes('*')) {
    return val;
  }
  
  // Handle math expressions like "8px * 1.5" or "8px * -2"
  if (typeof val === 'string' && val.includes('*')) {
    const match = val.match(/([0-9.]+)\s*px\s*\*\s*(-?[0-9.]+)/);
    if (match) {
      const pixels = parseFloat(match[1]);
      const multiplier = parseFloat(match[2]);
      return (pixels * multiplier) / 16 + "rem";
    }
  }
  
  // Handle numeric values (pixels)
  if (typeof val === 'number') {
    return val / 16 + "rem";
  }
  
  // Handle string numbers
  if (typeof val === 'string' && !isNaN(parseFloat(val))) {
    return parseFloat(val) / 16 + "rem";
  }
  
  // Return as-is if already in rem or other unit
  return val;
}

/**
 * Calculates line height in rem
 * @param {string|number} lh - Line height value
 * @param {number|string} fz - Font size value
 * @returns {string} - Line height in rem
 */
exports.cleanLineHeight = (lh, fz) => {
  // If already has rem unit, return as-is
  if (typeof lh === 'string' && lh.includes('rem')) {
    return lh;
  }
  
  // Handle percentage line-height - calculate as percentage of fontSize in rem
  if (typeof lh === 'string' && lh.includes('%')) {
    // fontSize should already be in rem from cleanRemSize
    const fontSizeInRem = parseFloat(fz);
    const lineHeightPercent = parseFloat(lh);
    return `${fontSizeInRem * (lineHeightPercent / 100)}rem`;
  }
  
  // Handle numeric line-height (unitless multiplier)
  if (typeof lh === 'number') {
    return (lh * Number(fz)) / 16 + "rem";
  }
  
  // Handle string numbers
  if (typeof lh === 'string' && !isNaN(parseFloat(lh))) {
    return (parseFloat(lh) * Number(fz)) / 16 + "rem";
  }
  
  // Return as-is for other formats
  return lh;
}

/**
 * Maps font family names to CSS variables
 * @param {string} val - Font family name
 * @returns {string} - CSS variable reference
 */
exports.cleanFontFamily = (val) => {
  let output;
  if (val == "DINOT") {
    output = 'var(--ff-primary)';
  } else {
    output = 'var(--ff-secondary)';
  }
  return output;
}

/**
 * Converts letter-spacing values to rem
 * @param {number|string} val - Letter spacing value
 * @returns {string} - Rem value
 */
exports.cleanLetterSpacing = (val) => {
  // Handle percentage values
  if (typeof val === 'string' && val.includes('%')) {
    const numericValue = parseFloat(val.replace('%', ''));
    return (numericValue / 100) + 'rem';
  }
  
  // Handle numeric values (pixels)
  if (typeof val === 'number') {
    return val / 16 + "rem";
  }
  
  // Handle string numbers
  if (typeof val === 'string' && !isNaN(parseFloat(val))) {
    return parseFloat(val) / 16 + "rem";
  }
  
  // Return as-is if already in rem or other unit
  return val;
}