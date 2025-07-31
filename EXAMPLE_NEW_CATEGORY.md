# Example: Adding Testimonials to Your Sitemap

This is a complete example of how to add a new dynamic category (testimonials) to your Next.js site with sitemap support.

## Step 1: Create Content Structure

### Create testimonials directory and sample content:

```bash
mkdir testimonials
```

### Create a sample testimonial file:
`testimonials/maria-gonzalez.md`

```markdown
---
title: "María González - Empresaria"
name: "María González"
company: "Panadería La Esperanza"
role: "Propietaria"
date: "2025-06-15"
rating: 5
featured: true
image: "/images/testimonials/maria-gonzalez.jpg"
---

Gracias al equipo de Contabilidad Costa Rica, pude formalizar mi negocio y acceder a créditos del Sistema de Banca para el Desarrollo. Su asesoría fue fundamental para mi crecimiento.
```

## Step 2: Create TypeScript Types

Add to `src/types/index.ts`:

```typescript
export interface Testimonial {
  slug: string;
  title: string;
  name: string;
  company?: string;
  role?: string;
  date: string;
  rating: number;
  featured?: boolean;
  image?: string;
  content: string;
}
```

## Step 3: Update Markdown Helper Functions

Add to `lib/markdown.ts`:

```typescript
// At the top with other imports
const testimonialsDirectory = path.join(process.cwd(), 'testimonials');

// Testimonial Functions
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

export function getAllTestimonials(): Testimonial[] {
  try {
    const fileNames = fs.readdirSync(testimonialsDirectory);
    const allTestimonialsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(testimonialsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
          slug,
          title: matterResult.data.title || 'Untitled',
          name: matterResult.data.name,
          company: matterResult.data.company,
          role: matterResult.data.role,
          date: matterResult.data.date,
          rating: matterResult.data.rating || 5,
          featured: matterResult.data.featured || false,
          image: matterResult.data.image,
          content: matterResult.content,
          ...matterResult.data,
        };
      });

    // Sort by date (newest first) and featured status
    return allTestimonialsData.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (e) {
    console.error('Error reading testimonials:', e);
    return [];
  }
}

export async function getTestimonialBySlug(slug: string): Promise<Testimonial | null> {
  try {
    const fullPath = path.join(testimonialsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title || 'Untitled',
      name: matterResult.data.name,
      company: matterResult.data.company,
      role: matterResult.data.role,
      date: matterResult.data.date,
      rating: matterResult.data.rating || 5,
      featured: matterResult.data.featured || false,
      image: matterResult.data.image,
      content: contentHtml,
      ...matterResult.data,
    };
  } catch (e) {
    console.error(`Error getting testimonial for slug: ${slug}`, e);
    return null;
  }
}
```

## Step 4: Update File Utils

Add to `lib/utils/file-utils.ts`:

```typescript
export function getTestimonialLastModified(slug: string): Date {
  const testimonialsDirectory = path.join(process.cwd(), 'testimonials');
  const filePath = path.join(testimonialsDirectory, `${slug}.md`);
  return getFileLastModified(filePath);
}
```

## Step 5: Update Sitemap

Update `src/app/sitemap.ts`:

```typescript
import { 
  getAllPostSlugs, 
  getAllServiceSlugs, 
  getAllPosts,
  getAllTestimonialSlugs,
  getAllTestimonials 
} from '../../lib/markdown';
import { 
  getPostLastModified, 
  getServiceLastModified,
  getTestimonialLastModified 
} from '../../lib/utils/file-utils';

// Inside the sitemap function:
const testimonials = getAllTestimonialSlugs();
const allTestimonials = getAllTestimonials();

// Generate sitemap entries for testimonials
const testimonialUrls = testimonials.map((testimonial) => {
  const testimonialData = allTestimonials.find(t => t.slug === testimonial.slug);
  const lastModified = getTestimonialLastModified(testimonial.slug);
  
  const entry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/testimonios/${testimonial.slug}`,
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.6,
  };
  
  // Add image if available
  if (testimonialData?.image) {
    entry.images = [`${baseUrl}${testimonialData.image}`];
  }
  
  return entry;
});

// Add testimonials list page to static pages
const staticPages: MetadataRoute.Sitemap = [
  // ... existing pages ...
  {
    url: `${baseUrl}/testimonios`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
];

// Update return statement
return [...staticPages, ...blogUrls, ...servicesUrls, ...testimonialUrls];
```

## Step 6: Create the Pages

### Testimonials List Page
`src/app/testimonios/page.tsx`:

```typescript
import { getAllTestimonials } from '../../../lib/markdown';
import Link from 'next/link';

export const metadata = {
  title: 'Testimonios - Contabilidad Costa Rica',
  description: 'Lo que dicen nuestros clientes sobre nuestros servicios contables',
};

export default function TestimonialsPage() {
  const testimonials = getAllTestimonials();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Testimonios de Clientes</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Link 
            key={testimonial.slug} 
            href={`/testimonios/${testimonial.slug}`}
            className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              {testimonial.image && (
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <h2 className="font-semibold">{testimonial.name}</h2>
                {testimonial.company && (
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                )}
              </div>
            </div>
            
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
                >
                  ★
                </span>
              ))}
            </div>
            
            <p className="text-gray-700 line-clamp-3">{testimonial.content}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### Individual Testimonial Page
`src/app/testimonios/[slug]/page.tsx`:

```typescript
import { getTestimonialBySlug, getAllTestimonialSlugs } from '../../../../lib/markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const testimonials = getAllTestimonialSlugs();
  return testimonials.map((testimonial) => ({
    slug: testimonial.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const testimonial = await getTestimonialBySlug(params.slug);
  
  if (!testimonial) {
    return {
      title: 'Testimonio no encontrado',
    };
  }

  return {
    title: `${testimonial.title} - Contabilidad Costa Rica`,
    description: testimonial.content.substring(0, 160),
  };
}

export default async function TestimonialPage({ params }: { params: { slug: string } }) {
  const testimonial = await getTestimonialBySlug(params.slug);

  if (!testimonial) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          {testimonial.image && (
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mr-6"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{testimonial.name}</h1>
            {testimonial.role && testimonial.company && (
              <p className="text-gray-600">{testimonial.role} en {testimonial.company}</p>
            )}
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: testimonial.content }}
        />
        
        <div className="mt-6 pt-6 border-t text-sm text-gray-500">
          Publicado el {new Date(testimonial.date).toLocaleDateString('es-CR')}
        </div>
      </div>
    </article>
  );
}
```

## Step 7: Update Navigation

Add a link to testimonials in your navigation component:

```typescript
<Link href="/testimonios" className="nav-link">
  Testimonios
</Link>
```

## Testing

1. Create a few testimonial markdown files in the `/testimonials` directory
2. Run the development server: `npm run dev`
3. Visit `http://localhost:3000/testimonios` to see the list
4. Visit `http://localhost:3000/sitemap.xml` to verify testimonials are included
5. Run `npm run test:sitemap` to see a summary of all sitemap entries

## Notes

- The sitemap will automatically include all testimonials when you build or run the site
- Images in testimonials will be included in the sitemap for better SEO
- Last modified dates are based on actual file modification times
- You can adjust priorities and change frequencies based on your needs
