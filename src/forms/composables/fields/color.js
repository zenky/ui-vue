const shades = {
  darkest: 0.3,
  darker: 0.6,
  dark: 0.9,
};

const tints = {
  light: 0.3,
  lighter: 0.6,
  lightest: 0.9,
};

export default {
  generateColors(base, light, dark) {
    const hex = base.toString().replace('#', '');
    const colors = {};

    if (light) {
      Object.keys(tints).forEach((key) => {
        colors[key] = this.tint(hex, tints[key]);
      });
    }

    if (dark) {
      Object.keys(shades).forEach((key) => {
        colors[key] = this.shade(hex, shades[key]);
      });
    }

    return colors;
  },

  generateTextColor(base) {
    const rgb = this.hexToRgb(base.replace(/#/ig, ''));

    if (rgb === null) {
      return '#000';
    }

    const { r, g, b } = rgb;
    const luma = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

    return (luma < 120) ? '#fff' : 'rgb(55, 65, 81)';
  },

  hexPart(part) {
    return `0${part.toString(16)}`.slice(-2);
  },

  hexToRgb(color) {
    const components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(`#${color}`);

    if (!components) {
      return null;
    }

    return {
      r: parseInt(components[1], 16),
      g: parseInt(components[2], 16),
      b: parseInt(components[3], 16),
    };
  },

  rgbToHex({ r, g, b }) {
    return `#${this.hexPart(r)}${this.hexPart(g)}${this.hexPart(b)}`;
  },

  tint(hex, intensity) {
    const color = this.hexToRgb(hex);
    const r = Math.round(color.r + ((255 - color.r) * intensity));
    const g = Math.round(color.g + ((255 - color.g) * intensity));
    const b = Math.round(color.b + ((255 - color.b) * intensity));

    return this.rgbToHex({ r, g, b });
  },

  shade(hex, intensity) {
    const color = this.hexToRgb(hex);
    const r = Math.round(color.r * intensity);
    const g = Math.round(color.g * intensity);
    const b = Math.round(color.b * intensity);

    return this.rgbToHex({ r, g, b });
  },
};
