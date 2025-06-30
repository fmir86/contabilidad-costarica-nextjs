import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { getAllServices } from '../../../lib/markdown';
import styles from '@/styles/servicios.module.scss';

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
          <Link href={`/servicios/${service.slug}`} key={service.slug} className={`${styles['card']}`}>
            <div className={`${styles['image']}`}>
              <img src={service.imgsrc || '/images/servicios/default-service.jpg'} alt={service.title} />
            </div>
            <div className={`${styles['content']}`}>
              <h3 className={`${styles['title']}`}>
                {service.title}
              </h3>
              <div className={`${styles['description']}`}>{service.description}</div>
              {service.price && (
                <div className={`${styles['price']}`} style={{
                  marginTop: '1rem',
                  fontWeight: 'bold',
                  color: '#007bff'
                }}>
                  {service.price}
                </div>
              )}
              <div className={`${styles['learn-more']}`} style={{
                marginTop: '1rem',
                color: '#007bff',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                Ver detalles →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Servicios;