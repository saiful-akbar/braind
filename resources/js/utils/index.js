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
