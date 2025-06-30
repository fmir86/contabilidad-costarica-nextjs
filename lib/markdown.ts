import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { BlogPost, Service } from '../src/types';

const postsDirectory = path.join(process.cwd(), 'blogposts');
const servicesDirectory = path.join(process.cwd(), 'servicios');

// Blog Posts Functions
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      };
    });
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data
      return {
        slug,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date,
        author: matterResult.data.author,
        category: matterResult.data.category,
        excerpt: matterResult.data.excerpt,
        srcimg: matterResult.data.srcimg,
        content: matterResult.content,
        ...matterResult.data,
      };
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    // Combine the data
    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      date: matterResult.data.date,
      author: matterResult.data.author,
      category: matterResult.data.category,
      excerpt: matterResult.data.excerpt,
      srcimg: matterResult.data.srcimg,
      content: contentHtml,
      ...matterResult.data,
    };
  } catch (e) {
    console.error(`Error getting post for slug: ${slug}`, e);
    return null;
  }
}

// Services Functions
export function getAllServiceSlugs() {
  try {
    const fileNames = fs.readdirSync(servicesDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        return {
          slug: fileName.replace(/\.md$/, ''),
        };
      });
  } catch (e) {
    console.error('Error reading services directory:', e);
    return [];
  }
}

export function getAllServices(): Service[] {
  try {
    const fileNames = fs.readdirSync(servicesDirectory);
    const allServicesData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(servicesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the service metadata section
        const matterResult = matter(fileContents);

        // Ensure arrays are properly typed
        const serviceData: Service = {
          slug,
          title: matterResult.data.title || 'Untitled',
          description: matterResult.data.description,
          imgsrc: matterResult.data.imgsrc,
          badge: matterResult.data.badge,
          price: matterResult.data.price,
          pricePrefix: matterResult.data.pricePrefix,
          priceSuffix: matterResult.data.priceSuffix,
          subtitle: matterResult.data.subtitle,
          intro: matterResult.data.intro,
          duration: matterResult.data.duration,
          category: matterResult.data.category,
          challengesTitle: matterResult.data.challengesTitle,
          challenges: Array.isArray(matterResult.data.challenges) ? matterResult.data.challenges : [],
          services: Array.isArray(matterResult.data.services) ? matterResult.data.services : [],
          sectors: Array.isArray(matterResult.data.sectors) ? matterResult.data.sectors : [],
          pricing: Array.isArray(matterResult.data.pricing) ? matterResult.data.pricing : [],
          guarantees: Array.isArray(matterResult.data.guarantees) ? matterResult.data.guarantees : [],
          features: Array.isArray(matterResult.data.features) ? matterResult.data.features : [],
          included: Array.isArray(matterResult.data.included) ? matterResult.data.included : [],
          benefits: Array.isArray(matterResult.data.benefits) ? matterResult.data.benefits : [],
          ctaTitle: matterResult.data.ctaTitle,
          ctaDescription: matterResult.data.ctaDescription,
          content: matterResult.content,
          ...matterResult.data,
        };

        return serviceData;
      });

    // Sort services by title
    return allServicesData.sort((a, b) => a.title.localeCompare(b.title));
  } catch (e) {
    console.error('Error reading services:', e);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const fullPath = path.join(servicesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the service metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    // Ensure proper typing and array defaults
    const service: Service = {
      slug,
      title: matterResult.data.title || 'Untitled',
      description: matterResult.data.description,
      imgsrc: matterResult.data.imgsrc,
      badge: matterResult.data.badge,
      price: matterResult.data.price,
      pricePrefix: matterResult.data.pricePrefix,
      priceSuffix: matterResult.data.priceSuffix,
      subtitle: matterResult.data.subtitle,
      intro: matterResult.data.intro,
      duration: matterResult.data.duration,
      category: matterResult.data.category,
      challengesTitle: matterResult.data.challengesTitle,
      challenges: Array.isArray(matterResult.data.challenges) ? matterResult.data.challenges : [],
      services: Array.isArray(matterResult.data.services) ? matterResult.data.services : [],
      sectors: Array.isArray(matterResult.data.sectors) ? matterResult.data.sectors : [],
      pricing: Array.isArray(matterResult.data.pricing) ? matterResult.data.pricing : [],
      guarantees: Array.isArray(matterResult.data.guarantees) ? matterResult.data.guarantees : [],
      features: Array.isArray(matterResult.data.features) ? matterResult.data.features : [],
      included: Array.isArray(matterResult.data.included) ? matterResult.data.included : [],
      benefits: Array.isArray(matterResult.data.benefits) ? matterResult.data.benefits : [],
      ctaTitle: matterResult.data.ctaTitle,
      ctaDescription: matterResult.data.ctaDescription,
      content: contentHtml,
      ...matterResult.data,
    };

    return service;
  } catch (e) {
    console.error(`Error getting service for slug: ${slug}`, e);
    return null;
  }
}
