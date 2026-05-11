export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  skills: string[];
  credentialUrl: string;
}

export const certificatesData: Certificate[] = [
  {
    id: 1,
    title: "Complete Web Development Course with Jhankar Mahbub",
    issuer: "Programming Hero",
    date: "2024",
    description: "Successfully completed an intensive full-stack web development bootcamp covering React.js, Node.js, Express.js, MongoDB, and modern JavaScript.",
    image: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/programingHero_avnspb.png",
    skills: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Firebase", "JWT"],
    credentialUrl: "https://web.programming-hero.com/",
  },
  {
    id: 2,
    title: "Webflow Professional Certification",
    issuer: "Webflow",
    date: "2023",
    description: "Certified in Webflow platform mastery, demonstrating proficiency in no-code web design, responsive layouts, and CMS integration.",
    image: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/webflow_kkq5i2.png",
    skills: ["Webflow", "Web Design", "Responsive Design", "CMS", "UI/UX", "No-Code"],
    credentialUrl: "https://webflow.com/",
  },
];