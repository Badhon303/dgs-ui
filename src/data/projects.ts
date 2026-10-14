export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  alt: string;
  description: string;
  featured: boolean;
};
type Review = [string, string, string];
const views: Review[] = [
  [
    "Vertical urban façade",
    "Exteriors",
    "A tall pale building with blue glazing and stacked balconies under a blue sky",
  ],
  [
    "A patterned edge",
    "Windows & doors",
    "Black-framed corner glazing beside a patterned privacy screen",
  ],
  [
    "Rhythm in the elevation",
    "Exteriors",
    "Pale building façade with repeated windows and a vertical red accent",
  ],
  [
    "Glass against stone",
    "Glass details",
    "Clear glass shower enclosure in a warm stone-lined bathroom",
  ],
  [
    "The framed threshold",
    "Windows & doors",
    "Black grid-framed glass partition and doors in a bright unfurnished room",
  ],
  [
    "A softer boundary",
    "Glass details",
    "Wide frosted glass panels with dark frames in a lit interior",
  ],
  [
    "An open balcony view",
    "Windows & doors",
    "Large glazed doors opening onto a balcony with a metal railing",
  ],
  [
    "Windows in the greenery",
    "Exteriors",
    "White exterior façade with small windows and climbing greenery",
  ],
  [
    "Stacked light",
    "Exteriors",
    "View upward at a pale building with broad horizontal windows and balconies",
  ],
  [
    "A sliding connection",
    "Windows & doors",
    "Black-framed sliding glass doors connecting a tiled room to another space",
  ],
  [
    "An opening in progress",
    "Windows & doors",
    "Dark-framed glass door standing open in an unfinished wall",
  ],
  [
    "The internal doorway",
    "Windows & doors",
    "Glass-panel interior door beside white cabinetry",
  ],
  [
    "A pair of pale frames",
    "Windows & doors",
    "Two white-framed window panels with horizontal external bars",
  ],
  [
    "Lines above the courtyard",
    "Exteriors",
    "Upward view of white-framed glazing and balconies around a courtyard",
  ],
  [
    "White-framed panorama",
    "Windows & doors",
    "White multi-panel window with a smaller central opening panel",
  ],
  [
    "Transparent workspace",
    "Glass details",
    "Glass interior partition around a bright working space",
  ],
  [
    "Across the counter",
    "Windows & doors",
    "White-framed folding glass panels beside an interior counter",
  ],
  [
    "A narrow connection",
    "Windows & doors",
    "Pair of white-framed glass doors in a narrow interior opening",
  ],
  [
    "Daylight in the room",
    "Windows & doors",
    "Bright unfurnished room with large black-framed windows and glass doors",
  ],
  [
    "The shower corner",
    "Glass details",
    "Clear glass shower enclosure against dark bathroom tile",
  ],
  [
    "Quiet privacy",
    "Glass details",
    "Frosted glass shower door with a long vertical handle",
  ],
  [
    "A tall white frame",
    "Windows & doors",
    "White-framed glass door pair with vertical handles",
  ],
  [
    "Views across the table",
    "Windows & doors",
    "Dining area enclosed by white-framed glazed openings",
  ],
  [
    "Transparency in the bathroom",
    "Glass details",
    "Glass shower enclosure and tiled bathroom interior",
  ],
  [
    "An illuminated frontage",
    "Exteriors",
    "Glazed café frontage photographed in evening light",
  ],
  [
    "A meeting at the table",
    "Glass details",
    "People seated at a table in a glazed interior",
  ],
  [
    "The glass-lined stair",
    "Glass details",
    "Curved staircase with transparent glass balustrade",
  ],
  [
    "A window reference",
    "Windows & doors",
    "Promotional layout containing white-framed window photography",
  ],
  [
    "The corner in glass",
    "Glass details",
    "Black-framed clear glass enclosure inside a bright tiled room",
  ],
  [
    "Mirror and light",
    "Glass details",
    "Promotional layout showing a bathroom mirror and glazing",
  ],
  [
    "An elevation reference",
    "Exteriors",
    "Promotional layout containing exterior building photography",
  ],
  [
    "Balustrade reference",
    "Glass details",
    "Promotional layout containing a glass railing and exterior stairs",
  ],
  [
    "An open landing",
    "Glass details",
    "Interior stair landing with a transparent glass railing and dark handrail",
  ],
  [
    "A room with a wider view",
    "Windows & doors",
    "Black-framed floor-to-ceiling glazed room with tiled flooring and overhead glass",
  ],
  [
    "The balcony geometry",
    "Exteriors",
    "Upward view of a building with projecting balconies and pale cladding",
  ],
  [
    "Pale urban elevation",
    "Exteriors",
    "Tall urban building with white and gray façade panels",
  ],
  [
    "A red vertical accent",
    "Exteriors",
    "Tall building with red vertical façade panels and repeated glazing",
  ],
  [
    "Repetition in gray",
    "Exteriors",
    "Gray building elevation with stacked windows and a side staircase",
  ],
  [
    "Between tree and frame",
    "Exteriors",
    "Residential façade viewed from below beside a tree",
  ],
  [
    "Warm timber tones",
    "Windows & doors",
    "Brown-framed glazed door and matching side panel",
  ],
  [
    "A luminous glass room",
    "Windows & doors",
    "Dark-framed glazed enclosure with many small ceiling lights",
  ],
  [
    "Two walls of daylight",
    "Windows & doors",
    "Bright room with windows on adjacent walls and green curtains",
  ],
  [
    "A transparent stair edge",
    "Glass details",
    "Interior stair with glass balustrade and a dark handrail",
  ],
  [
    "A geometric house front",
    "Exteriors",
    "Angular pale house exterior with glass openings and a boundary wall",
  ],
  [
    "Glass and pale tile",
    "Glass details",
    "Glass shower enclosure against pale bathroom tiles",
  ],
  [
    "The compact bathroom",
    "Glass details",
    "Tiled bathroom with a glass shower screen beside a basin",
  ],
  [
    "Circle above the entrance",
    "Exteriors",
    "Angular building entrance with a circular opening in the roof plane",
  ],
  [
    "The meeting room boundary",
    "Glass details",
    "Glass partitions surrounding a furnished meeting room",
  ],
  [
    "The sunlit floor",
    "Windows & doors",
    "Unfurnished room with large windows casting warm light across the floor",
  ],
  [
    "Dark frames in elevation",
    "Exteriors",
    "Urban building with large dark-framed windows",
  ],
  [
    "A glass crown",
    "Exteriors",
    "Exterior building with a glazed rooftop structure",
  ],
  [
    "A space in daily use",
    "Windows & doors",
    "Living area with white curtains and dark-framed windows",
  ],
  [
    "The sliding door detail",
    "Windows & doors",
    "Person beside a broad dark-framed sliding glass opening",
  ],
  [
    "An urban glass structure",
    "Exteriors",
    "Multi-storey building with a partly completed glazed structure",
  ],
  [
    "Balconies and glazing",
    "Exteriors",
    "Tall pale apartment building with repeated balconies and windows",
  ],
  [
    "Framed by trees",
    "Exteriors",
    "Building façade viewed through trees with glazing and red panels",
  ],
  [
    "A clear wet-room edge",
    "Glass details",
    "Tiled bathroom with a transparent glass shower enclosure",
  ],
  [
    "The building in daylight",
    "Exteriors",
    "Pale building façade under blue sky with broad glazing",
  ],
  [
    "The panoramic room",
    "Windows & doors",
    "Sunlit room with warm wood-toned flooring and floor-to-ceiling black-framed windows",
  ],
  [
    "Light after dusk",
    "Exteriors",
    "Illuminated glazed exterior at night among palm trees",
  ],
  [
    "Reflections at night",
    "Exteriors",
    "Night view of a lit glazed building reflected in water",
  ],
  [
    "Looking over the landing",
    "Glass details",
    "Upper-floor landing with transparent glass balustrades",
  ],
  [
    "Glazing around the courtyard",
    "Exteriors",
    "Upward view of white-framed windows around an internal courtyard",
  ],
  [
    "The layered façade",
    "Exteriors",
    "Front elevation with stacked windows, balconies and trees",
  ],
  [
    "A vertical strip of glass",
    "Exteriors",
    "Close upward view of a building with tall blue-glazed panels",
  ],
  [
    "Screen and transparency",
    "Windows & doors",
    "Black-framed corner windows beside a decorative pale privacy screen",
  ],
  [
    "A bright glass enclosure",
    "Glass details",
    "Black-framed glass enclosure in a pale tiled interior",
  ],
  [
    "A framed wet room",
    "Glass details",
    "Bathroom with clear glass panels and warm floor tones",
  ],
  [
    "The opening on site",
    "Windows & doors",
    "Partly finished interior with black-framed windows and construction materials",
  ],
  [
    "Daylight during installation",
    "Windows & doors",
    "Window opening in an unfinished interior with materials on the floor",
  ],
  [
    "Timber-toned corner frames",
    "Windows & doors",
    "Room under construction with brown-framed windows on two walls",
  ],
];
const excluded = [25, 26, 28, 30, 31, 32];
const featured = [2, 29, 34, 49, 5, 10];
const descriptions: Record<string, string> = {
  "Windows & doors":
    "The relationship between an opening and the room around it is visible in this supplied photograph. Frame proportions, panel divisions and the view beyond offer a starting point for exploring a similar direction in your own space.",
  "Glass details":
    "This supplied photograph focuses on how glass defines a space while retaining a visual connection. The edges, frame arrangement and meeting of surrounding materials are useful details to consider when discussing your project.",
  Exteriors:
    "This supplied exterior photograph places glazing within the wider architecture. Repeated openings, façade lines and the balance between solid surfaces and glass show how a window arrangement contributes to the building as a whole.",
};
const all = views
  .map(([title, category, alt], i): Project => ({
    slug: `${title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")}`,
    title,
    subtitle: "Supplied installation photograph",
    category,
    image: `projects-${String(i + 1).padStart(2, "0")}`,
    alt,
    description: descriptions[category],
    featured: featured.includes(i + 1),
  }))
  .filter((_, i) => !excluded.includes(i + 1));
export const projects = [
  ...featured.map((i) =>
    all.find((p) => p.image === `projects-${String(i).padStart(2, "0")}`)!,
  ),
  ...all.filter((p) => !p.featured),
];
export const categories = [
  "All work",
  "Windows & doors",
  "Glass details",
  "Exteriors",
];
