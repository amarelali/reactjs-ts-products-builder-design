/**
 * @params {string} txt - the input text to be sliced
 * @params {number} {max=50} - the maximun length before truncation
 * @returns The sliced text, with an ellipses (...) apppended if truncated
 */


export function txtSlicer(txt: string, max: number = 50) {
    if (txt.length >= max) return `${txt.slice(0, max)} ...`;
    return txt;
}