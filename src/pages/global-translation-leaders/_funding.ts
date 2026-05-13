export function calcGtlFunding(
  remaining: number,
  endDate: string,
): { monthlyNeed: number; monthlyRaised: number } {
  const end = new Date(endDate);
  if (end.getDate() === 1) end.setDate(0);
  const now = new Date();
  const monthsRemaining = Math.max(
    1,
    (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth()) + 1,
  );
  const monthlyNeed = Math.min(Math.round(remaining / monthsRemaining), 1000);
  return {
    monthlyNeed,
    monthlyRaised: 1000 - monthlyNeed,
  };
}
