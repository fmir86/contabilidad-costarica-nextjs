// Blog post types for the contabilidad project

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  author?: string;
  category?: string;
  srcimg?: string;
  references?: string[];
  content: string;
  [key: string]: unknown; // For any additional frontmatter
}
