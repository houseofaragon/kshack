import niceColors from "nice-color-palettes/1000";

const COLORS = niceColors[13];

export const BLOB = COLORS[0];
export const CUBES = BLOB;
export const FRONT = COLORS[0];
export const BACK = COLORS[2];
export const LIGHTS = [
  {
    id: 0,
    color: 0xbcbcbc
  },
  {
    id: 1,
    color: 0xeeeeee
  },
  {
    id: 2,
    color: 0x5b5b5b
  }
];

export const IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
export const VERTICES_NUM = 32 * (IS_MOBILE ? 1 : 2);

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
