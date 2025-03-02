"use client"

import Link from "next/link";
import styles from "./Slider.module.scss";
import gsap from "gsap";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

interface Slide {
  image: string;
  title: string;
  description: string;
  cta: {
    label: string;
    url: string;
    target: string;
  }
}
  
interface SliderProps {
  slides: Slide[];
  settings: {
    duration: number;
    autoplay: boolean;
    loop: boolean;
    pauseAfterInteraction: number; // en ms; si es -1, se desactiva el autoplay permanentemente
  };
} 

const Slider = (sliderProps: SliderProps) => {
  const sliderRef = useRef<HTMLUListElement>(null);
  const controls = useRef<HTMLDivElement>(null);

  const [slideIndex, setSlideIndex] = useState(0);
  const currentSlideRef = useRef(0);
  const totalSlides = sliderProps.slides.length;
  const userInteractedRef = useRef(false);

  // Almacenamos el selector de GSAP en un ref para conservarlo entre renders
  const qRef = useRef<gsap.utils.SelectorFunc | null>(null);

  // Inicializamos el selector y animamos el primer slide
  useEffect(() => {
    qRef.current = gsap.utils.selector(sliderRef.current);
    animateSlide(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Función para animar la entrada de un slide
  const animateSlide = useCallback((idxToAnimate: number) => {
    if (!qRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(sliderRef.current, { pointerEvents: 'all' });
        gsap.set(controls.current, { pointerEvents: 'all' });
      }
    });
    //console.log('Animating slide:', idxToAnimate);
    setSlideIndex(idxToAnimate);

    tl.set(qRef.current(`[data-idx="${idxToAnimate}"]`), { display: 'block' });
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"] .img`), { scale: 1.1, opacity: 0 });
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"] .heading`), { opacity: 0, x: '-10px' });
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"] .description`), { opacity: 0, x: '-10px' });
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"] .cta`), { opacity: 0, y: '20px' });
    tl.to(qRef.current(`[data-idx="${idxToAnimate}"] .img`), { duration: 2, opacity: 1, scale: 1, ease: "power2.out" });
    tl.to(qRef.current(`[data-idx="${idxToAnimate}"] .heading`), { duration: 1, opacity: 1, x: 0, ease: "power2.out" }, "-=1.5");
    tl.to(qRef.current(`[data-idx="${idxToAnimate}"] .description`), { duration: 1, opacity: 1, x: 0, ease: "power2.out" }, "-=1.0");
    tl.to(qRef.current(`[data-idx="${idxToAnimate}"] .cta`), { duration: 1, opacity: 1, y: 0, ease: "power2.out" }, "-=0.5");
  }, []);

  // Función para animar la salida del slide actual y la entrada del nuevo
  const getNewSlide = useCallback((newSlideIdx: number) => {
    if (!qRef.current) return;
    //console.log('getNewSlide(): newSlideIdx =', newSlideIdx);
    if (newSlideIdx === currentSlideRef.current) return;

    gsap.set(sliderRef.current, { pointerEvents: 'none' });
    gsap.set(controls.current, { pointerEvents: 'none' });

    const tl = gsap.timeline();
    tl.to(qRef.current(`[data-idx="${currentSlideRef.current}"] .cta`), { duration: 0.25, opacity: 0, y: '10px', ease: "power1.in" }, "-=0");
    tl.to(qRef.current(`[data-idx="${currentSlideRef.current}"] .description`), { duration: 0.25, opacity: 0, x: '-10px', ease: "power1.in" }, "-=0.1");
    tl.to(qRef.current(`[data-idx="${currentSlideRef.current}"] .heading`), { duration: 0.25, opacity: 0, x: '-10px', ease: "power1.in" }, "-=0.05");
    tl.to(qRef.current(`[data-idx="${currentSlideRef.current}"] .img`), { duration: 0.25, opacity: 0, ease: "power1.in" }, "-=0.025");
    tl.call(() => {
      currentSlideRef.current = newSlideIdx;
      animateSlide(newSlideIdx);
    }, [], "-=0.25");
  }, [animateSlide]);

  // Autoplay: cada vez que cambia slideIndex se programa la transición
  useEffect(() => {
    if (sliderProps.settings.autoplay) {
      let delay = sliderProps.settings.duration;
      if (userInteractedRef.current) {
        if (sliderProps.settings.pauseAfterInteraction === -1) {
          // Se desactiva el autoplay
          return;
        }
        delay = sliderProps.settings.pauseAfterInteraction;
        userInteractedRef.current = false;
      }
      const timer = setTimeout(() => {
        if (!sliderProps.settings.loop && currentSlideRef.current === totalSlides - 1) {
          return;
        }
        const nextIndex =
          currentSlideRef.current < totalSlides - 1
            ? currentSlideRef.current + 1
            : 0;
        getNewSlide(nextIndex);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [
    slideIndex, 
    sliderProps.settings, 
    totalSlides, 
    getNewSlide
  ]);

  // Usamos react-swipeable para detectar gestos de swipe
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      userInteractedRef.current = true;
      const newIndex = currentSlideRef.current < totalSlides - 1 
          ? currentSlideRef.current + 1 
          : 0;
      getNewSlide(newIndex);
    },
    onSwipedRight: () => {
      userInteractedRef.current = true;
      const newIndex = currentSlideRef.current > 0 
          ? currentSlideRef.current - 1 
          : totalSlides - 1;
      getNewSlide(newIndex);
    },
    trackMouse: true // Permite detectar swipes con el ratón en escritorio
  });

  return (
    <div className={styles['slider']} {...swipeHandlers}>
      <ul className={styles['slides-wrap']} ref={sliderRef}>
        {sliderProps.slides.map((slide, index) => (
          <li key={index} className={`${styles['slide']} slide-item`} data-idx={index}>
            
            <Image 
                className={`${styles['main-img']} img`} 
                src={slide.image} 
                alt={slide.title} 
                width={'1920'}
                height={'800'}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : index === 1 ? "low" : "auto"}
                sizes="100vw"
            />

            <div className={styles['content']}>
              <p className={`${styles['heading']} heading`}>{slide.title}</p>
              <p className={`${styles['description']} description`}>{slide.description}</p>
              {slide.cta && (
                <Link
                  href={slide.cta.url}
                  target={slide.cta.target}
                  className={`${styles['cta']} cta`}
                >
                  {slide.cta.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className={styles['controls']} ref={controls}>
        {sliderProps.slides.map((slide, index) => (
          <button
            key={index}
            className={`${styles['square-btn']} ${index === slideIndex ? styles['active'] : ''}`}
            data-idx={index}
            onClick={() => {
              userInteractedRef.current = true;
              getNewSlide(index);
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
