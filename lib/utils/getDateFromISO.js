export default function getDateFromISO(iso) {
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

  const date = `${iso.getDate()} ${month[iso.getMonth()]} ${iso.getFullYear()}`;
  return date;
}
