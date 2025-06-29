import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug } from '../../../../lib/markdown';
import styles from '@/styles/blog-page.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Helper function to parse reference string and extract URL
const parseReference = (ref: string) => {
  // Extract the URL from the end of the reference string
  const urlMatch = ref.match(/https?:\/\/[^\s]+$/);
  const url = urlMatch ? urlMatch[0] : '';
  const text = url ? ref.replace(url, '').trim() : ref;
  
  return { text, url };
};

// Generate all static paths at build time
export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt || '',
    openGraph: post.srcimg ? {
      images: [{ url: post.srcimg }],
    } : undefined,
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  // Generate references HTML if they exist
  const referencesHtml = post.references && post.references.length > 0 
    ? `
      <h2>Referencias</h2>
      <small>
        <ol>
          ${post.references.map((ref: string) => {
            const { text, url } = parseReference(ref);
            return `<li>${url ? `${text} <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>` : text}</li>`;
          }).join('')}
        </ol>
      </small>
    `
    : '';

  // Combine post content with references
  const fullContent = post.content + referencesHtml;

  return (
    <div className={styles['blog-post-container']}>

      <p className="inner-page-title">Blog</p>
      
      <div className={styles['breadcrumbs']}>
        <Link href="/" className={styles['breadcrumb-item']}>
          Inicio <i className="fas fa-angle-right" aria-hidden="true"></i>
        </Link>
        <Link href="/blog" className={styles['breadcrumb-item']}>
          Blog <i className="fas fa-angle-right" aria-hidden="true"></i>
        </Link>
        <span className={styles['breadcrumb-item']}>
          {post.title}
        </span>
      </div>

      <article>
        <header className={styles['post-header']}>
          <h1 className={styles['post-title']}>{post.title}</h1>
          
          <div className={styles['post-meta']}>
            <span className={styles['date']}>
              <i className="fas fa-calendar" aria-hidden="true"></i> {post.date || 'N/A'}
            </span>
            
            {post.author && (
              <span className={styles['author']}>
                <i className="fas fa-user" aria-hidden="true"></i> {post.author}
              </span>
            )}
            
            {post.category && (
              <span className={styles['category']}>
                <i className="fas fa-folder" aria-hidden="true"></i> {post.category}
              </span>
            )}
          </div>
        </header>

        {post.srcimg && (
          <div className={styles['featured-image']}>
            <Image 
              src={post.srcimg}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        <div 
          className={styles['post-content']}
          dangerouslySetInnerHTML={{ __html: fullContent }}
        />

        {/* References are now included in the content above */}
      </article>
    </div>
  );
}