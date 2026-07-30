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
};
