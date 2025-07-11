type Trek = {
  name: string;
  region: string;
  type: string;
  description: string;
  image: string;
};

export const treks: Trek[] = [
  // Everest Region
  {
    name: "Everest Base Camp Trek",
    region: "Everest Region",
    type: "Classic Trek",
    description: "Iconic trek to the base of the world's highest mountain.",
    image: "/treks/ebc.jpg",
  },
  {
    name: "Luxury Everest Base Camp Trek",
    region: "Everest Region",
    type: "Luxury Trek",
    description: "EBC experience with high-end lodges and comfort.",
    image: "/treks/luxury-ebc.jpg",
  },
  {
    name: "EBC Trek with Helicopter Return",
    region: "Everest Region",
    type: "Heli Trek",
    description: "Trek to EBC and return by helicopter for a scenic ride.",
    image: "/treks/ebc-heli.jpg",
  },
  {
    name: "Everest Panorama Trekking",
    region: "Everest Region",
    type: "Short Trek",
    description: "Easy trek with stunning views of Everest and nearby peaks.",
    image: "/treks/everest-panorama.jpg",
  },
  {
    name: "Gokyo Cho La Pass Trek",
    region: "Everest Region",
    type: "Adventure Trek",
    description: "Visit Gokyo lakes, cross Cho La Pass, and connect to EBC.",
    image: "/treks/gokyo-cho-la.jpg",
  },

  // Annapurna Region
  {
    name: "Annapurna Base Camp Trek",
    region: "Annapurna Region",
    type: "Classic Trek",
    description: "Scenic trek into the heart of the Annapurna Sanctuary.",
    image: "/treks/abc.jpg",
  },
  {
    name: "Annapurna Circuit Trek",
    region: "Annapurna Region",
    type: "Long Trek",
    description: "Full circuit around the Annapurna Massif including Thorong La Pass.",
    image: "/treks/annapurna-circuit.jpg",
  },
  {
    name: "Mardi Himal Trekking",
    region: "Annapurna Region",
    type: "Short Trek",
    description: "Offbeat ridge trail with fantastic views of Machhapuchhre.",
    image: "/treks/mardi.jpg",
  },
  {
    name: "Ghorepani Poon Hill Trekking",
    region: "Annapurna Region",
    type: "Easy Trek",
    description: "Short and popular trek known for sunrise views at Poon Hill.",
    image: "/treks/poonhill.jpg",
  },
  {
    name: "ABC Trek and Helicopter Return",
    region: "Annapurna Region",
    type: "Heli Trek",
    description: "Trek to Annapurna Base Camp and return by helicopter.",
    image: "/treks/abc-heli.jpg",
  },

  // Langtang Region
  {
    name: "Langtang Valley Trek",
    region: "Langtang Region",
    type: "Classic Trek",
    description: "Explore alpine scenery, Tamang culture, and glaciers.",
    image: "/treks/langtang-valley.jpg",
  },
  {
    name: "Langtang Trek",
    region: "Langtang Region",
    type: "Short Trek",
    description: "Shorter version focusing on Langtang village and surroundings.",
    image: "/treks/langtang.jpg",
  },
  {
    name: "Ganesh Himal Trek",
    region: "Langtang Region",
    type: "Remote Trek",
    description: "Less-traveled area offering Himalayan views and cultural experience.",
    image: "/treks/ganesh-himal.jpg",
  },
  {
    name: "Langtang Helambu Trek",
    region: "Langtang Region",
    type: "Cultural Trek",
    description: "Connects Langtang to Helambu through diverse landscapes.",
    image: "/treks/helambu.jpg",
  },
  {
    name: "Ganja La Pass Trekking",
    region: "Langtang Region",
    type: "Adventure Trek",
    description: "High-altitude pass connecting Langtang to Helambu with stunning views.",
    image: "/treks/ganjala.jpg",
  },

  // Off the Beaten Path
  {
    name: "Manaslu Circuit Trek",
    region: "Manaslu Region",
    type: "Remote Trek",
    description: "Challenging circuit trek around Mt. Manaslu via Larke La Pass.",
    image: "/treks/manaslu.jpg",
  },
  {
    name: "Tsum Valley Trek",
    region: "Manaslu Region",
    type: "Cultural Trek",
    description: "Sacred hidden valley with ancient Buddhist culture.",
    image: "/treks/tsum.jpg",
  },
  {
    name: "Upper Mustang Trek",
    region: "Mustang Region",
    type: "Restricted Trek",
    description: "Desert-like landscapes, Tibetan culture, and ancient caves.",
    image: "/treks/mustang.jpg",
  },
  {
    name: "Upper Dolpo Trek",
    region: "Dolpo Region",
    type: "Restricted Trek",
    description: "Remote and rugged trans-Himalayan region of wild beauty.",
    image: "/treks/dolpo.jpg",
  },
  {
    name: "Dhaulagiri Circuit Trek",
    region: "Dhaulagiri Region",
    type: "Expedition Trek",
    description: "Challenging trek around Dhaulagiri with glacier and high passes.",
    image: "/treks/dhaulagiri.jpg",
  },
];
