import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllPostSlugs, getPostBySlug } from '../../../../lib/markdown';

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

  return (
    <>
      {/* Page Title Section - Similar to your original component */}
      <div className="page-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading">
                <h1 className="h1-title">{post.title}</h1>
              </div>
              <ul className="breadcrumbs">
                <li>
                  <Link href="/blog/" title="">
                    Blog <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </Link>
                </li>
                <li>
                  <Link href={`/blog/${params.slug}`} title="">
                    {post.title}
                  </Link>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="main-content">
        <div className="container">
          <div className="row">
            {/* Left Column: Blog Post */}
            <div className="col-md-12">
              <div className="post-wrap">
                <article className="main-post">
                  <div className="entry-post-title">
                    <h2 className="post-title">
                      <Link href={`/blog/${params.slug}`} title="">
                        {post.title}
                      </Link>
                    </h2>
                    <ul className="entry-meta">
                      <li className="date">
                        {post.date || 'N/A'}
                      </li>
                      {post.author && (
                        <li className="author">
                          {post.author}
                        </li>
                      )}
                      {post.category && (
                        <li className="categories">
                          {post.category}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Featured Image (optional) */}
                  {post.srcimg && (
                    <div className="featured-post">
                      <div className="relative w-full h-96">
                        <Image 
                          src={post.srcimg}
                          alt={post.title}
                          fill
                          priority
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  )}

                  {/* The Markdown content as HTML */}
                  <div className="entry-content">
                    <div
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}