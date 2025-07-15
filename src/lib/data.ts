type NavItem = {
  label: string;
  dropdown: boolean;
  items?: { label: string; href: string }[];
  href?: string;
};

export const navItems: NavItem[] = [
  {
    label: "Explore",
    dropdown: true,
    items: [
      { label: "Destinations", href: "/explore/destinations" },
      { label: "Treks", href: "/explore/treks" },
      { label: "Homestays", href: "/explore/homestays" },
      { label: "Culture", href: "/explore/culture" },
      { label: "Adventure", href: "/explore/adventure" },
    ],
  },
  {
    label: "plantrip",
    dropdown: true,
    items: [
      { label: "AI Trip Planner", href: "/plantrip/tripplanner" },
      { label: "Itinerary Builder", href: "/plantrip/itinerarybuilder" },
    ],
  },
  {
    label: "Book",
    dropdown: true,
    items: [
      { label: "Stays", href: "/book/stays" },
      { label: "Guides", href: "/book/guides" },
      { label: "Tours", href: "/book/tours" },
      { label: "Activities", href: "/book/activities" },
    ],
  },
  {
    label: "events",
    dropdown: true,
    items: [
      { label: "Festival Calendar", href: "/events/festival" },
      { label: "Book Events", href: "/events/bookevents" },
    ],
  },
  {
    label: "Stories / Forum",
    dropdown: true,
    items: [
      { label: "Travel Stories", href: "/forum/stories" },
      { label: "Reviews", href: "/forum/reviews" },
      { label: "Safety Tips", href: "/forum/safety-tips" },
    ],
  },
  {
    label: "Travel Toolkit",
    dropdown: false,
    href: "/toolkit",
  },
];