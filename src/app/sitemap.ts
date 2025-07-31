// src/app/sitemap.ts
import { getAllPostSlugs, getAllServiceSlugs, getAllPosts } from '../../lib/markdown';
import { getPostLastModified, getServiceLastModified } from '../../lib/utils/file-utils';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts with metadata
  const postSlugs = getAllPostSlugs();
  const allPosts = getAllPosts();
  
  // Get all service pages
  const services = getAllServiceSlugs();
  
  // Your site's base URL
  const baseUrl = 'https://www.contabilidadcostarica.net';
  
  // Generate sitemap entries for blog posts with actual last modified dates and images
  const blogUrls = postSlugs.map((post) => {
    const postData = allPosts.find(p => p.slug === post.slug);
    const lastModified = getPostLastModified(post.slug);
    
    const entry: MetadataRoute.Sitemap[0] & { images?: string[] } = {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
    
    // Add image if available
    if (postData?.srcimg) {
      entry.images = [`${baseUrl}${postData.srcimg}`];
    }
    
    return entry;
  });

  // Generate sitemap entries for service pages with actual last modified dates
  const servicesUrls = services.map((service) => ({
    url: `${baseUrl}/servicios/${service.slug}`,
    lastModified: getServiceLastModified(service.slug),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  
  // Generate sitemap entries for static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2025-07-01'), // Update this when you make significant changes to the homepage
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre-nosotros`,
      lastModified: new Date('2025-07-01'), // Update this when you modify the about page
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date('2025-07-01'), // Update this when you modify the services page
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(), // Always current as it shows latest posts
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date('2025-07-01'), // Update this when you modify the contact page
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
  
  // Combine all URLs
  return [...staticPages, ...blogUrls, ...servicesUrls];
}
