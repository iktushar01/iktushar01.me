export type ActivityType =
  | "hackathon"
  | "competition"
  | "workshop"
  | "seminar"
  | "volunteer";

export interface ActivityTimelineItem {
  label: string;
  value: string;
}

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  organizer: string;
  date: string;
  location?: string;
  achievement?: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery: string[];

  role?: string;
  techStack?: string[];
  teamMembers?: string[];
  timeline?: ActivityTimelineItem[];
  outcomes?: string[];
  certificateImages?: string[];

  projectLink?: string;
  githubLink?: string;
  demoLink?: string;
  eventWebsite?: string;
  devpostLink?: string;
  slidesLink?: string;

  projectName?: string;
  problemStatement?: string;
  solutionOverview?: string;
  demoVideoLink?: string;
  teamSize?: number;
  awards?: string[];
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  hackathon: "Hackathon",
  competition: "Competition",
  workshop: "Workshop",
  seminar: "Seminar",
  volunteer: "Volunteer Work",
};

export const activitiesData: Activity[] = [
  {
    id: "acadex-hackathon-2025",
    title: "National Inter-University Hackathon",
    type: "hackathon",
    organizer: "Bangladesh ICT Division",
    date: "March 2025",
    location: "Dhaka, Bangladesh",
    achievement: "Winner",
    shortDescription:
      "Built Acadex — a classroom-first study platform — in 36 hours. Led a team of four to deliver a full-stack MVP with real-time collaboration.",
    fullDescription:
      "Participated in a 36-hour national hackathon focused on EdTech innovation. Our team identified gaps in how students organize academic materials across fragmented tools and built Acadex — a unified classroom platform with role-aware workflows, note sharing, and leaderboard gamification. We pitched to a panel of industry judges and won first place for technical execution and product vision.",
    coverImage:
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782219446/ChatGPT_Image_May_17_2026_10_02_44_AM_ej3p2z.png",
    gallery: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782219446/ChatGPT_Image_May_17_2026_10_02_44_AM_ej3p2z.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/one_uz50sw.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/two_ozn9cp.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/three_p83x25.png",
    ],
    role: "Team Lead & Full-Stack Developer",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    teamMembers: ["Tushar Islam", "Team Member A", "Team Member B", "Team Member C"],
    timeline: [
      { label: "Day 1 — Ideation", value: "Problem research, wireframes, architecture" },
      { label: "Day 1 — Build", value: "Auth, classroom CRUD, file uploads" },
      { label: "Day 2 — Polish", value: "Leaderboard, UI refinement, demo prep" },
      { label: "Final Pitch", value: "Live demo + Q&A with judges" },
    ],
    outcomes: [
      "Won 1st place among 40+ teams",
      "Received mentorship from senior engineers",
      "Project evolved into ongoing portfolio flagship",
    ],
    certificateImages: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/programingHero_avnspb.png",
    ],
    projectName: "Acadex",
    problemStatement:
      "Students juggle notes, assignments, and class communication across WhatsApp, Google Drive, and paper — with no single academic hub.",
    solutionOverview:
      "A classroom-centric platform where teachers create classes, students join with codes, upload organized notes, and compete on a subject-wise leaderboard.",
    githubLink: "https://github.com/iktushar01",
    demoLink: "https://www.iktushar01.me",
    demoVideoLink: "https://www.youtube.com",
    teamSize: 4,
    awards: ["1st Place — Best EdTech Solution", "Audience Choice Award"],
    devpostLink: "https://devpost.com",
    eventWebsite: "https://www.ictd.gov.bd",
  },
  {
    id: "web-dev-workshop-2024",
    title: "Advanced React & Next.js Workshop",
    type: "workshop",
    organizer: "Programming Hero",
    date: "August 2024",
    location: "Online",
    achievement: "Participant",
    shortDescription:
      "Hands-on workshop covering React Server Components, App Router patterns, and performance optimization in production Next.js apps.",
    fullDescription:
      "A two-day intensive workshop led by senior instructors from Programming Hero. Covered modern React 19 features, Next.js App Router architecture, data fetching strategies, and deployment best practices. Built a mini project applying server and client component boundaries.",
    coverImage:
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/programingHero_avnspb.png",
    gallery: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/programingHero_avnspb.png",
    ],
    role: "Participant",
    techStack: ["React 19", "Next.js", "TypeScript"],
    outcomes: [
      "Completed all workshop assignments",
      "Built a server-rendered dashboard prototype",
    ],
    certificateImages: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/programingHero_avnspb.png",
    ],
    eventWebsite: "https://web.programming-hero.com",
    slidesLink: "https://slides.com",
  },
  {
    id: "coding-competition-2024",
    title: "Regional Competitive Programming Contest",
    type: "competition",
    organizer: "ACM Student Chapter",
    date: "November 2024",
    location: "Chittagong, Bangladesh",
    achievement: "Finalist",
    shortDescription:
      "Solved algorithmic challenges under time pressure. Advanced to the regional finals among 200+ participants.",
    fullDescription:
      "Competed in a 5-hour ICPC-style programming contest featuring data structures, graph algorithms, and dynamic programming problems. Our team placed in the top 15, qualifying for the regional finals. Strengthened problem decomposition and time-management skills under competitive conditions.",
    coverImage:
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/webflow_kkq5i2.png",
    gallery: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/webflow_kkq5i2.png",
    ],
    role: "Team Programmer",
    techStack: ["C++", "Python", "Algorithms"],
    teamMembers: ["Tushar Islam", "Teammate 1", "Teammate 2"],
    teamSize: 3,
    outcomes: [
      "Regional finalist — top 15 of 200+ teams",
      "Solved 6 of 10 problems in qualifiers",
    ],
    eventWebsite: "https://icpc.global",
  },
  {
    id: "tech-seminar-2024",
    title: "Future of Web Development Seminar",
    type: "seminar",
    organizer: "Google Developer Groups",
    date: "June 2024",
    location: "Dhaka, Bangladesh",
    achievement: "Participant",
    shortDescription:
      "Industry seminar on AI-assisted development, edge computing, and the evolving full-stack landscape in 2024–2025.",
    fullDescription:
      "Attended keynote sessions from senior engineers at leading tech companies. Topics included AI pair programming, WebAssembly adoption, and sustainable software architecture. Networked with local developer community and participated in an open Q&A panel.",
    coverImage:
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/four_qsaher.png",
    gallery: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/four_qsaher.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/five_nr05q8.png",
    ],
    role: "Attendee",
    outcomes: [
      "Expanded professional network",
      "Gained insights on AI tooling trends",
    ],
    eventWebsite: "https://gdg.community.dev",
  },
  {
    id: "community-volunteer-2023",
    title: "Code for Community — Teaching Program",
    type: "volunteer",
    organizer: "Local Youth Tech Initiative",
    date: "2023 — 2024",
    location: "Chittagong, Bangladesh",
    achievement: "Volunteer",
    shortDescription:
      "Volunteered as a web development mentor, teaching HTML, CSS, and JavaScript fundamentals to 30+ high school students.",
    fullDescription:
      "Led weekly coding sessions for underprivileged students with limited access to technology education. Designed beginner-friendly curriculum, hands-on exercises, and a capstone mini-project where students built their first personal portfolio pages.",
    coverImage:
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/five_nr05q8.png",
    gallery: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/five_nr05q8.png",
    ],
    role: "Web Development Mentor",
    techStack: ["HTML", "CSS", "JavaScript"],
    outcomes: [
      "Mentored 30+ students over 6 months",
      "15 students completed capstone portfolios",
      "Received community appreciation certificate",
    ],
    certificateImages: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/webflow_kkq5i2.png",
    ],
  },
];
