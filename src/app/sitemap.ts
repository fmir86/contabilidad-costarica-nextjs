// src/app/sitemap.ts
import { getAllPostSlugs } from '../../lib/markdown';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const posts = getAllPostSlugs();
  
  // Your site's base URL
  const baseUrl = 'https://www.contabilidadcostarica.net';
  
  // Generate sitemap entries for blog posts
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const, // Use 'as const' to specify exact type
    priority: 0.8,
  }));
  
  // Generate sitemap entries for static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
        url: `${baseUrl}/sobre-nosotros`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    },
  
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    },
    // Add other static pages here
  ];
  
  // Combine all URLs
  return [...staticPages, ...blogUrls];
}