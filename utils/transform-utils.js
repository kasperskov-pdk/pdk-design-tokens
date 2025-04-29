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
 * Converts pixel values to rem
 * @param {number|string} val - Value to convert
 * @returns {string} - Rem value
 */
exports.cleanRemSize = (val) => {
  if(typeof val == 'number'){
    return val/16 + "rem";
  } else {
    return val;
  }
}

/**
 * Calculates line height in rem
 * @param {string} lh - Line height value
 * @param {number|string} fz - Font size value
 * @returns {string} - Line height in rem
 */
exports.cleanLineHeight = (lh, fz) => {
  let output = lh.replace("%", "");
  output = Number(output) * Number(fz);
  output = (output / 100)/16 + "rem";
  return output;
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