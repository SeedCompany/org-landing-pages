interface Impact {
  people: number;
  projects: number;
}
export const watermarkProjectCalculator = (amount: number): Impact => {
  const projectMarkers = [
    { total: 100000, peopleHelpedTotal: 332200, projectsUnlockedTotal: 4 },
    { total: 250000, peopleHelpedTotal: 1134500, projectsUnlockedTotal: 7 },
    { total: 500000, peopleHelpedTotal: 2435000, projectsUnlockedTotal: 11 },
    { total: 800000, peopleHelpedTotal: 2493158, projectsUnlockedTotal: 15 },
    { total: 1000000, peopleHelpedTotal: 3691458, projectsUnlockedTotal: 16 },
    { total: 1500000, peopleHelpedTotal: 7043858, projectsUnlockedTotal: 18 },
    { total: 2000000, peopleHelpedTotal: 12471597, projectsUnlockedTotal: 22 },
  ];
  const currentProjectIndex = projectMarkers.findIndex((marker) => amount < marker.total);
  if (currentProjectIndex === 0) {
    return {
      people: 0,
      projects: 0,
    };
  } else if (currentProjectIndex === -1) {
    const lastProjectIndex = projectMarkers.length - 1;
    return {
      people: projectMarkers[lastProjectIndex]?.peopleHelpedTotal || 0,
      projects: projectMarkers[lastProjectIndex]?.projectsUnlockedTotal || 0,
    };
  } else {
    return {
      people: projectMarkers[currentProjectIndex - 1]?.peopleHelpedTotal || 0,
      projects: projectMarkers[currentProjectIndex - 1]?.projectsUnlockedTotal || 0,
    };
  }
};
