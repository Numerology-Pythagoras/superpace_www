import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function monthRange(year: number, m: number) {
  const from = new Date(year, m, 1).toISOString().slice(0, 10);
  const to = new Date(year, m + 1, 0).toISOString().slice(0, 10);
  return { from, to };
}

export function getMonth(date: string) {
  return new Date(date).getMonth(); // 0 → 11
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} phút`;
  }

  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);

  return `${h}h${m.toString().padStart(2, '0')} phút`;
}