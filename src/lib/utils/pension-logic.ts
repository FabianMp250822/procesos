/**
 * Ported legacy math logic for Dajusticia Pension System
 */

export interface DateInterval {
  years: number;
  months: number;
  days: number;
}

/**
 * Parses "DD/MM/YYYY" or "DD-MM-YYYY" strings into Date objects
 */
export function parseLegacyDate(dateStr: string | null): Date | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const parts = dateStr.split(/[\/\-]/);
  if (parts.length !== 3) return null;
  // Assume DD-MM-YYYY
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const year = parseInt(parts[2]);
  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Calculates interval between two dates (years, months, days)
 * Ported logic from ConsultaArchivoCarpetas.php (Lines 122-185 and 324-389)
 */
export function calculateInterval(start: Date | string, end: Date | string = new Date()): DateInterval {
  const startDate = typeof start === "string" ? parseLegacyDate(start) : start;
  const endDate = typeof end === "string" ? parseLegacyDate(end) : end;

  if (!startDate || !endDate) return { years: 0, months: 0, days: 0 };

  const d1 = startDate.getDate();
  const m1 = startDate.getMonth() + 1;
  const y1 = startDate.getFullYear();

  const d2 = endDate.getDate();
  const m2 = endDate.getMonth() + 1;
  const y2 = endDate.getFullYear();

  let years = y2 - y1;
  let months = m2 - m1;
  let days = d2 - d1;

  if (days < 0) {
    months--;
    // Get days in previous month
    const prevMonth = new Date(y2, m2 - 1, 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/**
 * Formats an interval as a string (e.g. "AÑOS: 55 MESES: 3 DIAS: 12")
 */
export function formatInterval(interval: DateInterval): string {
  return `AÑOS: ${interval.years}    MESES: ${interval.months}    DIAS: ${interval.days}`;
}
