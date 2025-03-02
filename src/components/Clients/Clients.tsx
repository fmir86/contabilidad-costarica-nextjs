'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import styles from './Clients.module.scss';
import useEmblaCarousel from 'embla-carousel-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ClientItem {
  id?: number;
  srcimg: string;
  title: string;
  category: string;
}

interface ClientsProps {
  itemsPerView?: number;
}

const Clients: React.FC<ClientsProps> = ({ itemsPerView = 3 }) => {
  const clientsList: ClientItem[] = [
    {
      id: 1,
      srcimg: '/images/home-clients/olman.jpg',
      title: 'Distribuidora Olman',
      category: 'Materiales de Construcción'
    },
    {
      id: 2,
      srcimg: '/images/home-clients/fabian-miranda.jpg',
      title: 'Fabian Miranda',
      category: 'Informática y Desarrollo Web'
    },
    {
      id: 3,
      srcimg: '/images/home-clients/muebles-finos.jpg',
      title: 'Muebles Finos',
      category: 'Fabricante de Muebles'
    },
    {
      id: 4,
      srcimg: '/images/home-clients/caribean.jpg',
      title: 'Caribbean Veneer Company',
      category: 'Fabricación de Plywood'
    },
    {
      id: 5,
      srcimg: '/images/home-clients/tracy.jpg',
      title: 'Tracy Lizano',
      category: 'Psicología y Terapia'
    }
  ];

  // Initialize Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 }
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.clientsSection}>
      <div className={styles.clientsContainer}>
        <h2 className={styles.clientsTitle}>Nuestros Clientes</h2>
        
        <div className={styles.carouselWrapper}>
          <div className={styles.viewport} ref={emblaRef}>
            <div className={styles.container}>
              {clientsList.map((client) => (
                <div 
                  key={client.id} 
                  className={styles.clientCard}
                >
                  <div className={styles.clientImageContainer}>
                    <Image
                      src={client.srcimg}
                      alt={client.title}
                      width={400}
                      height={300}
                      className={styles.clientImage}
                    />
                    <div className={styles.clientOverlay}>
                      <h3 className={styles.clientTitle}>{client.title}</h3>
                      <p className={styles.clientCategory}>{client.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.sliderControls}>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button 
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;