// Journey's milestones, oldest first (D048). Every line is approved by Vith (V043, V044); places were picked by Vith
// on a map or found on OpenStreetMap (V044). `p` = a project's card colour, otherwise the type's colour.
// `r` = the card's finish (D027): rare or ultra. `slot` = a photo of Vith's still to come (hard rule 4).

export const PLACES = {
  pp: { name: 'Phnom Penh', lng: 104.8578, lat: 11.5730, zoom: 11 },
  ggas: { name: 'Golden Gate American School, Phnom Penh', lng: 104.88331, lat: 11.57817, zoom: 14.5 },
  london: { name: 'London', lng: -0.47374, lat: 51.53311, zoom: 12 },
  wsc: { name: 'Phnom Penh', lng: 104.89809, lat: 11.57030, zoom: 14.5 },
  grad: { name: 'Phnom Penh', lng: 104.93326, lat: 11.54607, zoom: 14.5 },
  aupp: { name: 'American University of Phnom Penh', lng: 104.90154, lat: 11.61551, zoom: 14.5 },
  mel: { name: 'Melbourne', lng: 144.96317, lat: -37.81425, zoom: 11 },
  swin: { name: 'Swinburne University, Melbourne', lng: 145.03875, lat: -37.82150, zoom: 14.5 },
  games: { name: 'Melbourne', lng: 145.03610, lat: -37.82142, zoom: 14.5 },
  collab: { name: 'Melbourne', lng: 145.14078, lat: -37.96626, zoom: 14.5 },
  sgm: { name: 'Melbourne', lng: 145.03944, lat: -37.82230, zoom: 14.5 },
  bpct: { name: 'Melbourne', lng: 145.13323, lat: -37.91039, zoom: 14.5 },
  rocket: { name: 'Rocket Academy, Hawthorn', lng: 145.02558, lat: -37.82174, zoom: 14.5 },
  mcec: { name: 'Melbourne Exhibition Centre', lng: 144.95393, lat: -37.82577, zoom: 15 },
  world: { name: 'Cambodia to Australia', bounds: [[100, -40], [150, 15]] },
};

const shot = (dir, file, alt, kind = 'phone') => ({ src: `shots/${dir}/${file}.webp`, alt, kind });

export const journey = [
  { r: 'ultra', when: '2011–2023', year: '2011', type: 'SCHOOL', title: 'Golden Gate American School, Phnom Penh', line: 'Volleyball, basketball and music, and where I started running events.', slot: true, at: 'ggas' },
  { r: 'ultra', when: '2022', year: '2022', type: 'EVENT', title: 'Event Lead, GGAS Food Festival', line: 'My first event as lead.', at: 'ggas' },
  { r: 'rare', when: 'Jul 2022', year: '2022', type: 'COMPETITION', title: 'Teen Eagle Global Finals, London', line: 'Competed in the finals.', slot: true, at: 'london' },
  { r: 'rare', when: 'Aug 2022', year: '2022', type: 'COMPETITION', title: "World Scholar's Cup, Phnom Penh round", line: '5th overall as a team, senior division.', slot: true, at: 'wsc' },
  { r: 'rare', when: 'Mar 2023', year: '2023', type: 'CHAMPION', title: 'In-school basketball tournament', line: 'We won.', slot: true, at: 'ggas' },
  { r: 'rare', when: '2023', year: '2023', type: 'EVENT', title: 'Ran a bake sale', line: '', at: 'ggas' },
  { r: 'rare', when: '2023', year: '2023', type: 'EVENT', title: 'Ran an ice-cream stall', line: '', at: 'ggas' },
  { r: 'ultra', when: 'Jun 2023', year: '2023', type: 'SCHOOL', title: 'High school graduation', line: '', slot: true, at: 'grad' },
  { r: 'rare', when: 'Jan–May 2024', year: '2024', type: 'STUDY', title: 'A semester at the American University of Phnom Penh', line: 'IT/CS; finances for the student press council.', at: 'aupp' },
  { r: 'ultra', when: 'Jul 2024', year: '2024', type: 'MOVE', title: 'Moved to Melbourne', line: "Started Swinburne's Diploma of IT (UniLink).", slot: true, at: 'mel' },
  { r: 'rare', when: 'Mar 2025', year: '2025', type: 'STUDY', title: 'Bachelor of Computer Science (AI), Swinburne', line: 'Joined the Cambodian Student Association as a volunteer.', at: 'swin' },
  { r: 'rare', when: 'Mar 2025', year: '2025', type: 'EVENT', title: 'SCSA Games Night', line: 'My first SCSA event.', slot: true, at: 'games' },
  { r: 'rare', when: 'Apr 2025', year: '2025', type: 'EVENT', title: "Bon Phum Ch'nam Ng", line: 'Collab with 3 other Khmer clubs.', slot: true, at: 'collab' },
  { r: 'ultra', when: 'Nov 2025 – Jun 2026', year: '2025', type: 'LEADER', title: 'SCSA President', line: '17 events, from cultural festivals to formals; membership grown to 200+.', note: 'Began at the SCSA SGM, Nov 2025.', slot: true, at: 'sgm' },
  { r: 'rare', when: 'Apr 2026', year: '2026', type: 'EVENT', title: 'Bon Phum Chnam Thmei', line: 'A huge collaborative event.', slot: true, at: 'bpct' },
  { r: 'rare', when: 'Jun 2026', year: '2026', type: 'APP', title: 'FoodRaccoon, then Yummers', line: 'The first version of Yummers, then Yummers, rebuilt from scratch.', p: 'yummers', pic: shot('yummers', 'app-city', 'Yummers: choosing a city, Phnom Penh selected'), at: 'mel' },
  { r: 'rare', when: 'Jul 2026', year: '2026', type: 'AI', title: 'SongRaccoon', line: 'AI-powered music discovery. Describe a feeling, get a playlist.', p: 'songraccoon', at: 'mel' },
  { r: 'ultra', when: 'Jul 2026', year: '2026', type: 'INTERN', title: 'Rocket Academy', line: 'Software Engineering & AI Innovation Intern: Athena, a chat companion for students building with LEGO® Education SPIKE™.', p: 'rocket', pic: shot('rocket', 'start-dark', 'Athena by Rocket Academy: a SPIKE project panel beside a chat that asks "What are we building?"', 'desktop'), at: 'rocket' },
  { r: 'rare', when: 'Sep–Oct 2026', year: '2026', type: 'TEACH', title: "Educator Lead, Rocket Academy's Minecraft Education holiday camps", line: '', at: 'rocket' },
  { r: 'rare', when: 'Oct 2026', year: '2026', type: 'LEADER', title: 'Yummers gets a team of 7', line: 'Lead Engineer.', p: 'yummers', pic: shot('yummers', 'app-list-map', 'Yummers: a list of places shown as pins on a map of Phnom Penh'), at: 'mel' },
  { r: 'ultra', when: 'Nov 2026', year: '2026', type: 'STUDY', title: 'Finishing the degree', line: 'Computer Science, AI major, Swinburne.', slot: true, at: 'mcec' },
  { r: 'rare', when: 'Next', year: 'Next', type: 'NEXT', title: 'A graduate role in AI engineering, and taking Yummers public.', line: '', at: 'world' },
];

// Keepsakes on the shelf, each tied to a place; photos come from Vith
export const memorabilia = [{ title: 'Football tournament', at: 'ggas' }];
