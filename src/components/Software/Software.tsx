'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './Software.module.scss';

interface Logo {
  src: string;
  alt: string;
}

const Software: React.FC = () => {
  const logos: Logo[] = [
    { src: '/images/software/contaweb.png', alt: 'Contaweb' },
    { src: '/images/software/office.png', alt: 'Microsoft Office' },
    { src: '/images/software/google-docs.png', alt: 'Google Docs' },
    { src: '/images/software/monica.png', alt: 'Monica' },
    { src: '/images/software/quickbooks.png', alt: 'Quickbooks' },
    { src: '/images/software/atv.png', alt: 'Administración Tributaria Virtual' }
  ];

  // Set up the carousel with a loop and one slide scroll per action.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  // Autoplay: scroll to the next slide every 3 seconds.

  useEffect(() => {
    if (!emblaApi) return;

    let intervalId: ReturnType<typeof setInterval>;

    const assignInterval = () => {
        intervalId = setInterval(() => {
            emblaApi.scrollNext();
        }, 4000);
    }

    const resetInterval = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                emblaApi.scrollNext();
            }, 4000);
        }
    };

    assignInterval();
    // When the user interacts with the carousel, clear the autoplay.
    
    emblaApi.on('pointerDown', resetInterval);

    return () => {
        clearInterval(intervalId);
        emblaApi.off('pointerDown', resetInterval);
    }
  }, [emblaApi]);

  return (
    <section className={styles.softwareSection}>
      <div className={styles.softwareContainer}>
        
        <h2 className={styles.sectionTitle}>Soluciones Informáticas</h2>  

        <div className={styles.carouselWrapper}>
          <div className={styles.viewport} ref={emblaRef}>
            <div className={styles.container}>
              {logos.map((logo, idx) => (
                <div 
                  key={idx} 
                  className={styles.logoCont}
                >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={300}
                      height={100}
                    />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Software;
