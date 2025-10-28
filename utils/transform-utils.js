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
  // If already has rem, px, or other unit, return as-is
  if (typeof val === 'string' && (val.includes('rem') || val.includes('px') || val.includes('em'))) {
    return val;
  }
  
  // Handle percentage values (for text properties like font-size)
  if (typeof val === 'string' && val.includes('%')) {
    const numericValue = parseFloat(val.replace('%', ''));
    return (numericValue / 100) + 'rem';
  }
  
  // Handle numeric values (pixels)
  if (typeof val === 'number') {
    return val / 16 + "rem";
  }
  
  // Handle string numbers (no unit)
  if (typeof val === 'string' && !isNaN(parseFloat(val)) && !val.includes('*')) {
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
  
  // If already has rem or em, return as-is
  if (typeof val === 'string' && (val.includes('rem') || val.includes('em'))) {
    return val;
  }
  
  // Handle math expressions like "8px * 2" or "8px * -2"
  if (typeof val === 'string' && val.includes('*')) {
    const match = val.match(/([0-9.]+)\s*px\s*\*\s*(-?[0-9.]+)/);
    if (match) {
      const base = parseFloat(match[1]);
      const multiplier = parseFloat(match[2]);
      return (base * multiplier) / 16 + "rem";
    }
  }
  
  // Handle values with px unit
  if (typeof val === 'string' && val.includes('px')) {
    return parseFloat(val.replace('px', '')) / 16 + "rem";
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
  // If lineHeight already has a unit other than %, return as-is
  if (typeof lh === 'string' && (lh.includes('rem') || lh.includes('px') || lh.includes('em')) && !lh.includes('%')) {
    return lh;
  }
  
  // Extract numeric value from fontSize if it has units
  let fontSizeNumeric = fz;
  if (typeof fz === 'string') {
    if (fz.includes('rem')) {
      fontSizeNumeric = parseFloat(fz.replace('rem', ''));
      // fontSize is already in rem, so we don't need to divide by 16
    } else if (fz.includes('px')) {
      fontSizeNumeric = parseFloat(fz.replace('px', '')) / 16;
    } else {
      fontSizeNumeric = parseFloat(fz) / 16;
    }
  } else if (typeof fz === 'number') {
    fontSizeNumeric = fz / 16;
  }
  
  // Handle percentage line-height - convert to rem
  if (typeof lh === 'string' && lh.includes('%')) {
    const percentage = parseFloat(lh.replace('%', ''));
    return (fontSizeNumeric * (percentage / 100)) + 'rem';
  }
  
  // Handle numeric line-height (unitless multiplier)
  if (typeof lh === 'number') {
    return (lh * fontSizeNumeric) + "rem";
  }
  
  // Handle string numbers
  if (typeof lh === 'string' && !isNaN(parseFloat(lh))) {
    return (parseFloat(lh) * fontSizeNumeric) + "rem";
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
  // If already has rem, px, or other unit, return as-is
  if (typeof val === 'string' && (val.includes('rem') || val.includes('px') || val.includes('em'))) {
    return val;
  }
  
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