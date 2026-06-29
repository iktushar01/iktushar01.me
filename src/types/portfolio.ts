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

export interface Project {
  id: string;
  title: string;
  tag: string;
  images: string[];
  description: string;
  technologies: string[];
  liveLink: string | null;
  frontendLink: string | null;
  backendLink: string | null;
  demoVideoLink?: string | null;
  challenges: string[];
  improvements: string[];
  sortOrder?: number;
  isPublished?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  skills: string[];
  credentialUrl: string | null;
  sortOrder?: number;
  isPublished?: boolean;
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  type: ActivityType;
  organizer: string;
  date: string;
  location?: string | null;
  achievement?: string | null;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery: string[];
  role?: string | null;
  techStack?: string[];
  teamMembers?: string[];
  timeline?: ActivityTimelineItem[] | null;
  outcomes?: string[];
  certificateImages?: string[];
  projectLink?: string | null;
  githubLink?: string | null;
  demoLink?: string | null;
  eventWebsite?: string | null;
  devpostLink?: string | null;
  slidesLink?: string | null;
  projectName?: string | null;
  problemStatement?: string | null;
  solutionOverview?: string | null;
  demoVideoLink?: string | null;
  teamSize?: number | null;
  awards?: string[];
  sortOrder?: number;
  isPublished?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  author: string;
  status?: "DRAFT" | "PUBLISHED";
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  hackathon: "Hackathon",
  competition: "Competition",
  workshop: "Workshop",
  seminar: "Seminar",
  volunteer: "Volunteer Work",
};
