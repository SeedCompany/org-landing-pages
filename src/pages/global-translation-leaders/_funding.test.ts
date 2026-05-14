import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { calcGtlFunding } from './_funding';

describe('calcGtlFunding', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Use local noon to avoid date-only UTC strings shifting to prior day in non-UTC timezones
    vi.setSystemTime(new Date('2026-01-15T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('splits remaining evenly across months', () => {
    // 6 months from Jan 2026 to Jun 2026, $3000 remaining → $500/mo needed
    const { monthlyNeed, monthlyRaised } = calcGtlFunding(3000, '2026-06-30');
    expect(monthlyNeed).toBe(500);
    expect(monthlyRaised).toBe(500);
  });

  it('caps monthly need at $1000', () => {
    // $6000 remaining over 1 month would be $6000, but capped at $1000
    const { monthlyNeed, monthlyRaised } = calcGtlFunding(6000, '2026-01-31');
    expect(monthlyNeed).toBe(1000);
    expect(monthlyRaised).toBe(0);
  });

  it('returns zero monthly need when fully sponsored', () => {
    const { monthlyNeed, monthlyRaised } = calcGtlFunding(0, '2026-06-30');
    expect(monthlyNeed).toBe(0);
    expect(monthlyRaised).toBe(1000);
  });

  it('uses at least 1 month when end date is in the past', () => {
    // End date already passed — should not divide by zero or go negative
    const { monthlyNeed } = calcGtlFunding(500, '2025-06-30');
    expect(monthlyNeed).toBe(500); // min(round(500/1), 1000)
  });

  it('treats end date on the 1st as end of prior month', () => {
    // "2026-06-01" rolls back to 2026-05-31 → 5 months remaining instead of 6
    const withFirstOfMonth = calcGtlFunding(3000, '2026-06-01');
    const withPriorMonthEnd = calcGtlFunding(3000, '2026-05-31');
    expect(withFirstOfMonth).toEqual(withPriorMonthEnd);
  });

  it('monthlyNeed and monthlyRaised always sum to 1000', () => {
    const cases = [
      { remaining: 0, endDate: '2026-06-30' },
      { remaining: 1200, endDate: '2026-03-31' },
      { remaining: 12000, endDate: '2026-06-30' },
    ];
    for (const { remaining, endDate } of cases) {
      const { monthlyNeed, monthlyRaised } = calcGtlFunding(remaining, endDate);
      expect(monthlyNeed + monthlyRaised).toBe(1000);
    }
  });
});
