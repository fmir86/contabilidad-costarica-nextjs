// lib/getPosts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  slug: string;
  title: string;
  excerpt?: string;
  datapost: string;
  srcimg: string;
  description?: string;
  author?: string;
  category?: string;
  references?: string[];
}

interface FormattedPost extends Post {
  day: string;
  month: string;
}

// Function to convert a string of date in format dd-mm-yyyy or dd/mm/yyyy to a timestamp
function parseDate(dateStr: string) {
  // Supports both '-' and '/' as separator
  const parts = dateStr.split(/[-\/]/);
  if (parts.length !== 3) return new Date(NaN).getTime();
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return new Date(year, month - 1, day).getTime();
}

// Function to format dates for display
function formatPostDate(post: Post): FormattedPost {
  let day = '';
  let month = '';
  
  if (post.datapost) {
    const parts = post.datapost.split(/[-\/]/);
    if (parts.length === 3) {
      day = parts[0];
      const monthNum = parseInt(parts[1], 10);
      const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
      month = months[monthNum - 1] || '';
    }
  }
  
  return { ...post, day, month };
}

export async function getPosts(limit?: number): Promise<FormattedPost[]> {
  const postsDirectory = path.join(process.cwd(), 'blogposts');

  try {
    // Read all files from the 'blogposts' folder
    const files = fs.readdirSync(postsDirectory);

    // Extract posts (only Markdown files) and their data
    let posts = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const slug = file.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || slug,
          datapost: data.date || '', // Expected format "dd-mm-yyyy" or "dd/mm/yyyy"
          srcimg: data.srcimg || '',
          author: data.author || '',
          category: data.category || '',
          description: data.description || content.substring(0, 150) + '...'
        };
      });

    // Sort posts by date (newest first)
    posts.sort((a, b) => parseDate(b.datapost) - parseDate(a.datapost));

    // Limit the number of posts if specified
    if (limit && limit > 0) {
      posts = posts.slice(0, limit);
    }

    // Format the posts to include day and month
    const formattedPosts = posts.map(formatPostDate);

    return formattedPosts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}