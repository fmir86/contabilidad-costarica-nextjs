import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllServiceSlugs, getServiceBySlug } from '../../../../lib/markdown';
import styles from '@/styles/blog-page.module.scss';
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
    <div className={styles['blog-post-container']}>

      <p className="inner-page-title">Servicios</p>
      
      <div className={styles['breadcrumbs']}>
        <Link href="/" className={styles['breadcrumb-item']}>
          Inicio <i className="fas fa-angle-right" aria-hidden="true"></i>
        </Link>
        <Link href="/servicios" className={styles['breadcrumb-item']}>
          Servicios <i className="fas fa-angle-right" aria-hidden="true"></i>
        </Link>
        <span className={styles['breadcrumb-item']}>
          {service.title}
        </span>
      </div>

      <article>
        <header className={styles['post-header']}>
          <h1 className={styles['post-title']}>{service.title}</h1>
          
          <div className={styles['post-meta']}>
            {service.category && (
              <span className={styles['category']}>
                <i className="fas fa-folder" aria-hidden="true"></i> {service.category}
              </span>
            )}
            
            {service.price && (
              <span className={styles['author']}>
                <i className="fas fa-dollar-sign" aria-hidden="true"></i> {service.price}
              </span>
            )}
            
            {service.duration && (
              <span className={styles['date']}>
                <i className="fas fa-clock" aria-hidden="true"></i> {service.duration}
              </span>
            )}
          </div>
        </header>

        {service.imgsrc && (
          <div className={styles['featured-image']}>
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
          className={styles['post-content']}
          dangerouslySetInnerHTML={{ __html: service.content }}
        />

        {/* Service Features */}
        {service.features && service.features.length > 0 && (
          <div className={styles['post-content']}>
            <h2>Características del Servicio</h2>
            <ul>
              {service.features.map((feature, index) => (
                <li key={index}><i className="fas fa-check" style={{color: '#28a745', marginRight: '8px'}}></i>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* What's Included */}
        {service.included && service.included.length > 0 && (
          <div className={styles['post-content']}>
            <h2>¿Qué Incluye?</h2>
            <ul>
              {service.included.map((item, index) => (
                <li key={index}><i className="fas fa-check-circle" style={{color: '#007bff', marginRight: '8px'}}></i>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <div className={styles['post-content']}>
            <h2>Beneficios</h2>
            <ul>
              {service.benefits.map((benefit, index) => (
                <li key={index}><i className="fas fa-star" style={{color: '#ffc107', marginRight: '8px'}}></i>{benefit}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Call to Action */}
        <div className={styles['post-content']}>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '2rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            marginTop: '2rem',
            border: '2px solid #e9ecef'
          }}>
            <h3 style={{color: '#495057', marginBottom: '1rem'}}>¿Necesita este servicio?</h3>
            <p style={{marginBottom: '1.5rem', color: '#6c757d'}}>Contáctenos para obtener más información y una cotización personalizada adaptada a sus necesidades específicas.</p>
            <Link 
              href="/contacto" 
              style={{ 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '4px', 
                textDecoration: 'none',
                display: 'inline-block',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
            >
              <i className="fas fa-envelope" style={{marginRight: '8px'}}></i>
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}