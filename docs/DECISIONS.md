# Decision log

The contract. One entry per decision. The **why** matters most, because it's what gets forgotten and argued over again when nobody wrote it down.

**Rules.**
- Append-only. Never rewrite an entry's reasoning.
- When a decision is replaced, the old entry keeps its body and gets a `**Status:**` line naming what replaced it.
- If a task conflicts with a live entry, stop and say so. Don't quietly work around it.
- **Decisions are written here in the session that makes them.**

The first brief (`docs/OLD-BRIEF.md`) made its calls before this log existed. It has none of its own entries here, and none of its calls carry over unless an entry below says so.

---

## D001 — Redo: a showcase of relevant projects, for a general audience

*27 Oct 2026 · Vith*

Vith: "lets redo this shall we, i want illstrations and a showcase of relevent projects". The site becomes a showcase of Vith's relevant projects. It replaces the first brief's design: a hero poster, a curved carousel, a five-palette arc menu and a scroll-reveal footer (`docs/OLD-BRIEF.md`).

The audience is **uni staff, peers and anyone curious** (Vith, answering "who is this for": "Uni / general"). So "relevant" means a broad, honest record of what Vith has built, not a list tuned for one kind of job.

Which projects are in, and in what order, was settled in D005.

## D002 — Pictures are real screenshots and demos of the projects

*27 Oct 2026 · Vith*

Asked where the illustrations come from, Vith answered: "look at yummersapp.com, just pictures or demos of my projects". yummersapp.com (`~/Desktop/projects/Yummers/yummersapp.com/index.html`) shows real app screenshots (`assets/app-*.webp`, 828×1792) in device frames, three to a row, each with a short title and one line of copy (VERIFIED, V004).

So "illustrations" here means **pictures of the real thing**: screenshots, screen recordings and live demos. Drawn, stock and AI-generated images are ruled out (hard rule 4). This replaces the first brief's typographic monogram covers as the main picture. Whether monograms survive as the empty-slot treatment is for the phase spec.

## D003 — One palette, light and dark, following the system setting

*27 Oct 2026 · Vith*

Vith: "no need too many ways to change colors", then chose **"Light + dark, auto"** over a single fixed palette or a light/dark toggle. The site has one palette with a light and a dark version, switched only by `prefers-color-scheme`. There is no switcher, no toggle and no stored preference.

This replaces the first brief's five palettes (Daylight, Nightshift, Arcade, Terminal, Bloom), its arc-fan palette menu, and its `localStorage` boot script. It also means the theme needs no JavaScript at all: CSS alone picks the mode on first paint.

The palette's actual values are proposed in `specs/1-work-table/` (D008).

## D004 — Docs and specs, committed straight to main

*27 Oct 2026 · Vith*

The repo follows the Yummers and Athena layout: `CLAUDE.md` with hard rules, `PRODUCT.md`, `docs/` (PROGRESS, DECISIONS, VERIFIED, RISKS, WORKFLOW, DESIGN-SYSTEM) and `specs/N-name/` with a spec and a plan reviewed before any code (Vith: "implement hard rules regarding design and documents before we code, look at yummers and athena docs").

Vith chose **"Docs + specs only"** over the full Athena process. There are no GitHub issues, project board or PRs, and work is committed straight to `main`. Because the remote is public, nothing is pushed until Vith says so (hard rule 8).

## D005 — What's on the site, and how each project is credited

*27 Oct 2026 · Vith*

