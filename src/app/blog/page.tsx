// File: src/app/blog/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../../../lib/markdown';
import styles from '@/styles/blog.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Define once, use everywhere
const pageTitle = 'Contabilidad Costa Rica | Blog';
const pageDescription = 'Nuestros artículos más recientes sobre contabilidad y finanzas en Costa Rica. Mantente al día con las últimas actualizaciones y consejos.';
const ogImage = '/images/og-image.jpg';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [{
      url: ogImage,
      width: 1200,
      height: 630,
      alt: 'Contabilidad Costa Rica - Blog'
    }],
    type: 'website',
    url: 'https://contabilidadcostarica.net/blog'
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImage]
  }
};

export default function BlogPage({
  searchParams
}: {
  searchParams: { categories?: string }
}) {
  // Get categories from URL query parameter (comma-separated string)
  const activeCategories = searchParams.categories ? searchParams.categories.split(',') : [];
  
  // Get all posts and filter if needed
  const allPosts = getAllPosts();
  const posts = activeCategories.length > 0
    ? allPosts.filter(post => post.category && activeCategories.includes(post.category))
    : allPosts;
    
  // Extract all unique categories from posts
  const categories = Array.from(
    new Set(allPosts.map(post => post.category).filter(Boolean) as string[])
  );

  return (
    <div className={styles['blog-container']}>
      <section className={styles['blog-main']}>
        <h1 className="inner-page-title">Blog</h1>
        
        <h2 className='centered'>Nuestros artículos más recientes</h2>
        
        <p className={styles['centered']}>
          Mantente al día con las últimas actualizaciones y consejos sobre contabilidad y finanzas.
        </p>

        <div className={styles['content-wrapper']}>
          <div className={styles['posts-container']}>
            {posts.length === 0 ? (
              <div className={styles['no-posts']}>
                <h3>No hay artículos publicados en esta categoría.</h3>
              </div>
            ) : (
              <div className={styles['blog-grid']}>
                {posts.map((post) => (
                  <div className={styles['card']} key={post.slug}>
                    {post.srcimg && (
                      <div className={styles['image']}>
                        <Link href={`/blog/${post.slug}`}>
                          <div className="relative w-full h-full">
                            <Image
                              src={post.srcimg}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                      </div>
                    )}
                    
                    <div className={styles['content']}>
                      <div className={styles['meta']}>
                        <div className={styles['meta-row']}>
                          <span className={styles['date']}>
                            <i className="fas fa-calendar" aria-hidden="true"></i> {post.date}
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
                      </div>

                      <h3 className={styles['title']}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      
                      <div className={styles['excerpt']}>
                        <p>
                          {post.excerpt || 
                          (typeof post.content === 'string' ? 
                            post.content.substring(0, 150).replace(/<[^>]*>/g, '') : 
                            '')}...
                        </p>
                      </div>
                      
                      <div className={styles['read-more']}>
                        <Link href={`/blog/${post.slug}`}>
                          Leer Más <i className="fas fa-arrow-right" aria-hidden="true"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className={styles['blog-sidebar']}>
            <div className={styles['categories-filter']}>
              <h3 className={styles['filter-title']}>FILTRAR POR CATEGORÍAS</h3>
              
              <div className={styles['categories-list']}>
                {categories.map(category => {
                  // Check if this category is currently active
                  const isActive = activeCategories.includes(category);
                  
                  // Create a new array of categories based on adding/removing this one
                  let newCategories;
                  if (isActive) {
                    // Remove this category if it's already active
                    newCategories = activeCategories.filter(c => c !== category);
                  } else {
                    // Add this category if it's not already active
                    newCategories = [...activeCategories, category];
                  }
                  
                  // Create the URL for this category link
                  const href = newCategories.length > 0 
                    ? `/blog?categories=${newCategories.join(',')}`
                    : '/blog';
                    
                  return (
                    <Link
                      key={category}
                      href={href}
                      className={`${styles['category-item']} ${isActive ? styles['active'] : ''}`}
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}