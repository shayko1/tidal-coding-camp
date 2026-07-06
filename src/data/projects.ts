// Camper projects. Mirrors the Wix CMS "CamperProjects" collection schema:
// { title, camperFirstName, cohort, year, datasetUsed, summary, techStack, coverImage }
// projects.astro renders from the CMS when available and falls back to this list.
export interface CamperProject {
  title: string;
  who: string;      // "Noah, 15"
  cohort: string;   // "Spring Tide"
  year: number;
  dataset: string;
  summary: string;
  stack: string[];
}

export const PROJECTS: CamperProject[] = [
  { title: 'Plastic Drift Map', who: 'Noah, 15', cohort: 'Spring Tide', year: 2025, dataset: 'beach-litter survey + wind data', summary: 'Overlays daily wind direction onto recorded litter pickups to guess where the next wave of plastic will beach. Tuned the wind-weighting during a six-hour high tide until it actually predicted Tuesday’s mess.', stack: ['Python', 'pandas', 'Folium'] },
  { title: 'Limpet Clock', who: 'Amira, 16', cohort: 'Neap Tide', year: 2025, dataset: 'tide-gauge timestamps + camera trap', summary: 'Counted limpet movement per tide cycle from time-lapse frames, then trained a tiny classifier to flag a moving shell. The causeway flooded mid-debug — the only reason the loop finally got fixed.', stack: ['Python', 'OpenCV', 'scikit-learn'] },
  { title: 'Harbor Noise Index', who: 'Jules, 14', cohort: 'Spring Tide', year: 2025, dataset: 'hydrophone clips + ferry schedule', summary: 'Scored underwater noise against the ferry timetable and found the quietest hour for porpoise listening. Presented as a chart the harbormaster now actually uses.', stack: ['Python', 'librosa', 'matplotlib'] },
  { title: 'Causeway Countdown', who: 'Léa, 15', cohort: 'Neap Tide', year: 2025, dataset: 'SHOM tide tables + camp crossing log', summary: 'A terminal widget that says exactly how many safe minutes remain on the causeway, with an amber bar that drains as the water rises. Now runs on the mess-hall screen.', stack: ['Python', 'Rich', 'SHOM API'] },
  { title: 'Seagrass Census', who: 'Tomas, 17', cohort: 'Spring Tide', year: 2024, dataset: 'drone orthophotos of the lagoon', summary: 'Segmented seagrass beds from drone imagery across three summers and measured the meadow actually growing. The first project to get cited in a real survey report.', stack: ['Python', 'rasterio', 'NumPy'] },
  { title: 'Storm Surge Diary', who: 'Chiara, 16', cohort: 'Neap Tide', year: 2024, dataset: 'pressure logger + tide-gauge residuals', summary: 'Separated weather surge from astronomical tide in the island gauge record and found the causeway floods eleven minutes early on a falling barometer.', stack: ['Python', 'pandas', 'SciPy'] },
  { title: 'Crab Traffic', who: 'Yann, 13', cohort: 'Spring Tide', year: 2024, dataset: 'time-lapse of the slipway at night', summary: 'Counted green crabs crossing the slipway per tide phase with a motion-diff script. Concluded crabs also prefer the low-tide window, which felt validating.', stack: ['Python', 'OpenCV'] },
  { title: 'Salinity Strings', who: 'Maëlle, 15', cohort: 'Neap Tide', year: 2024, dataset: 'handheld probe readings, 3× daily', summary: 'Sonified two weeks of salinity readings into a melody where the estuary’s freshwater pulse is audible as a falling phrase. Demo day had headphones.', stack: ['Python', 'music21'] },
  { title: 'Wrack Line Reader', who: 'Ossian, 16', cohort: 'Spring Tide', year: 2023, dataset: 'phone photos of the strandline + tide heights', summary: 'Mapped where each tide left its seaweed line and reconstructed the month’s tide heights from photos alone — a tide gauge made of wrack.', stack: ['Python', 'Pillow', 'pandas'] },
  { title: 'Puffin Ledger', who: 'Nina, 14', cohort: 'Neap Tide', year: 2023, dataset: 'bird-hide sighting log, hand-collected', summary: 'Digitized four summers of paper sighting logs and charted puffin arrivals against sea temperature. Built the data-entry form her nan now uses.', stack: ['Python', 'SQLite', 'Plotly'] },
  { title: 'Ghost Net Sonar', who: 'Ewen, 17', cohort: 'Spring Tide', year: 2023, dataset: 'side-scan sonar transects', summary: 'Flagged snagged fishing-gear candidates in sonar imagery of the channel, ranked by confidence. Two of his top five were real nets, since recovered.', stack: ['Python', 'NumPy', 'scikit-image'] },
  { title: 'Tide Pool Weather', who: 'Sacha, 14', cohort: 'Neap Tide', year: 2023, dataset: 'temperature loggers in three pools', summary: 'Showed each tide pool has its own microclimate that resets with every flood — plotted as small multiples pinned above the lab bench like postcards.', stack: ['Python', 'matplotlib'] },
];
