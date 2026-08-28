export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  location: string;
  headline: string;
  bio: string;
  topSkills: string[];
  githubProjectCount: number;
  social: SocialLinks;
  languages: Language[];
  resumeUrl: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  issued?: string;
  expires?: string;
}

export interface Honor {
  title: string;
  organization?: string;
  date?: string;
  description?: string;
  url?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  period?: string;
  pinned?: boolean;
  liveUrl?: string;
  repoUrl?: string;
  stack: string[];
  /** null = confirmed gap, not yet provided — render section hidden, not faked */
  problem: string | null;
  process?: string;
  execution: string[];
  results: string[];
  reflection?: string;
  scale?: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
}

export interface PortfolioData {
  profile: Profile;
  experience: ExperienceEntry[];
  certifications: Certification[];
  honors: Honor[];
  projects: Project[];
  skills: SkillCategory[];
  coreCompetencies: string[];
  education: EducationEntry[];
}
