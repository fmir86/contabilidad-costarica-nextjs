import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllServiceSlugs, getServiceBySlug } from '../../../../lib/markdown';
import { Service, ServiceItem, ServiceSector, ServicePlan, ServiceGuarantee } from '../../../types';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from '../../../styles/service-page.module.scss';

// Icon mapping for FontAwesome
const iconMap: { [key: string]: string } = {
  Calendar: 'fas fa-calendar',
  FileText: 'fas fa-file-text',
  Calculator: 'fas fa-calculator',
  Users: 'fas fa-users',
  Award: 'fas fa-award',
  TrendingUp: 'fas fa-chart-line',
  Shield: 'fas fa-shield-alt',
  CheckCircle: 'fas fa-check-circle',
  Phone: 'fas fa-phone',
};

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
  const service: Service | null = await getServiceBySlug(params.slug);
  
  if (!service) {
    notFound();
  }

  return (
    <div className={styles['page-container']}>
      {/* Hero Section */}
      <section 
        className={styles['hero-section']}
        style={{
          backgroundImage: service.imgsrc ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${service.imgsrc})` : undefined,
        }}
      >
        <div className={`${styles['hero-content']} ${service.imgsrc ? styles['hero-content-with-image'] : ''}`}>
          {service.badge && (
            <div className={`${styles['badge']} ${
              service.imgsrc 
                ? styles['badge-with-image']
                : styles['badge-default']
            }`}>
              {service.badge}
            </div>
          )}
          <h1 className={`${styles['hero-title']} ${service.imgsrc ? styles['hero-title-with-image'] : styles['hero-title-default']}`}>
            {service.title}
          </h1>
          {service.price && (
            <div className={styles['price-container']}>
              {service.pricePrefix && (
                <span className={`${styles['price-prefix']} ${service.imgsrc ? styles['price-prefix-with-image'] : styles['price-prefix-default']}`}>
                  {service.pricePrefix}
                </span>
              )}
              <span className={`${styles['price']} ${service.imgsrc ? styles['price-with-image'] : styles['price-default']}`}>
                {service.price}
              </span>
              {service.priceSuffix && (
                <span className={`${styles['price-suffix']} ${service.imgsrc ? styles['price-suffix-with-image'] : styles['price-suffix-default']}`}>
                  {service.priceSuffix}
                </span>
              )}
            </div>
          )}
          {service.subtitle && (
            <h2 className={`${styles['hero-subtitle']} ${service.imgsrc ? styles['hero-subtitle-with-image'] : styles['hero-subtitle-default']}`}>
              {service.subtitle}
            </h2>
          )}
          {service.intro && (
            <p className={`${styles['hero-intro']} ${service.imgsrc ? styles['hero-intro-with-image'] : styles['hero-intro-default']}`}>
              {service.intro}
            </p>
          )}
          <div className={styles['hero-buttons']}>
            <Link href="/contacto" className={styles['primary-button']}>
              Solicitar Información
            </Link>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      {service.challenges && service.challenges.length > 0 && (
        <section className={styles['content-section-gray']}>
            <div className={styles['content-wrapper']}>
              <h2 className={styles['section-title']}>
                {String(service.challengesTitle)}
              </h2>
              <div className={styles['challenges-grid']}>
                {service.challenges.map((challenge: string, index: number) => (
                  <div key={index} className={styles['challenge-card']}>
                    <p className={styles['challenge-text']}>{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
        </section>
      )}

      {/* Services Section */}
      {service.services && service.services.length > 0 && (
        <section className={styles['content-section']}>
          <div className={styles['container']}>
            <div className={styles['content-wrapper']}>
              <h2 className={styles['section-title-large']}>
                Nuestro Servicio Integral de Gestión Fiscal
              </h2>

              <div className={styles['services-grid']}>
                {service.services.map((serviceItem: ServiceItem, index: number) => (
                  <div key={index} className={styles['service-card']}>
                    <div className={styles['service-header']}>
                      <i className={`${iconMap[serviceItem.icon] || 'fas fa-cog'} ${styles['service-icon']}`}></i>
                      <h3 className={styles['service-title']}>{serviceItem.title}</h3>
                    </div>
                    <div className={styles['service-content']}>
                      {serviceItem.sections?.map((section, sectionIndex: number) => (
                        <div key={sectionIndex}>
                          <h4 className={styles['service-section-title']}>{section.name}</h4>
                          <ul className={styles['service-list']}>
                            {section.items?.map((item: string, itemIndex: number) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                          {sectionIndex < serviceItem.sections.length - 1 && (
                            <hr className={styles['service-divider']} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sector Specialization */}
              {service.sectors && service.sectors.length > 0 && (
                <div>
                  <h3 className={styles['section-subtitle']}>Especialización por Sector</h3>
                  <div className={styles['sectors-grid']}>
                    {service.sectors.map((sector: ServiceSector, index: number) => (
                      <div key={index} className={styles['sector-card']}>
                        <div className={styles['sector-icon-container']}>
                          <i className={`${iconMap[sector.icon] || 'fas fa-cog'} ${styles['sector-icon']}`}></i>
                        </div>
                        <h4 className={styles['sector-title']}>{sector.title}</h4>
                        <ul className={styles['sector-list']}>
                          {sector.features?.map((feature: string, idx: number) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {service.pricing && service.pricing.length > 0 && (
        <section className={styles['content-section-gray']}>
          <div className={styles['container']}>
            <div className={styles['wide-content-wrapper']}>
              <h2 className={styles['section-title-large']}>Precios por Complejidad</h2>
              <div className={styles['pricing-grid']}>
                {service.pricing.map((plan: ServicePlan, index: number) => (
                  <div key={index} className={`${styles['pricing-card']} ${plan.popular ? styles['pricing-card-popular'] : ''}`}>
                    {plan.popular && (
                      <div className={styles['popular-badge']}>
                        Más Popular
                      </div>
                    )}
                    <div className={styles['pricing-header']}>
                      <h3 className={styles['pricing-name']}>{plan.name}</h3>
                      <div className={styles['pricing-price']}>
                        {plan.price}
                        <span className={styles['pricing-period']}>/mes</span>
                      </div>
                      <p className={styles['pricing-description']}>{plan.description}</p>
                    </div>
                    <ul className={styles['pricing-features']}>
                      {plan.features?.map((feature: string, idx: number) => (
                        <li key={idx}>
                          <i className={`fas fa-check-circle ${styles['pricing-check-icon']}`}></i>
                          <span className={styles['pricing-feature-text']}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`${styles['pricing-button']} ${
                      plan.popular 
                        ? styles['pricing-button-popular']
                        : styles['pricing-button-default']
                    }`}>
                      Seleccionar Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Guarantees Section */}
      {service.guarantees && service.guarantees.length > 0 && (
        <section className={styles['content-section']}>
          <div className={styles['container']}>
            <div className={styles['content-wrapper']}>
              <h2 className={styles['section-title-large']}>Garantías y Compromisos</h2>
              <div className={styles['guarantees-grid']}>
                {service.guarantees.map((guarantee: ServiceGuarantee, index: number) => (
                  <div key={index} className={styles['guarantee-card']}>
                    <div className={styles['guarantee-header']}>
                      <i className={`${iconMap[guarantee.icon] || 'fas fa-check'} ${styles['guarantee-icon']}`}></i>
                      <h3 className={styles['guarantee-title']}>{guarantee.title}</h3>
                    </div>
                    <ul className={styles['guarantee-list']}>
                      {guarantee.items?.map((item: string, idx: number) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={styles['cta-section']}>
        <div className={styles['container']}>
          <div className={styles['cta-content']}>
            <h2 className={styles['cta-title']}>
              {service.ctaTitle || "¿Necesita este servicio?"}
            </h2>
            <p className={styles['cta-description']}>
              {service.ctaDescription || "Contáctenos para obtener más información y una cotización personalizada adaptada a sus necesidades específicas."}
            </p>
            <div className={styles['cta-buttons']}>
              <Link 
                href="tel:+50625703400"
                className={styles['cta-primary-button']}
              >
                <i className="fas fa-phone"></i>
                Llamar Ahora
              </Link>
              <Link 
                href="/contacto"
                className={styles['cta-secondary-button']}
              >
                Solicitar Cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className={styles['summary-section']}>
        <div className={styles['container']}>
          <div className={styles['wide-content-wrapper']}>
            <div className={styles['summary-grid']}>
              {service.features && service.features.length > 0 && (
                <div>
                  <h3 className={styles['summary-item-title']}>Características del Servicio</h3>
                  <ul className={styles['summary-list']}>
                    {service.features.slice(0, 4).map((feature: string, index: number) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {service.included && service.included.length > 0 && (
                <div>
                  <h3 className={styles['summary-item-title']}>¿Qué Incluye?</h3>
                  <ul className={styles['summary-list']}>
                    {service.included.slice(0, 4).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h3 className={styles['summary-item-title']}>Beneficios</h3>
                  <ul className={styles['summary-list']}>
                    {service.benefits.slice(0, 4).map((benefit: string, index: number) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}