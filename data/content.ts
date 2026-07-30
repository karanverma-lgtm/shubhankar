export interface InviteContent {
  eyebrow: string;
  subEyebrow: string;
  names: {
    first: string;
    connector: string;
    second: string;
  };
  date: {
    day: string;
    date: string;
    month: string;
    year: string;
  };
  location: string;
  footerLine1: string;
  footerLine2: string;

  screen2: {
    title: string;
    subtitle: string;
    quote: string;
  };
  screen3: {
    title: string;
    subtitle: string;
    milestones: Array<{
      title: string;
      caption: string;
    }>;
  };
  screen4: {
    title: string;
    subtitle: string;
    targetDateIso: string;
  };
  screen5: {
    title: string;
    venue: string;
    city: string;
    rsvpNote: string;
  };
}

export const content: InviteContent = {
  eyebrow: "Save the Date",
  subEyebrow: "To celebrate the wedding of",
  names: {
    first: "Shubhankar",
    connector: "and",
    second: "Shourya",
  },
  date: {
    day: "Saturday",
    date: "21",
    month: "November",
    year: "2026",
  },
  location: "Gurgaon",
  footerLine1: "Invitation to follow",
  footerLine2: "with all details of celebrations",

  screen2: {
    title: "SHE SAID YES",
    subtitle: "A Promise of Forever",
    quote: "Every love story is beautiful, but ours is our favorite.",
  },
  screen3: {
    title: "Our Story",
    subtitle: "From First Glances to Forever",
    milestones: [
      {
        title: "We Met",
        caption: "A chance encounter that changed everything",
      },
      {
        title: "Fell in Love",
        caption: "Countless memories, laughter & late talks",
      },
      {
        title: "Said Forever",
        caption: "The start of our endless journey together",
      },
    ],
  },
  screen4: {
    title: "Counting Down to Forever",
    subtitle: "Until We Say I Do",
    targetDateIso: "2026-11-21T00:00:00+05:30",
  },
  screen5: {
    title: "Where & When",
    venue: "The Grand Pavilion",
    city: "Gurgaon, Haryana",
    rsvpNote: "TODO: Detailed event schedule & RSVP form",
  },
};
