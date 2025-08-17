export type ProjectCategory = 'opensource' | 'ai-powered' | 'work';
export type ProjectStatus = 'production' | 'development' | 'maintained';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologies: string[];
  role: string;
  period: string;
  teamSize?: number;
  achievements: Achievement[];
  features?: string[];
  roadmap?: string[];
  challenges?: string[];
  links?: ProjectLink[];
  images?: ProjectImage[];
  featured?: boolean;
  order?: number;
  stats?: {
    stars?: number;
    forks?: number;
    downloads?: number;
    users?: number;
    coverage?: number;
    completion?: string;
  };
}

export interface Achievement {
  description: string;
  metric?: string;
}

export interface ProjectLink {
  type: 'github' | 'demo' | 'npm' | 'website' | 'docs' | 'article';
  url: string;
  label?: string;
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  projects: string[];
  achievements: string[];
}

export interface Skill {
  category: 'expert' | 'proficient' | 'experienced';
  name: string;
  icon?: string;
  years?: number;
}

export interface OpenSourceProject {
  name: string;
  description: string;
  stars: number;
  forks: number;
  downloads?: number;
  url: string;
  language: string;
}