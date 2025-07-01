// Service related types for the contabilidad project

export interface ServiceSection {
  name: string;
  items: string[];
}

export interface ServiceItem {
  icon: string;
  title: string;
  sections: ServiceSection[];
}

export interface ServiceSector {
  icon: string;
  title: string;
  features: string[];
}

export interface ServicePlan {
  name: string;
  price: string;
  description: string;
  popular?: boolean;
  features: string[];
}

export interface ServiceGuarantee {
  icon: string;
  title: string;
  items: string[];
}

export interface Service {
  slug: string;
  title: string;
  description?: string;
  imgsrc?: string;
  badge?: string;
  price?: string;
  pricePrefix?: string;
  priceSuffix?: string;
  subtitle?: string;
  intro?: string;
  duration?: string;
  category?: string;
  
  // Arrays that were causing TypeScript errors
  challenges?: string[];
  services?: ServiceItem[];
  sectors?: ServiceSector[];
  pricing?: ServicePlan[];
  guarantees?: ServiceGuarantee[];
  features?: string[];
  included?: string[];
  benefits?: string[];
  
  // CTA section
  ctaTitle?: string;
  ctaDescription?: string;
  
  // Content
  content: string;
  
  // For any additional frontmatter from markdown
  [key: string]: unknown;
}
