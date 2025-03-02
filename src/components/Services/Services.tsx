"use client";

import React from 'react';
import styles from './Services.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileInvoice, faSeedling, faSliders } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface ServiceItem {
  icon: IconDefinition;
  title: string;
  description: string;
}

const Services: React.FC = () => {
  const serviceItems: ServiceItem[] = [
    {
      icon: faSeedling,
      title: 'Soporte para MiPymes',
      description: 'Paquetes de servicios diseñados para las necesidades de las micro, pequeñas y medianas empresas. Contabilidad, impuestos, pago de planilla y asesoría financiera.'
    },
    {
      icon: faFileInvoice,
      title: 'Estados Financieros',
      description: 'Elaboración de estados financieros, como balance general, estado de resultados, flujo de efectivo y otros reportes financieros.'
    },
    {
      icon: faSliders,
      title: 'Servicios a la medida',
      description: 'Servicios personalizados para las necesidades de su empresa. Actuamos como una extensión de su equipo de trabajo.'
    }
  ];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesContainer}>
        
        <h2 className={styles.servicesTitle}>Nuestros Servicios</h2>
        
        <div className={styles.servicesGrid}>
          {serviceItems.map((service, index) => (
            <div key={index} className={styles.serviceCard}>

              <div className={styles.serviceIcon}>
                <div className={styles.iconContainer}>
                  <FontAwesomeIcon icon={service.icon} className={styles.faIcon} />
                </div>
              </div>
              <div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href="/servicios" className="green-cta">
          Ver todos los Servicios
      </Link>

    </section>
  );
};

export default Services;