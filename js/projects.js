// The nine cards (D005, D013). Every fact here has a VERIFIED row (V006, V007, V009, V010, V017);
// unknown facts are left out, never shown as placeholders (hard rule 3).
// `colour` is the card border; `band` is the name band when the border fails 4.5:1 under white text.

const MAIL = 'mailto:prachsovithyea11@gmail.com';
// kind: 'phone' screens (828×1792) sit in a device frame; 'desktop' screens (1600×1000) in a plain browser frame (DESIGN-SYSTEM rule 5)
const shot = (dir, file, label, alt, kind = 'phone') => ({ src: `assets/shots/${dir}/${file}.webp`, label, alt, kind });
const yummers = (...a) => shot('yummers', ...a), rocket = (...a) => shot('rocket', ...a);

export const projects = [
  {
    name: 'Yummers', status: 'BETA', colour: '#B8401E',
    line: 'A social food diary for Cambodia: rate places, keep lists, see what friends love.',
    facts: [['Year', '2026'], ['Role', 'Founder & lead developer'], ['Built with', 'React Native, Supabase'], ['Status', 'iPhone beta'], ['Commits', '852']],
    links: [['Visit yummersapp.com', 'https://yummersapp.com']],
    cover: 4,
    shots: [
      yummers('app-signin', 'Sign in', 'Yummers sign-in screen: "Rate it. List it. Share it." with Apple, Google and email buttons'),
      yummers('app-city', 'Pick your city', 'Choosing a city: Phnom Penh selected, with Siem Reap, Sihanoukville, Battambang, Kampot and Kep'),
      yummers('app-tastes', 'Your tastes', 'Picking cuisines: Khmer, Noodles, BBQ and Japanese selected'),
      yummers('app-search-results', 'Search', 'Search results for noodles, grouped by city and area'),
      yummers('app-list-map', 'A list on the map', 'A list of places shown as pins on a map of Phnom Penh'),
      yummers('app-areas', 'Your areas', 'Choosing up to three areas of Phnom Penh, BKK and Chamkar Mon selected'),
    ],
  },
  {
    name: 'Athena', status: 'PRIVATE', colour: '#2E3D1B',
    line: 'An AI study buddy for Cambodian Grade 12 students preparing for the BacII exam.',
    facts: [['Year', '2026'], ['Role', 'Sole developer'], ['Built with', 'Python, FastAPI'], ['Status', 'Private'], ['Commits', '143']],
    links: [['Ask me for access', MAIL]],
  },
  {
    name: 'Rocket', status: 'INTERNSHIP', colour: '#004AAD',
    line: 'At Rocket Academy: Athena, a chat companion for students building with LEGO® Education SPIKE™.',
    facts: [['Dates', 'Jul – Oct 2026'], ['Role', 'Software Engineering & AI Innovation Intern'], ['Built with', 'TypeScript, Cloudflare Workers'], ['My commits', '525']],
    cover: 2, coverPos: 'left center',
    // Captured from Rocket's local demo with its stub model and LEGO lesson fixtures: no student data (V018, D022)
    shots: [
      rocket('start-dark', 'Start', 'Athena by Rocket Academy: a SPIKE project panel beside a chat that asks "What are we building?"', 'desktop'),
      rocket('start-light', 'Start, light', 'The same start screen in light mode', 'desktop'),
      rocket('program', 'Reading a program', 'Athena reading a SPIKE block program step by step, the numbered steps beside the coloured blocks', 'desktop'),
      rocket('program-chat', 'Asking about it', 'A student asks "What does my program do?" and Athena points to the block it starts with', 'desktop'),
      rocket('phone-start', 'On a phone', 'Athena\'s start screen on a phone'),
      rocket('phone-program', 'The program, on a phone', 'Athena\'s step-by-step reading of a program on a phone'),
      rocket('phone-chat', 'A question, on a phone', 'A question about the program and Athena\'s reply on a phone'),
    ],
  },
  {
    name: 'SongRaccoon', status: 'PERSONAL', colour: '#B5673A', band: '#9A5230',
    line: 'AI-powered music discovery. Describe a feeling, get a playlist.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'Next.js, Supabase'], ['Commits', '34']],
    links: [['Open SongRaccoon', 'https://songraccoon.vercel.app'], ['Code', 'https://github.com/sovithyea/songraccoon']],
  },
  {
    name: 'FoodRaccoon', status: 'RETIRED', colour: '#8C5443',
    line: 'The first version of Yummers.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'Next.js, Supabase'], ['Commits', '105']],
    links: [['Code', 'https://github.com/sovithyea/foodraccoon']],
  },
  {
    name: 'Lavender', status: 'PERSONAL', colour: '#5E4B8B',
    line: 'A drone simulator for practising the CASA RePL practical test, with your iPhone as the remote.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'TypeScript, Vite'], ['Commits', '5']],
    links: [['Code', 'https://github.com/sovithyea/lavender']],
  },
  {
    name: 'Karina', status: 'PERSONAL', colour: '#1F6B67',
    line: 'A private meeting recorder: record or upload, then get a summary, decisions and action items.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'Python, FastAPI'], ['Commits', '2']],
  },
  {
    name: 'Hermes', status: 'PERSONAL', colour: '#7A2E45',
    line: 'Turns a book into a full-cast audiobook with free, local AI.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'Python, FastAPI'], ['Commits', '15']],
    links: [['Code', 'https://github.com/sovithyea/hermes']],
  },
  {
    name: 'Small tools', status: 'TOOLS', colour: '#3B3F47',
    line: 'Two small things I built and use.',
    facts: [],
    minis: [
      { name: 'Prompt Polish', tag: 'BROWSER EXTENSION', line: 'Rewrites rough prompts on AI chat sites, and polishes draft messages before you send.', link: 'https://github.com/sovithyea/prompt-engineer-ai-agent' },
      { name: 'Gmail Sorter', tag: 'PYTHON SCRIPT', line: 'Sorts incoming Gmail into a fixed set of labels: action required, FYI, newsletter and more.', link: 'https://github.com/sovithyea/gmail_sorter' },
    ],
  },
];
