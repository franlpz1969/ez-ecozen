import type { ComponentType } from 'react';

export interface Service {
  title: string;
  description: string;
  imageUrl: string;
  icon: ComponentType<{ className?: string }>;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  author: string;
  content: string;
}