import { formatRelative, parseJSON } from "date-fns";

export function formatDate(d: string | null) {
  if (d == null) {
    return "-";
  } else {
    const s = formatRelative(parseJSON(d), new Date());
    return s.charAt(0).toLocaleUpperCase() + s.slice(1);
  }
}

export function formatNumber(n: number) {
  return "blub";
}

export function formatPercentage(n: number) {
  return `${Math.round(n * 1000) / 10} %`;
}
