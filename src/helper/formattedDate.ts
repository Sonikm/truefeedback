export function formattedDate(date: Date) {
  date = new Date(date);

  // Formatting to a readable format
  const dd = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  return dd;
}
