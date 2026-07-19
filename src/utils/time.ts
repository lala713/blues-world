export interface CalendarDuration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const daysInMonth = (year: number, monthIndex: number) =>
  new Date(year, monthIndex + 1, 0).getDate();

const addYears = (date: Date, years: number) => {
  const next = new Date(date);
  const targetYear = date.getFullYear() + years;
  next.setFullYear(targetYear, date.getMonth(), Math.min(date.getDate(), daysInMonth(targetYear, date.getMonth())));
  return next;
};

const addMonths = (date: Date, months: number) => {
  const year = date.getFullYear();
  const month = date.getMonth() + months;
  const targetYear = year + Math.floor(month / 12);
  const targetMonth = ((month % 12) + 12) % 12;
  const next = new Date(date);
  next.setFullYear(targetYear, targetMonth, Math.min(date.getDate(), daysInMonth(targetYear, targetMonth)));
  return next;
};

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const getCalendarDuration = (startDate: string, endDate = new Date()): CalendarDuration => {
  const normalizedStart = startDate.includes("T") ? startDate : `${startDate}T00:00:00`;
  const start = new Date(normalizedStart);
  if (Number.isNaN(start.getTime()) || start > endDate) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let years = endDate.getFullYear() - start.getFullYear();
  while (addYears(start, years) > endDate) years -= 1;
  let cursor = addYears(start, years);

  let months =
    (endDate.getFullYear() - cursor.getFullYear()) * 12 +
    (endDate.getMonth() - cursor.getMonth());
  while (addMonths(cursor, months) > endDate) months -= 1;
  cursor = addMonths(cursor, months);

  let days = 0;
  while (addDays(cursor, days + 1) <= endDate) days += 1;
  cursor = addDays(cursor, days);

  const remainingMs = Math.max(0, endDate.getTime() - cursor.getTime());
  const hours = Math.floor(remainingMs / 3_600_000);
  const minutes = Math.floor((remainingMs % 3_600_000) / 60_000);
  const seconds = Math.floor((remainingMs % 60_000) / 1000);

  return { years, months, days, hours, minutes, seconds };
};

export const formatClock = (date: Date) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);

export const formatAudioTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = String(whole % 60).padStart(2, "0");
  return `${mins}:${secs}`;
};
