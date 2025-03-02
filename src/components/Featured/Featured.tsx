'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Featured.module.scss';

const FEATURED_ITEMS = [
  {
    id: 1,
    image: '/images/profesionalismo.jpg',
    title: 'Profesionalismo',
    description: 'Contamos con un equipo de profesionales altamente calificados.',
  },
  {
    id: 2,
    image: '/images/experiencia.jpg',
    title: 'Experiencia',
    description: 'Más de 30 años trabajando para empresas de diversas industrias y tamaños nos respaldan.',
  },
  {
    id: 3,
    image: '/images/responsabilidad.jpg',
    title: 'Responsabilidad',
    description: 'Cumplir nuestros compromisos con nuestros clientes es nuestra máxima prioridad.',
  },
];

const Featured: React.FC = () => {
  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>

        <h1>Su Solucion Contable de Confianza</h1>

        <div className={styles.row}>
          {FEATURED_ITEMS.map((item) => (
            <div key={item.id} className={styles.itemWrapper}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              
              <div className={styles.content}>

                <div className={styles.title}>
                  <h3>
                    {item.title}
                  </h3>
                </div>

                <div className={styles.description}>{item.description}</div>
                <div>
                  <Link href="/sobre-nosotros" className={styles.button}>
                    LEER MÁS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;