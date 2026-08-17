interface Tier {
  endAmount: number | null;
  peopleGroups: number | null;
  projectsUnlocked: number | null;
}

interface Impact {
  people: number;
  projects: number;
}

/**
 * Each tier's peopleGroups/projectsUnlocked is the amount THAT tier alone
 * adds (not a running total), so the displayed counters are the sum across
 * every tier fully funded by totalRaised — 0 before the first tier is
 * complete, everything once the raised amount clears the final tier.
 */
export const partnerProjectCalculator = (totalRaised: number, tiers: Tier[]): Impact => {
  const completedTiers = tiers.filter(
    (tier) => tier.endAmount != null && totalRaised >= tier.endAmount,
  );

  return completedTiers.reduce<Impact>(
    (totals, tier) => ({
      people: totals.people + (tier.peopleGroups ?? 0),
      projects: totals.projects + (tier.projectsUnlocked ?? 0),
    }),
    { people: 0, projects: 0 },
  );
};
