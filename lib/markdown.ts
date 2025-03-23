import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'blogposts');

export interface BlogPost {
  slug: string;
  title: string;
  date?: string;
  author?: string;
  category?: string;
  excerpt?: string;
  srcimg?: string;
  content: string;
  [key: string]: unknown; // For any additional frontmatter
}

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