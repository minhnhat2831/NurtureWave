//Change date into hh:mm  dd/mm/yyyy
export const formatDateTime = (date: Date | string | null | undefined) => {
  if (!date) return "N/A"
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}