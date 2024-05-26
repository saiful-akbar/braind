/**
 * Merubah format timestamp UTC menjadi zona waktu lokal.
 *
 * @param {string} timestamp
 * @returns {string}
 */
export function utcToLocale(utc) {
  if (utc === null) return utc;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const date = new Date(utc);
  const year = date.getFullYear();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let month = date.getMonth() + 1;

  if (date.getMonth() < 9) {
    month = `0${date.getMonth() + 1}`;
  }

  return `${year}-${month}-${day} ${hours}:${minutes}`;
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

/**
 * Fungsi untuk format waktu.
 *
 * @param {*} timeValue
 * @returns string
 */
export function timeFormat(timeValue) {
  let hours = timeValue.toDate().getHours();
  let minutes = timeValue.toDate().getMinutes();
  let seconds = timeValue.toDate().getSeconds();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Fungsi untuk format tanggal.
 *
 * @param {*} dateValue
 * @returns string
 */
export default function dateFormat(dateValue) {
  let date = dateValue.toDate().getDate();
  let month = dateValue.toDate().getMonth() + 1;
  let year = dateValue.toDate().getFullYear();

  if (date < 10) {
    date = `0${date}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  return `${year}-${month}-${date}`;
}
