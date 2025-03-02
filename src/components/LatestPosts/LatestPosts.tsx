import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LatestPosts.module.scss';

interface BlogPost {
  slug: string;
  title: string;
  datapost: string;
  srcimg: string;
  description?: string; // Make this optional to match FormattedPost
  author?: string;      // Add these optional fields to match FormattedPost
  category?: string;    // Add these optional fields to match FormattedPost
  day: string;
  month: string;
}

interface LatestPostsProps {
  posts: BlogPost[];
}

const LatestPosts: React.FC<LatestPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <section className={styles.latestPostsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Noticias y Opinión</h2>
          <div className={styles.noResults}>No hay publicaciones disponibles en este momento.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.latestPostsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Noticias y Opinión</h2>
        <div className={styles.titleUnderline}></div>
        
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <div key={post.slug} className={styles.postCard}>
              <div className={styles.postImageWrapper}>
                <Link href={`/blog/${post.slug}`}>
                  <div className={styles.postImage}>
                    <Image 
                      src={post.srcimg} 
                      alt={post.title}
                      width={400}
                      height={250}
                    />
                  </div>
                </Link>
                
                <div className={styles.dateBox}>
                  <div className={styles.day}>{post.day}</div>
                  <div className={styles.month}>{post.month}</div>
                </div>
              </div>
              
              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className={styles.postDescription}>
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/blog" className={styles.viewAllBtn}>
          Ver todas las publicaciones
        </Link>

      </div>
    </section>
  );
};

export default LatestPosts;