/**
 * Merubah format timestamp UTC menjadi zona waktu lokal.
 *
 * @param {string} timestamp
 * @returns {string}
 */
export function utcToLocale(utc) {
  if (utc === null) return utc;
  return new Date(utc).toLocaleString("id-ID");
}

/**
 * Merubah format angka.
 *
 * @param {integer} number
 * @param {integer} minimumDigits
 * @returns {integer}
 */
export function numberFormat(number, minimumDigits = 0) {
  return number.toLocaleString("id-ID", {
    minimumFractionDigits: minimumDigits,
  });
}
