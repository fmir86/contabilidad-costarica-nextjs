import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { getAllServices } from '../../../lib/markdown';
import styles from '@/styles/servicios.module.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata: Metadata = {
  title: 'Contabilidad Costa Rica | Servicios',
  description: 'Ofrecemos una gran gama de servicios contables y financieros a la medida. Para la pequeña empresa y el profesional independiente.',
};

const Servicios: React.FC = () => {
  // Obtener servicios desde archivos markdown
  const services = getAllServices();

  return (
    <section className={styles['services']}>

      <h1 className="inner-page-title">Servicios</h1>

      <h2 className='centered'>Le ofrecemos ayuda en las siguientes areas</h2>

      <p className={styles['centered']}>Como parte de un servicio integral, ponemos a su disposición una amplia gama de servicios contables y financieros.</p>

      <div className={styles['services-grid']}>
        {services.map((service) => (
          <div className={`${styles['card']}`} key={service.slug}>
            <div className={`${styles['image']}`}>
              <Link href={`/servicios/${service.slug}`}>
                <img src={service.imgsrc || '/images/servicios/default-service.jpg'} alt={service.title} />
              </Link>
            </div>
            <div className={`${styles['content']}`}>
              <h3 className={`${styles['title']}`}>
                <Link href={`/servicios/${service.slug}`}>{service.title}</Link>
              </h3>
              <div className={`${styles['description']}`}>{service.description}</div>
              {service.price && (
                <div className={`${styles['price']}`}>
                  {service.price}
                </div>
              )}
              <div className={`${styles['read-more']}`}>
                <Link href={`/servicios/${service.slug}`}>
                  Leer Más <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;