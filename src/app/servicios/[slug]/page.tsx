import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllServiceSlugs, getServiceBySlug } from '../../../../lib/markdown';
import blogStyles from '@/styles/blog-page.module.scss';
import serviceStyles from '@/styles/service-detail.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Generate all static paths at build time
export async function generateStaticParams() {
  const services = getAllServiceSlugs();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  
  if (!service) {
    return {
      title: 'Servicio No Encontrado',
    };
  }
  
  return {
    title: `${service.title} | Contabilidad Costa Rica`,
    description: service.description || '',
    openGraph: service.imgsrc ? {
      images: [{ url: service.imgsrc }],
    } : undefined,
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  
  if (!service) {
    notFound();
  }

  return (
    <div className={blogStyles['blog-post-container']}>

      <p className="inner-page-title">Servicios</p>
      
      <div className={blogStyles['breadcrumbs']}>
        <Link href="/" className={blogStyles['breadcrumb-item']}>
          Inicio <i className="fas fa-angle-right" aria-hidden="true"></i>
        </Link>
        <Link href="/servicios" className={blogStyles['breadcrumb-item']}>
          Servicios <i className="fas fa-angle-right" aria-hidden="true"></i>
        </Link>
        <span className={blogStyles['breadcrumb-item']}>
          {service.title}
        </span>
      </div>

      <article>
        <header className={blogStyles['post-header']}>
          <h1 className={blogStyles['post-title']}>{service.title}</h1>
          
          <div className={blogStyles['post-meta']}>
            {service.category && (
              <span className={blogStyles['category']}>
                <i className="fas fa-folder" aria-hidden="true"></i> {service.category}
              </span>
            )}
            
            {service.price && (
              <span className={blogStyles['author']}>
                <i className="fas fa-dollar-sign" aria-hidden="true"></i> {service.price}
              </span>
            )}
            
            {service.duration && (
              <span className={blogStyles['date']}>
                <i className="fas fa-clock" aria-hidden="true"></i> {service.duration}
              </span>
            )}
          </div>
        </header>

        {service.imgsrc && (
          <div className={blogStyles['featured-image']}>
            <Image 
              src={service.imgsrc}
              alt={service.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        )}

        <div 
          className={blogStyles['post-content']}
          dangerouslySetInnerHTML={{ __html: service.content }}
        />

        {/* Service Features */}
        {service.features && service.features.length > 0 && (
          <div className={blogStyles['post-content']}>
            <h2>Características del Servicio</h2>
            <ul>
              {service.features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check text-green-600 mr-2" aria-hidden="true"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What's Included */}
        {service.included && service.included.length > 0 && (
          <div className={blogStyles['post-content']}>
            <h2>¿Qué Incluye?</h2>
            <ul>
              {service.included.map((item, index) => (
                <li key={index}>
                  <i className="fas fa-check-circle text-blue-600 mr-2" aria-hidden="true"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <div className={blogStyles['post-content']}>
            <h2>Beneficios</h2>
            <ul>
              {service.benefits.map((benefit, index) => (
                <li key={index}>
                  <i className="fas fa-star text-yellow-500 mr-2" aria-hidden="true"></i>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Call to Action */}
        <div className={serviceStyles['service-cta']}>
          <div className={serviceStyles['cta-container']}>
            <h3 className={serviceStyles['cta-title']}>¿Necesita este servicio?</h3>
            <p className={serviceStyles['cta-description']}>
              Contáctenos para obtener más información y una cotización personalizada adaptada a sus necesidades específicas.
            </p>
            <Link href="/contacto" className={serviceStyles['cta-button']}>
              <i className="fas fa-envelope" aria-hidden="true"></i>
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}