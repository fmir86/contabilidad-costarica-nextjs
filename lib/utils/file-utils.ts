import fs from 'fs';
import path from 'path';

export function getFileLastModified(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch (error) {
    console.error(`Error getting file stats for ${filePath}:`, error);
    return new Date();
  }
}

export function getPostLastModified(slug: string): Date {
  const postsDirectory = path.join(process.cwd(), 'blogposts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  return getFileLastModified(filePath);
}

export function getServiceLastModified(slug: string): Date {
  const servicesDirectory = path.join(process.cwd(), 'servicios');
  const filePath = path.join(servicesDirectory, `${slug}.md`);
  return getFileLastModified(filePath);
}
