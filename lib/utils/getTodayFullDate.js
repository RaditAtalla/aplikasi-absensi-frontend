export default function getTodayFullDate() {
  const today = new Date();

  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = `${today.getDate()} ${
    month[today.getMonth()]
  } ${today.getFullYear()}`;

  return date;
}
