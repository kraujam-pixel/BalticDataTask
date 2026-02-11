export function getBackground(condition) {
  if (!condition) return "default";

  const main = condition.toLowerCase();

  if (main.includes("cloud")) return "cloudy";
  if (main.includes("rain")) return "rainy";
  if (main.includes("clear")) return "clear";
  if (main.includes("snow")) return "snow";

  return "default";
}

