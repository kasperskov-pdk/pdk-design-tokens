const StyleDictionary = require("style-dictionary");
const fs = require('fs');
const { 
  cleanFontWeight, 
  cleanRemSize, 
  cleanLineHeight, 
  cleanFontFamily,
  cleanLetterSpacing
} = require("./utils/transform-utils");

// Re-register all transforms from main config
StyleDictionary.registerTransform({
  name: 'size/lh',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'line-height';
  },
  transformer: function (prop) {
    if (prop.value.includes('%')) {
      let output = prop.value.replace("%", "");
      output = Number(output);
      return output * 0.01
    } else {
      return prop.value;
    }
  }
});

StyleDictionary.registerTransform({
  name: "typography/map",
  type: "value",
  transitive: true,
  matcher: (token) => token.type === "typography",
  transformer: (token) => {
    let {fontWeight, fontSize, lineHeight, fontFamily, letterSpacing} = token.original.value;
    let output = `(
      fontFamily: ${cleanFontFamily(fontFamily)},
      fontSize: ${cleanRemSize(fontSize)},
      lineHeight: ${cleanLineHeight(lineHeight, fontSize)},
      fontWeight: ${cleanFontWeight(fontWeight)},
      letterSpacing: ${cleanLetterSpacing(letterSpacing)}
    )`;
    return output;
  },
});

StyleDictionary.registerTransform({
  name: 'size/fontFamilies',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'font-family';
  },
  transformer: function (prop) {
    return cleanFontFamily(prop.value);
  }
});

StyleDictionary.registerTransform({
  name: 'size/fontWeight',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'font-weight';
  },
  transformer: function (prop) {
    let output;
    if (prop.value == "Light") {
      output = "100";
    } else if (prop.value == "Regular") {
      output = "200";
    } else if (prop.value == "Medium") {
      output = "400";
    } else {
      output = "bold";
    }
    return output;
  }
});

StyleDictionary.registerTransform({
  name: "shadow/shorthand",
  type: "value",
  transitive: true,
  matcher: (token) => ["boxShadow"].includes(token.type),
  transformer: (token) => {
    let {color, x, y, blur, spread} = token.original.value;
    return x +"px "+ y +"px "+ blur +"px "+ spread +"px "+ color
  }, 
});

StyleDictionary.registerTransform({
  name: 'size/toREM',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'letter-spacing' || 
           prop.attributes.category === 'font-size' || 
           prop.type === 'spacing' || 
           prop.type === 'sizing' || 
           prop.attributes.category === 'border' || 
           prop.attributes.category === 'border-radius';
  },
  transformer: function (prop) {
    return cleanRemSize(prop.value);
  }
});

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: (prop) => {
    return prop.type === 'spacing' || 
           prop.type === 'sizing' || 
           prop.type === 'borderRadius' || 
           prop.type === 'borderWidth' ||
           prop.type === 'fontSizes';
  },
  transformer: (prop) => {
    return cleanRemSize(prop.value);
  }
});

module.exports = {
  source: ["tokens/sejl.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      transforms: ["attribute/cti", "name/cti/kebab", "color/hex", "typography/map", "size/fontWeight", "size/fontFamilies", "size/lh", "size/toREM", "shadow/shorthand"],
      buildPath: './figma/',
      files: [{
        destination: "scss/_sejl-variables.scss",
        format: "scss/variables",
      }],
    }
  }
};
