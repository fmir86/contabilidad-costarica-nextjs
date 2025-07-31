# Sitemap Configuration Guide

## Overview
Your Next.js project already has a dynamic sitemap configured at `src/app/sitemap.ts`. The sitemap is automatically generated and available at `/sitemap.xml` when your site is built.

## Current Implementation

### What's Included
1. **Static Pages**: Home, About Us, Services, Blog, Contact
2. **Dynamic Blog Posts**: All markdown files from `/blogposts` directory
3. **Dynamic Service Pages**: All markdown files from `/servicios` directory

### Improvements Made
- Added actual file modification dates instead of always using current date
- Added support for blog post images in the sitemap
- Created utility functions for better file handling

## How to View Your Sitemap

### In Development
```bash
npm run dev
# Visit: http://localhost:3000/sitemap.xml
```

### Test Sitemap Generation
```bash
# Install tsx if you haven't already
npm install -D tsx

# Run the test script
npx tsx scripts/test-sitemap.ts
```

## Adding New Dynamic Categories

If you want to add a new dynamic category (e.g., "testimonials", "case-studies", etc.), follow these steps:

### 1. Create the Content Directory
```bash
mkdir testimonials
```

### 2. Update the Markdown Helper Functions
Add new functions to `lib/markdown.ts`:

```typescript
// Testimonials Functions
const testimonialsDirectory = path.join(process.cwd(), 'testimonials');

export function getAllTestimonialSlugs() {
  try {
    const fileNames = fs.readdirSync(testimonialsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
      }));
  } catch (e) {
    console.error('Error reading testimonials directory:', e);
    return [];
  }
}
```

### 3. Add File Utils for Last Modified Dates
Update `lib/utils/file-utils.ts`:

```typescript
export function getTestimonialLastModified(slug: string): Date {
  const testimonialsDirectory = path.join(process.cwd(), 'testimonials');
  const filePath = path.join(testimonialsDirectory, `${slug}.md`);
  return getFileLastModified(filePath);
}
```

### 4. Update the Sitemap
Modify `src/app/sitemap.ts`:

```typescript
import { getAllTestimonialSlugs } from '../../lib/markdown';
import { getTestimonialLastModified } from '../../lib/utils/file-utils';

// Inside the sitemap function, add:
const testimonials = getAllTestimonialSlugs();

const testimonialUrls = testimonials.map((testimonial) => ({
  url: `${baseUrl}/testimonials/${testimonial.slug}`,
  lastModified: getTestimonialLastModified(testimonial.slug),
  changeFrequency: 'monthly' as const,
  priority: 0.6,
}));

// Update the return statement:
return [...staticPages, ...blogUrls, ...servicesUrls, ...testimonialUrls];
```

### 5. Create the Route Pages
Create the necessary pages in your app directory:
- `src/app/testimonials/page.tsx` - List page
- `src/app/testimonials/[slug]/page.tsx` - Individual testimonial page

## Sitemap Best Practices

1. **Priority Values**:
   - 1.0: Homepage
   - 0.9: Main category pages
   - 0.8: Individual content pages
   - 0.7: Less important pages

2. **Change Frequency**:
   - `always`: Use sparingly, only for pages that change multiple times per day
   - `hourly`: News sites, frequently updated content
   - `daily`: Active blogs
   - `weekly`: Regular content updates
   - `monthly`: Most static content
   - `yearly`: Legal pages, contact info
   - `never`: Archived content

3. **Images**: Include featured images for better SEO visibility

## Validation

After deploying, validate your sitemap using:
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

## Troubleshooting

If your sitemap isn't working:

1. Check for TypeScript errors:
   ```bash
   npm run build
   ```

2. Ensure all markdown files have proper frontmatter

3. Check that file paths are correct in the helper functions

4. Verify robots.txt points to the correct sitemap URL

## Additional SEO Considerations

1. **Submit to Search Engines**: Once deployed, submit your sitemap URL to Google Search Console and Bing Webmaster Tools

2. **Monitor Coverage**: Regularly check search console for indexing issues

3. **Keep It Updated**: The dynamic nature ensures new content is automatically added

4. **Size Limits**: Google supports sitemaps up to 50MB and 50,000 URLs. If you exceed this, implement sitemap index files.
