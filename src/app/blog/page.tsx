import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../../../lib/markdown';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Nuestros artículos más recientes',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading">
                <h1 className="h1-title">Blog</h1>
              </div>
              <ul className="breadcrumbs">
                <li>
                  <Link href="/" title="">
                    Inicio <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" title="">
                    Blog
                  </Link>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="main-content blog-posts">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="blog-listing">
                {posts.length === 0 ? (
                  <div className="text-center py-10">
                    <h3>No hay artículos publicados aún.</h3>
                  </div>
                ) : (
                  <div className="post-wrap">
                    {posts.map((post) => (
                      <article className="entry clearfix" key={post.slug}>
                        {post.srcimg && (
                          <div className="feature-post">
                            <Link href={`/blog/${post.slug}`}>
                              <div className="relative w-full h-64">
                                <Image
                                  src={post.srcimg}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                            </Link>
                          </div>
                        )}
                        <div className="main-post">
                          <h2 className="title-post">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>
                          <ul className="meta-post">
                            <li className="date">
                              <Link href={`/blog/${post.slug}`}>{post.date}</Link>
                            </li>
                            {post.author && (
                              <li className="author">
                                <Link href={`/blog/${post.slug}`}>{post.author}</Link>
                              </li>
                            )}
                            {post.category && (
                              <li className="categories">
                                <Link href={`/blog/${post.slug}`}>{post.category}</Link>
                              </li>
                            )}
                          </ul>
                          <div className="entry-post">
                            <p>{post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '')}...</p>
                            <div className="read-more">
                              <Link href={`/blog/${post.slug}`}>Leer más</Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}