**Projects in** (Vith's picks from the candidates in `~/Desktop/projects/`): Yummers, Athena, the Rocket Academy internship, SongRaccoon, FoodRaccoon, Lavender, Karina, Hermes, and one "small tools" entry for Prompt Engineer Agent and Gmail Sorter. That is nine cards.
- **Yummers leads.** It's the biggest project and has a live site.
- **Big projects get their own page:** Yummers, Athena, Rocket and SongRaccoon ("Pages for the big ones"). The rest show only their card and its details.
- **Credit is Vith's role only.** Yummers is "Founder & lead developer". FoodRaccoon keeps its own card rather than merging into Yummers.
- **Rocket screenshots are allowed** (Vith: "Screenshots OK"). Rocket's repos are `rocket-academy-au`'s, so every Rocket picture still gets the hard rule 5 check for student data.
- **The name on the site is Sovithyea Prach.**
- **Claude captures the screenshots** from the running projects and live sites, using demo or Vith's own data. Vith approves each one before it's committed.

## D006 — Plain HTML, CSS and JavaScript; the old code is cleared

*27 Oct 2026 · Vith*

**Status:** amends `docs/OLD-BRIEF.md`'s stack (Vite + TypeScript + GSAP).

Vith chose plain HTML/CSS/JS with no build step, over keeping Vite + TypeScript or moving to a framework. The site is mostly pictures and text plus one physics toy, which needs a few hundred lines of JavaScript and no framework. yummersapp.com and the st287 Ktis Café site are built the same way.

Vith chose to **clear** the old brief's code in `src/` rather than keep parts of it. Since nothing was committed, `docs/OLD-BRIEF.md` is the only record of it. Hosting is decided later ("Decide later").

## D007 — Pages, contact and links

*27 Oct 2026 · Vith*

- **Pages:** Work (home), one page per big project (D005), About, and Journey, each its own page. The CV is a PDF Vith supplies, linked from the nav.
- **Contact:** an email link to `prachsovithyea11@gmail.com`, GitHub (`github.com/sovithyea`) and LinkedIn (URL to come from Vith). The address is public, so it will attract some spam. Vith chose it anyway.
- **Project links:** the live site where one exists, and the GitHub repo **only if it's public**. A private repo gets no repo link.
- **Journey content comes from interviewing Vith** ("ask me"). Nothing is drafted from other sources.

## D008 — The look: a card set, laid out like a store listing

*27 Oct 2026 · Vith, through impeccable `shape` (seed 152f2cee)*

Four first-screen directions were mocked using real Yummers screenshots: A Grad Show Hang, B Store Page, C Card Set, D Claim and Proof. Vith chose **"B and C"**.

The fused direction takes **C's world** and **B's structure**:
- **C's world:** every project is a trading card. The front shows a real screen; the back is a fact sheet in mono-font rows. Names are in slab capitals, and there's a "No." badge.
- **B's structure:** a project's own page reads like a store listing. The card sits where an app icon would, the fact sheet becomes a fact strip, and a shelf of numbered screenshots runs below.
- **Each card's border is the project's own brand colour.** The site's own palette stays neutral (a light table surface and a dark one), so the projects carry the colour, in line with DESIGN-SYSTEM rule 4.

The mocks are in the session scratchpad (`visual/directions.html`, `visual/fusion.html`). They aren't in the repo (CLAUDE.md, hard rule 4).

## D009 — Work is an air-hockey table of cards

*27 Oct 2026 · Vith*

Vith: "the main screen will be the cards, the are hovering and moving around a little, and i can move them wherever i want like a air hockey puck on a airhockey table … when i press on the cards theres an animation and the card goes top left and it shows more info and the card is still hovering … the cards hovering bouce around and doesnt leave the screen".

A working prototype (`visual/puck-table.html`) settled the details. Vith confirmed each one:
- **Cards drift slowly on their own.** The floor speed is about 20 px/s, "as in the prototype".
- **Drag and throw.** A thrown card slides on very low friction. Holding a card still before release drops it without a throw.
- **Cards bounce off the walls and never leave the table.** They also **bump into each other** ("Bump (as now)").
- **Tapping a card springs it to the top-left**, where it keeps hovering. Its details open beside it: facts, numbered screens, links, and Prev/Next through the set.
- **While a card is open, the others fade and keep drifting** behind the details.
- **Phones get the same table with smaller cards** ("Same table, smaller cards").

This amends DESIGN-SYSTEM rule 6. Ambient drift is allowed on the Work table only, because it is the table's resting state and the visitor can grab and change it; it is not decoration played at them. Vith's earlier "too much motion would feel wrong" still binds every other page. With reduced motion set, the cards rest still and stay draggable.

## D010 — Generated images only for demos and visualisations

*27 Oct 2026 · Vith*

Vith: "do not generate images unless if demo or visualisation". A generated or mocked image is allowed only to show a direction or demonstrate an idea, such as the D008 mocks. It never ships on the site and never goes in the repo. This tightens hard rule 4, which already rules out generated images on the site.

## D011 — An open card's details use the store-listing layout

*27 Oct 2026 · Vith*

Vith pointed at the prototype's open-card panel and then at the Yummers page mock: "this section cann be like" the latter. The details beside a hovering card use the D008 store-listing layout:
- a title block (number, name, one line, role) with the link buttons on the right;
- the facts as a horizontal strip between two heavy rules;
- the numbered screen shelf;
- Prev/Next at the bottom.

The hovering card in the top-left plays the store icon's part. The panel and a big project's own page now share one layout.

## D012 — The cards float in a scene the visitor can switch

*27 Oct 2026 · Vith*

**Status:** amends D003 (no switcher) and D009 (the table look). It also narrows hard rule 4 for scene art (below).

Vith: "i didnt want a hocket design, lets think of someting else". Two rounds of live mocks followed. Vith asked for three scenes to be made richer, plus "a buttom to change to each of these surfaces":
- **Space:** "with stars and planet and comets".
- **Pond:** "more realistic waves and fished and lilypads". Built as a top-down koi pond with moving light patterns on the water, koi that flee a splash, lily pads and flowers, and ripples where cards land or hit.
- **Sky:** "a more realistic feel in terms of clouds and whats in the sky". The sky colour follows the visitor's local hour: soft clouds, the sun or moon on an arc, stars at night, birds by day.
- **Light table:** a backlit table glowing in a room. Vith didn't comment on it, so it stays in the switcher until Vith says otherwise.

What this changes:
- **D003's "no switcher" was about colour palettes.** This is a scene switcher. Light/dark still follows the system in Space, Pond and Light table. The sky follows the clock instead.
- **Scene art is drawn in code** (canvas shapes, gradients and noise), with no image files. Hard rule 4 forbids pictures standing in for a project. Scene art is backdrop, never a project picture, so it's allowed. Generated images stay limited to demos (D010).
- **Motion:** the scenes add ambient motion (comets, koi, clouds), which DESIGN-SYSTEM rule 6 now has to allow for the Work page. With reduced motion set, every scene is drawn still.

## D013 — What each card says

*27 Oct 2026 · Vith*

**Each card front shows one status word** ("One word on the card"):

| Card | Status | Facts and links |
|---|---|---|
| Yummers | BETA | Founder & lead developer; links to yummersapp.com |
| Athena | PRIVATE | Sole developer; screenshots only, no link; "Ask me for access" opens an email to Vith (Vith: "they can ask me if they wanna try athena.yummersapp") |
| Rocket | INTERNSHIP | Software Engineering & AI Innovation Intern, July–October 2026 (it ends 31 Oct) |
| SongRaccoon | PERSONAL | links to its live site |
| FoodRaccoon | RETIRED | |
| Lavender | PERSONAL | |
| Karina | PERSONAL | |
| Hermes | PERSONAL | |
| Small tools | TOOLS | opens to two mini cards: Prompt Polish and Gmail Sorter |

- Everything except Yummers and Rocket was solo work ("All solo").
- Prompt Engineer Agent is the browser extension **Prompt Polish** (V009).
- SongRaccoon's live address is `https://songraccoon.vercel.app` (V010). Vith asked for it to be found in the repo; it's used once Vith confirms it.

## D014 — Table behaviour, round two

*27 Oct 2026 · Vith*

- **No flip.** Opening a card is enough ("No, opening is enough").
- **The nav shows only Work** until the other pages exist.
- **Card colours:** each project's brand colour where one exists; for the rest, Claude proposes a set and Vith picks.
- **A tiny squash** when a card hits a wall or another card.
- **TIDY UP**, at the bottom right, puts the cards back in neat rows. [Inference] The rows then hold still until someone touches a card; otherwise the drift undoes the tidy within seconds. This one is Claude's call, so Vith should confirm it.
- **Shake to re-deal on phones.** On iPhone, a one-time "Enable shake" tap triggers iOS's motion prompt ("Yes, ask on first tap").
- **The hint** "Drag and throw a card · tap one to open it" shows until the first touch, then fades.
- **The scatter is fresh each visit.** Nothing about positions is remembered.
- **Card size** stays as in the prototype.

## D015 — Three scenes, picked at random

*27 Oct 2026 · Vith*

**Status:** amends D012 (drops the Light table) and confirms D014's rest-after-tidy.

- The scenes are **Space, Pond and Sky**. The Light table is dropped ("Drop it").
- **Each visit opens on a random scene** ("Random each visit"). The switcher changes it, and the choice isn't remembered.
- **After TIDY UP the rows hold still** until someone touches a card ("Yes, hold still").
- **SongRaccoon links to `https://songraccoon.vercel.app`** ("Yes", V010).

## D016 — Real waves on the pond, and the cursor stirs every scene

*27 Oct 2026 · Vith*

**Status:** amends D012's pond.

- **The pond has real waves, not drawn light lines.** Vith: "remove the fake white waves, the splashed from the cards should be those instead and then the waves interact they should interact and have collisions".
  - The water is a height field running the 2D wave equation.
  - Card splashes, landings and bow waves push it down. Waves spread, pass through each other, and reflect off the pond's edges, the floating cards and the lily pads. Lily pads ride the waves, then drift home.
- **The scenes react more:** koi follow a dragged card and scatter when it's thrown, a thrown card parts the clouds, and a hard hit in space launches a comet.
- **The cursor stirs the background too** (Vith: "the cursor should interact with the bg too"):
  - **Pond:** dragging across the water leaves a wake, a click drops a pebble, and the koi drift toward the cursor.
  - **Space:** the cursor leaves stardust, and a click launches a comet.
  - **Sky:** the cursor pushes clouds aside, and a click makes a puff.
- **Phones get lighter scenes**: fewer stars, fish and clouds, and a coarser wave grid.
- **Sound is off by default**, with a toggle. It's synthesised in the browser, so there are no audio files.
- **While a card is open, the scene keeps going.**

## D017 — Real photos behind the cards, and a calm background

*27 Oct 2026 · Vith*

**Status:** replaces D012's and D016's drawn scenes and amends hard rule 4 for backdrops.

Vith: "the pond is realy overstimulating and the svg look too ai genrated, use actual pics".

- **Each scene is one real photograph** with a licence that allows reuse, chosen by Vith from a contact sheet (V012). The credit for each sits on screen:

  | Scene | Photo | Licence |
  |---|---|---|
  | Pond | "Koi in a Japanese Garden, Aug. 2012", Jiaqian AirplaneFan, Wikimedia Commons | CC BY 3.0 |
  | Sky, day | "White Cumulus Clouds against Blue Sky (2)", Lance Vanlewen, Wikimedia Commons | CC BY-SA 4.0 |
  | Sky, evening (or dark mode) | "Moon and clouds over Kolleröd beach 2", W.carter, Wikimedia Commons | CC0 |
  | Space | "Cosmic Cliffs" in the Carina Nebula, NASA, ESA, CSA, STScI (Webb) | NASA media guidelines |

- **The drawn koi, lily pads, planets, comets, clouds and birds are gone.**
- **Nothing in the background moves on its own.** The only motion is a soft ripple on the pond where a card lands or the visitor touches it, and a slight parallax on space and sky that follows the cursor. That keeps "touch the background too" (D016) without the overstimulation.
- **D016's wave simulation is dropped.** Ripples are now simple rings that pass through each other but no longer reflect off cards or edges. [Inference] This fits "overstimulating" better. If Vith wants the reflections back, they can return in a calmer form.
- **Hard rule 4 now allows licensed photos as scene backdrops only.** Project pictures must still be real screenshots of the project. Every backdrop records its source and licence in VERIFIED, and its credit shows on the page.

## D018 — Real photographed objects, cut out, instead of drawn ones

*27 Oct 2026 · Vith*

**Status:** corrects D017. D017 replaced the scenes with flat backdrop photos, which Vith didn't intend.

Vith: "i didnt thin youd use actual phtos, i mean using real fish and lilypads or real planets and clouds so its not svg". The scenes keep D016's living elements, but every element is a real photograph cut out onto a transparent background:

| Scene | Elements | Sources and licences |
|---|---|---|
| Pond | 4 koi (from a sheet of koi photographed from above), lily pads, a pebble bottom under tinted water | Koi: Paul Botha, CC BY-SA 3.0 · Lily pads: Harry Rose, CC BY 2.0 · Pebbles: W.carter, CC BY-SA 4.0 |
| Space | Saturn, Jupiter, Mars and Neptune over the Hubble Ultra Deep Field; a comet now and then | NASA, ESA, JPL, SSI and STScI (public domain) · Comet NEOWISE: RuggyBearLA, CC BY 2.0 |
| Sky | Day: real cumulus cut from two photos, drifting over a blue gradient with sun glow. Night (after 6 pm or in dark mode): a starfield photo, the real full Moon and moonlit clouds | Clouds: Lance Vanlewen and Dmitry Makeev, CC BY-SA 4.0 · Stars: TBOE PC Ohm, CC0 · Moon: Luc Viatour, CC BY-SA 3.0 |

Motion stays calm, because Vith called the drawn pond "realy overstimulating":
- 4 koi, slow, swaying as they swim (a photo can't bend).
- The waves keep D016's wave equation (they cross and reflect off cards and pads), but they're softer, die out faster, and start only from splashes, card movement and the cursor.
- Planets and clouds shift slightly with the cursor at different depths. A comet crosses rarely, or when a card hits hard or the visitor clicks.

Credits for each scene sit on the page. The cut-outs were made by Claude from the source photos (keyed backgrounds, cropping, defringing), which counts as an adaptation under BY-SA. [Assumption] The sprites then have to carry the same BY-SA licence when published. That needs confirming before launch (R4).

## D019 — Space dust instead of comets, and sounds chosen on a sound board

*27 Oct 2026 · Vith*

**Status:** amends D016's comets and D016's synthesised sound.

- **Space has dust and sparks, not comets.** Vith: "idk if comets are the right one here to use, maybe dust or sparks". A hard card hit, a click, or a fast cursor releases fine bright motes, warm and cool, that drift, twinkle and fade. Nothing crosses the sky on its own. The comet photo is no longer used.
- **Vith picks every sound** ("i wanna chose sounds for the portfolio") on a sound board (`visual/soundboard.html` in the scratchpad prototype). It covers nine moments: a card hitting something, a throw, a landing or click in the pond, dust in space, a click in the sky, opening a card, closing one, TIDY UP, and turning sound on. Each moment has 3–5 options plus "None".
- **Options are real recordings where they exist.** They come from Wikimedia Commons: the Gravity Sound library (CC BY 4.0), a singing bowl by Valera N. Trubin (CC BY 4.0) and tubular bells by gsb1039 (CC0), trimmed to short clips at matching loudness. Moments with no good recording, such as a whoosh or a card shuffle, also have sounds made in the browser, labelled MADE.
- **The prototype plays whatever is picked.** Sound stays off until the visitor turns it on (D016).
- **Photo credits sit on a background chip** so they stay readable over busy photos.

## D020 — The sounds

*27 Oct 2026 · Vith, picked on the sound board (D019)*

**Status:** the card-hit sound is replaced by D021.

| Moment | Sound | Source |
|---|---|---|
| A card hits a wall or another card | Hollow hit | Recording: "Hollow hit 8", Gravity Sound, CC BY 4.0 |
| Throwing a card | Airy whoosh | Made in the browser |
| Pond: a card lands, or a click on the water | Bloop | Made in the browser |
| Space: dust from a hit or a click | Sparkle | Made in the browser |
| Sky: a click on the clouds | Air puff | Made in the browser |
| Opening a card | Two-note chime | Made in the browser |
| Closing a card | Soft click back | Recording: "Selection 17 back", Gravity Sound, CC BY 4.0 |
| TIDY UP | Card shuffle | Made in the browser |
| Turning sound on | Singing bowl | Recording: "The sound of a singing bowl", Valera N. Trubin, CC BY 4.0 |

- **Only three recordings ship:** `hollow-hit`, `ui-back` and `bowl`. All three are CC BY 4.0, so they need credit on the site, but they aren't share-alike (unlike R4's photos). The other clips on the board are dropped at build time.
- **Sound stays off until the visitor turns it on** (D016).

## D021 — Card hits use the soft thud

*27 Oct 2026 · Vith*

Vith re-picked on the sound board: "A card hits a wall or another card: Soft thud", made in the browser, replacing D020's Hollow hit recording. The other eight sounds stay as D020 has them.

Two recordings now ship: `ui-back` (closing a card, Gravity Sound) and `bowl` (turning sound on, Valera N. Trubin), both CC BY 4.0 and credited on the site. Everything else is made in the browser.

## D022 — Share-alike sprites kept, brand colours, Rocket screen now, prototype saved

*27 Oct 2026 · Vith*

**Status:** settles R4 and the Phase 1 spec's Open Questions 1–3.

- **The CC BY-SA sprites stay** ("Keep, license as BY-SA"). The koi, pebble, cloud and Moon image files are published under CC BY-SA, matching their sources, with credits in `assets/CREDITS.md` and on the page. The site's code is unaffected.
- **Brand colours for four cards** ("Athena, SongRaccoon, Rocket Academy", plus Yummers from D008), read from their sources:

  | Card | Colour | Source | White text on it |
  |---|---|---|---|
  | Yummers | `#B8401E` | Yummers' `--primary-strong` (its DESIGN-SYSTEM; to confirm in its CSS at Step 3) | 5.54:1 |
  | Athena | `#2E3D1B` | `athena/app/static` `--primary`, light mode | 11.67:1 |
  | Rocket | `#004AAD` | Rocket Academy brand kit, Royal Blue (primary) | 8.13:1 |
  | SongRaccoon | `#B5673A` | `songraccoon/app/globals.css` `--rust` | **4.23:1, fails 4.5:1** |

  [Inference] For SongRaccoon, Claude proposes keeping the rust for the card's border and using a deeper `#9A5230` (5.80:1) for the band that carries the name. That's the same fix Yummers uses (its `--primary-strong`). Vith confirms it at plan Step 3, alongside the proposed colours for the other five cards.
- **Rocket's screen is captured in Phase 1** ("Capture one now"), from Rocket's Athena running locally. Constraints: demo data only, no student data (hard rule 5), and no paid model calls (hard rule 10). Vith approves the image.
- **Rocket's card says "LEGO® Education SPIKE™"** with the marks, per Rocket Academy's brand rules for public material.
- **The prototype is copied out of the session scratchpad** to `~/Desktop/projects/portfolio-prototype/` ("Yes, private folder"). It's outside the public repo, because it holds unused clips and test hooks. It's the behavioural reference for Phase 1. Serve it with `python3 -m http.server 8765` from that folder and open `/visual/cards.html`.

## D023 — The card colours

*27 Oct 2026 · Vith, at plan Step 3*

| Card | Border | Name band | White text |
|---|---|---|---|
| Yummers | `#B8401E` (brand) | same | 5.54:1 |
| Athena | `#2E3D1B` (brand) | same | 11.67:1 |
| Rocket | `#004AAD` (Rocket Academy Royal Blue) | same | 8.13:1 |
| SongRaccoon | `#B5673A` (brand rust) | `#9A5230` | 5.80:1 |
| FoodRaccoon | `#8C5443` faded brick, a dulled red for a retired v1 that doesn't clash with Yummers | same | 6.06:1 |
| Lavender | `#5E4B8B` | same | 7.36:1 |
| Karina | `#1F6B67` | same | 6.26:1 |
| Hermes | `#7A2E45` | same | 9.11:1 |
| Small tools | `#3B3F47` | same | 10.56:1 |

Vith: "Faded brick", "Keep all four", "Yes, border + deeper band". For the Rocket screen Vith asked: "use as many as u can and i choose". Claude captures every Rocket screen that shows no student data, and Vith picks.

## D024 — Rocket's screens

*27 Oct 2026 · Vith*

Vith chose all seven captures: dark and light start screens, the program read-out, a question about the program (desktop and phone), and the phone start screen. Cover: **"3: program read-out"**, Athena's step-by-step reading beside the SPIKE blocks. The chat replies in two of them come from the demo's stub model, not the live AI (V018). Captions never claim otherwise.

Desktop screens are landscape (1600×1000), so the details panel shows them in a plain browser frame and phone screens in a device frame (DESIGN-SYSTEM rule 5).

## D025 — The Work page doesn't introduce Vith; About does

*27 Oct 2026 · Vith (answer given during the 27 Oct question rounds, logged late)*

Asked "Should the Work page say who you are, beyond your name?", Vith answered **"No, About does that"**. The Work page shows only the name in the top bar. Who Vith is (Computer Science (AI) at Swinburne, and so on) belongs on the About page (Phase 3).

This answer was missed when D013–D015 were written. It surfaced when the impeccable finish reviewer asked for an intro line on the first screen, citing PRODUCT.md's "the first screen has to say who Vith is". The owner's answer stands. PRODUCT.md's line is amended to point at the name in the top bar and at About.
