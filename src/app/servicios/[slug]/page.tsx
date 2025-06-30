import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllServiceSlugs, getServiceBySlug } from '../../../../lib/markdown';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
  const service = await getServiceBySlug(params.slug);
  
  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {service.badge && (
            <div className="mb-4 inline-block bg-emerald-100 text-emerald-800 px-3 py-1 text-sm font-medium">
              {service.badge}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">{service.title}</h1>
          {service.price && (
            <div className="flex items-center justify-center gap-2 mb-6">
              {service.pricePrefix && (
                <span className="text-2xl md:text-3xl font-semibold text-slate-600">{service.pricePrefix}</span>
              )}
              <span className="text-4xl md:text-5xl font-bold text-emerald-600">{service.price}</span>
              {service.priceSuffix && (
                <span className="text-2xl md:text-3xl font-semibold text-slate-600">{service.priceSuffix}</span>
              )}
            </div>
          )}
          {service.subtitle && (
            <h2 className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              {service.subtitle}
            </h2>
          )}
          {service.intro && (
            <p className="text-lg text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              {service.intro}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contacto"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 font-medium transition-colors inline-block"
            >
              Solicitar Consulta
            </Link>
            <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-3 font-medium transition-colors">
              Ver Precios Detallados
            </button>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      {service.challenges && service.challenges.length > 0 && (
        <section className="bg-slate-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                El Desafío del Cumplimiento Fiscal en Costa Rica
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.challenges.map((challenge: string, index: number) => (
                  <div key={index} className="bg-white p-4 shadow-sm border-l-4 border-l-red-500">
                    <p className="text-slate-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {service.services && service.services.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                Nuestro Servicio Integral de Gestión Fiscal
              </h2>

              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                {service.services.map((serviceItem: any, index: number) => (
                  <div key={index} className="bg-white shadow-lg p-6 h-fit">
                    <div className="flex items-center gap-2 mb-4">
                      <i className={`${iconMap[serviceItem.icon] || 'fas fa-cog'} w-6 h-6 text-emerald-600 text-xl`}></i>
                      <h3 className="text-xl font-bold">{serviceItem.title}</h3>
                    </div>
                    <div className="space-y-4">
                      {serviceItem.sections?.map((section: any, sectionIndex: number) => (
                        <div key={sectionIndex}>
                          <h4 className="font-semibold text-slate-900 mb-2">{section.name}</h4>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {section.items?.map((item: string, itemIndex: number) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                          {sectionIndex < serviceItem.sections.length - 1 && (
                            <hr className="my-4 border-slate-200" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sector Specialization */}
              {service.sectors && service.sectors.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Especialización por Sector</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {service.sectors.map((sector: any, index: number) => (
                      <div key={index} className="bg-white shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="flex justify-center mb-4">
                          <i className={`${iconMap[sector.icon] || 'fas fa-cog'} text-emerald-600 text-4xl`}></i>
                        </div>
                        <h4 className="text-lg font-bold mb-3">{sector.title}</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
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
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Precios por Complejidad</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {service.pricing.map((plan: any, index: number) => (
                  <div key={index} className={`relative bg-white shadow-lg p-6 ${plan.popular ? 'border-emerald-500 border-2' : 'border border-slate-200'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-3 py-1 text-sm font-medium">
                        Más Popular
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-emerald-600 mb-2">
                        {plan.price}
                        <span className="text-lg text-slate-600">/mes</span>
                      </div>
                      <p className="text-slate-600">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features?.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <i className="fas fa-check-circle text-emerald-600 mt-1 text-sm"></i>
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 px-4 font-medium transition-colors ${
                      plan.popular 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'border border-slate-300 hover:bg-slate-50 text-slate-700'
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Garantías y Compromisos</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {service.guarantees.map((guarantee: any, index: number) => (
                  <div key={index} className="bg-white shadow-lg p-6 border-l-4 border-l-emerald-500">
                    <div className="flex items-center gap-2 mb-4">
                      <i className={`${iconMap[guarantee.icon] || 'fas fa-check'} text-emerald-600 text-xl`}></i>
                      <h3 className="text-xl font-bold">{guarantee.title}</h3>
                    </div>
                    <ul className="space-y-2 text-slate-700">
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
      <section className="bg-emerald-600 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              {service.ctaTitle || "¿Necesita este servicio?"}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {service.ctaDescription || "Contáctenos para obtener más información y una cotización personalizada adaptada a sus necesidades específicas."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="tel:+50625703400"
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                <i className="fas fa-phone"></i>
                Llamar Ahora
              </Link>
              <Link 
                href="/contacto"
                className="border border-white hover:bg-white hover:text-emerald-600 text-white px-8 py-3 font-medium transition-colors inline-block"
              >
                Solicitar Cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="bg-slate-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {service.features && service.features.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">Características del Servicio</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    {service.features.slice(0, 4).map((feature: string, index: number) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              {service.included && service.included.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">¿Qué Incluye?</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    {service.included.slice(0, 4).map((item: string, index: number) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">Beneficios</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
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