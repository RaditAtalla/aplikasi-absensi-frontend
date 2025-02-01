export default function getDayFromISO(iso) {
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  return days[iso.getDay()];
}
