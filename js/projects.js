// The nine cards (D005, D013). Every fact here has a VERIFIED row (V006, V007, V009, V010, V017);
// unknown facts are left out, never shown as placeholders (hard rule 3).
// `colour` is the card border; `band` is the name band when the border fails 4.5:1 under white text.
// Game-card extras (D027): `type`, `rarity` (common | rare | ultra, which sets the card's finish) and an optional
// `stat` line, shown only where it says something (time spans from first to last commit, V017; Rocket's from Vith).

const MAIL = 'mailto:prachsovithyea11@gmail.com';
// kind: 'phone' screens (828×1792) sit in a device frame; 'desktop' screens (1600×1000) in a plain browser frame (DESIGN-SYSTEM rule 5)
const shot = (dir, file, label, alt, kind = 'phone') => ({ src: `assets/shots/${dir}/${file}.webp`, label, alt, kind });
const yummers = (...a) => shot('yummers', ...a), rocket = (...a) => shot('rocket', ...a);

export const projects = [
  {
    name: 'Yummers', status: 'BETA', colour: '#B8401E',
    type: 'APP', rarity: 'ultra', stat: '852 commits · 2 months',
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
    type: 'AI', rarity: 'rare', stat: '143 commits',
    line: 'An AI study buddy for Cambodian Grade 12 students preparing for the BacII exam.',
    facts: [['Year', '2026'], ['Role', 'Sole developer'], ['Built with', 'Python, FastAPI'], ['Status', 'Private'], ['Commits', '143']],
    links: [['Ask me for access', MAIL]],
  },
  {
    name: 'Rocket', status: 'INTERNSHIP', colour: '#004AAD',
    type: 'AI', rarity: 'ultra', stat: '525 commits · 4 months',
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
    type: 'AI', rarity: 'rare', stat: '34 commits · 5 weeks',
    line: 'AI-powered music discovery. Describe a feeling, get a playlist.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'Next.js, Supabase'], ['Commits', '34']],
    links: [['Open SongRaccoon', 'https://songraccoon.vercel.app'], ['Code', 'https://github.com/sovithyea/songraccoon']],
  },
  {
    name: 'FoodRaccoon', status: 'RETIRED', colour: '#8C5443',
    type: 'WEB', rarity: 'common', stat: '105 commits · 7 weeks',
    line: 'The first version of Yummers.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'Next.js, Supabase'], ['Commits', '105']],
    links: [['Code', 'https://github.com/sovithyea/foodraccoon']],
  },
  {
    name: 'Lavender', status: 'PERSONAL', colour: '#5E4B8B',
    type: 'SIM', rarity: 'common', stat: 'Browser sim, iPhone remote',
    line: 'A drone simulator for practising the CASA RePL practical test, with your iPhone as the remote.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'TypeScript, Vite'], ['Commits', '5']],
    links: [['Code', 'https://github.com/sovithyea/lavender']],
    cover: 1,
    // Captured from Lavender's local server, flown by a scripted controller so the QR code and LAN address never show (V033, D035)
    shots: [
      shot('lavender', 'chase', 'Flying', 'The drone in flight over a farm paddock from the chase camera, a fading line tracing its path, beside the altitude and speed readout', 'desktop'),
      shot('lavender', 'box', 'A guided exercise', 'The box pattern exercise: the drone climbs toward a yellow hoop, and a card at the bottom reads "Take off and climb to 3 m" with the tip "Climb"', 'desktop'),
      shot('lavender', 'top-down', 'From above', 'The same exercise from the top-down camera, the drone inside its target ring and the next hoops marked on the grass', 'desktop'),
      shot('lavender', 'training', 'Training', 'The training menu: three lessons, then eight RePL exercises from take-off and hover to attitude mode in wind', 'desktop'),
    ],
  },
  {
    name: 'Karina', status: 'PERSONAL', colour: '#1F6B67',
    type: 'AI', rarity: 'common', stat: 'Python, FastAPI',
    line: 'A private meeting recorder: record or upload, then get a summary, decisions and action items.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'Python, FastAPI'], ['Commits', '2']],
    cover: 1,
    // Karina on an empty data folder, notes from a made-up meeting in synthetic voices; labelled demo (V037, D039, D033)
    shots: [
      shot('karina', 'new-meeting', 'Start a meeting', 'Karina\'s home page: a New meeting form to start recording or upload a file, and the demo meeting under Past meetings', 'desktop'),
      shot('karina', 'decisions', 'Notes, from a demo meeting', 'Notes from a made-up meeting about a school science fair stall: five decisions, then action items with owners and due dates', 'desktop'),
      shot('karina', 'unfinished', 'Loose ends, from a demo meeting', 'The same demo meeting\'s open items, an agenda for next time, and Who spoke, with a clip to play for each detected voice', 'desktop'),
    ],
  },
  {
    name: 'Hermes', status: 'PERSONAL', colour: '#7A2E45',
    type: 'AI', rarity: 'common', stat: 'Python, runs locally',
    line: 'Turns a book into a full-cast audiobook with free, local AI.',
    facts: [['Year', '2026'], ['Role', 'Solo'], ['Built with', 'Python, FastAPI'], ['Commits', '15']],
    links: [['Code', 'https://github.com/sovithyea/hermes']],
    cover: 2,
    // Hermes's own web app on a library holding only Pride and Prejudice (public domain), ElevenLabs off (V036, D038)
    shots: [
      shot('hermes', 'library', 'Library', 'Hermes\'s library page, "Your audiobooks": add a book file or scan a printed book, with Pride and Prejudice below', 'desktop'),
      shot('hermes', 'book', 'A book', 'Pride and Prejudice in Hermes: three steps, Read, Check and Voice, above the chapter list, with chapters 1 to 3 ready to voice', 'desktop'),
      shot('hermes', 'chapter', 'Who says what', 'Chapter III of Pride and Prejudice line by line, each quote tagged with its speaker, Mrs. Bennet, Mr. Bingley or Mr. Darcy, and a type and emotion', 'desktop'),
      shot('hermes', 'chapter-more', 'Speakers and moods', 'Further into the chapter: Mr. Darcy\'s lines marked cold and Mr. Bingley\'s marked excited, each with a play button', 'desktop'),
    ],
  },
  {
    name: 'Small tools', status: 'TOOLS', colour: '#3B3F47',
    type: 'TOOLS', rarity: 'common', stat: '2 tools',
    line: 'Two small things I built and use.',
    facts: [],
    minis: [
      { name: 'Prompt Polish', tag: 'BROWSER EXTENSION', line: 'Rewrites rough prompts on AI chat sites, and polishes draft messages before you send.', link: 'https://github.com/sovithyea/prompt-engineer-ai-agent' },
      { name: 'Gmail Sorter', tag: 'PYTHON SCRIPT', line: 'Sorts incoming Gmail into a fixed set of labels: action required, FYI, newsletter and more.', link: 'https://github.com/sovithyea/gmail_sorter' },
    ],
    // Prompt Polish: Vith's own Chrome Web Store screenshots, names already redacted (V034, D036).
    // Gmail Sorter: its real pipeline in dry run over made-up mail, with Gmail stubbed out (V035, D037)
    shots: [
      shot('prompt-polish', 'chatgpt', 'Prompt Polish · ChatGPT', 'Prompt Polish on ChatGPT: an Enhance Prompt button above a rough ask rewritten into Role, Task and Output Format sections', 'desktop'),
      shot('prompt-polish', 'claude', 'Prompt Polish · Claude', 'Prompt Polish on Claude: "Help me build a blog website" rewritten into task, context and desired output', 'desktop'),
      shot('prompt-polish', 'gemini', 'Prompt Polish · Gemini', 'Prompt Polish on Gemini: a request for help building a web app rewritten as a list of what to cover', 'desktop'),
      shot('gmail-sorter', 'dry-run', 'Gmail Sorter · a dry run on demo mail', 'Gmail Sorter\'s terminal output for a dry run over eight made-up emails: a summary of eight categories, then each email\'s category, confidence and actions, with one guardrail override that turned archiving off for a receipt', 'desktop'),
    ],
  },
];
