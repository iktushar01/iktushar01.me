export interface Project {
  id: number;
  title: string;
  tag: string;
  images: string[];
  description: string;
  technologies: string[];

  liveLink: string;

  frontendLink: string;
  backendLink: string;

  challenges: string[];
  improvements: string[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Acadex",
    tag: "Next.js Platform",

    images: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/one_uz50sw.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/two_ozn9cp.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/three_p83x25.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/four_qsaher.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/five_nr05q8.png",
    ],

    description:
      "A classroom-first study platform where students can join classrooms, organize subjects and folders, upload notes, save favorites, track leaderboard activity, and collaborate through a clean role-aware academic workflow.",

    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "TanStack Query",
      "TanStack React Form",
      "Axios",
      "Framer Motion",
      "Zod",
      "Radix UI",
    ],

    liveLink: "https://acadex-client.vercel.app/",

    frontendLink:
      "https://github.com/iktushar01/Acadex-client.git",

    backendLink:
      "https://github.com/iktushar01/Acadex-server.git",

    challenges: [
      "Designing role-aware dashboard flows for students, CRs, admins, and super admins across protected routes",
      "Structuring classroom, subject, folder, and note management into a clear academic hierarchy",
      "Handling approval-aware note workflows with favorites, comments, and leaderboard activity",
    ],

    improvements: [
      "Add richer classroom analytics",
      "Introduce real-time activity updates",
      "Expand note discovery with filters",
    ],
  },

  {
    id: 2,
    title: "RetailFlow POS Management System",
    tag: "Full Stack",

    images: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778815021/Screenshot_2026-05-15_091339_nspgjj.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778815021/Screenshot_2026-05-15_091432_ynabtv.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778815021/Screenshot_2026-05-15_091506_kc5ip6.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465777/four_aou7so.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465777/five_df5ly5.png",
    ],

    description:
      "A comprehensive POS Store Management System with advanced inventory tracking, supplier management, and warehouse operations.",

    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "TanStack Table",
      "Axios",
      "SweetAlert2",
    ],

    liveLink: "https://retail-flow-client.vercel.app/dashboard/overview",

    frontendLink:
      "https://github.com/iktushar01/RetailFlow-client.git",

    backendLink:
      "https://github.com/iktushar01/RetailFlow-server.git",

    challenges: [
      "Implementing secure session management",
      "Building complex procurement workflows",
      "Managing real-time inventory updates",
    ],

    improvements: [
      "Add sales POS terminal",
      "Implement barcode scanning",
      "Add email notifications",
    ],
  },

  {
    id: 3,
    title: "Easy Home - Real Estate Platform",
    tag: "MERN Stack",

    images: [
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465883/one_zgibwm.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465885/two_ram1lj.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465883/three_opba7k.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465883/four_riopet.png",
      "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465882/five_um6rxu.png",
    ],

    description:
      "A MERN stack real estate platform with role-based dashboards, wishlist functionality, and Stripe payment integration.",

    technologies: [
      "React",
      "Firebase Auth",
      "MongoDB",
      "Express.js",
      "Node.js",
      "TanStack Query",
      "Stripe.js",
      "Tailwind CSS",
    ],

    liveLink: "https://easy-home-5ec20.web.app/",

    frontendLink:
      "https://github.com/iktushar01/Easy-Home-Client.git",

    backendLink:
      "https://github.com/iktushar01/Easy-Home-Server.git",

    challenges: [
      "Dynamic role-based dashboards",
      "JWT route security",
      "Stripe payment logic",
    ],

    improvements: [
      "Add agent selling statistics",
      "Implement property report system",
      "Multi-language support",
    ],
  },
];