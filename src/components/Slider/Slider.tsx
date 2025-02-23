'use client'

import Link from "next/link";
import styles from "./Slider.module.scss";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import Hammer from "hammerjs";

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
        pauseAfterInteraction: number; // Nuevo atributo en ms
    };
} 

const Slider = (sliderProps: SliderProps) => {
    const sliderRef = useRef<HTMLUListElement>(null);
    const controls = useRef<HTMLDivElement>(null);

    const [slideIndex, setSlideIndex] = useState(0);
    const currentSlideRef = useRef(0);
    const totalSlides = sliderProps.slides.length;

    // Ref para registrar si el usuario interactuó.
    const userInteractedRef = useRef(false);

    let q: gsap.utils.SelectorFunc;

    useEffect(() => {
        q = gsap.utils.selector(sliderRef.current);
        // Iniciamos animando el slide 0
        animateSlide(0);

        if (sliderRef.current) {
            const hammer = new Hammer(sliderRef.current);
            hammer.on("swipeleft", handleSwipeLeft);
            hammer.on("swiperight", handleSwipeRight);
            // Cleanup on unmount
            return () => {
              hammer.off("swipeleft", handleSwipeLeft);
              hammer.off("swiperight", handleSwipeRight);
            };
        }
    }, []);

    useEffect(() => {
        console.log('slideIndex updated:', slideIndex);
    }, [slideIndex]);

    // Efecto para autoplay: se programa una transición automática cada vez que cambia el slide.
    // Si el usuario interactuó, se usará el delay definido en pauseAfterInteraction.
    // Si pauseAfterInteraction es -1, se interrumpe el autoplay.
    useEffect(() => {
        if (sliderProps.settings.autoplay) {
            let delay = sliderProps.settings.duration;
            if (userInteractedRef.current) {
                if (sliderProps.settings.pauseAfterInteraction === -1) {
                    // Autoplay se rompe: no se programa el timer.
                    return;
                }
                delay = sliderProps.settings.pauseAfterInteraction;
                // Reseteamos la bandera para futuras transiciones.
                userInteractedRef.current = false;
            }
            const timer = setTimeout(() => {
                if (!sliderProps.settings.loop && currentSlideRef.current === totalSlides - 1) {
                    return;
                }
                const nextIndex = currentSlideRef.current < totalSlides - 1 
                    ? currentSlideRef.current + 1 
                    : 0;
                getNewSlide(nextIndex);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [
        slideIndex, 
        sliderProps.settings.autoplay, 
        sliderProps.settings.loop, 
        sliderProps.settings.duration, 
        sliderProps.settings.pauseAfterInteraction, 
        totalSlides
    ]);

    const handleSwipeLeft = () => {
        // Marca la interacción del usuario.
        userInteractedRef.current = true;
        const newIndex = currentSlideRef.current < totalSlides - 1 
            ? currentSlideRef.current + 1 
            : 0;
        console.log("Swipe left: current index:", currentSlideRef.current, "new index:", newIndex);
        getNewSlide(newIndex);
    };

    const handleSwipeRight = () => {
        // Marca la interacción del usuario.
        userInteractedRef.current = true;
        const newIndex = currentSlideRef.current > 0 
            ? currentSlideRef.current - 1 
            : totalSlides - 1;
        console.log("Swipe right: current index:", currentSlideRef.current, "new index:", newIndex);
        getNewSlide(newIndex);
    };

    const animateSlide = (idxToAnimate: number) => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Reactivamos las interacciones al finalizar la animación.
                gsap.set(sliderRef.current, { pointerEvents: 'all' });
                gsap.set(controls.current, { pointerEvents: 'all' });
            }
        });
        console.log('Animating slide:', idxToAnimate);

        setSlideIndex(idxToAnimate);

        tl.set(q(`[data-idx="${idxToAnimate}"]`), { display: 'block' });
        tl.set(q(`[data-idx="${idxToAnimate}"] .img`), { scale: 1.1, opacity: 0 });
        tl.set(q(`[data-idx="${idxToAnimate}"] .heading`), { opacity: 0, x: '-10px' });
        tl.set(q(`[data-idx="${idxToAnimate}"] .description`), { opacity: 0, x: '-10px' });
        tl.set(q(`[data-idx="${idxToAnimate}"] .cta`), { opacity: 0, y: '20px' });

        tl.to(q(`[data-idx="${idxToAnimate}"] .img`), { duration: 2, opacity: 1, scale: 1, ease: "power2.out" });
        tl.to(q(`[data-idx="${idxToAnimate}"] .heading`), { duration: 1, opacity: 1, x: 0, ease: "power2.out" }, "-=1.5");
        tl.to(q(`[data-idx="${idxToAnimate}"] .description`), { duration: 1, opacity: 1, x: 0, ease: "power2.out" }, "-=1.0");
        tl.to(q(`[data-idx="${idxToAnimate}"] .cta`), { duration: 1, opacity: 1, y: 0, ease: "power2.out" }, "-=0.5");
    };

    const getNewSlide = (newSlideIdx: number) => {
        console.log('getNewSlide(): newSlideIdx =', newSlideIdx);
        q = gsap.utils.selector(sliderRef.current);

        if (newSlideIdx === currentSlideRef.current) return;

        // Desactivamos las interacciones durante la transición.
        gsap.set(sliderRef.current, { pointerEvents: 'none' });
        gsap.set(controls.current, { pointerEvents: 'none' });

        const tl = gsap.timeline();
        tl.to(q(`[data-idx="${currentSlideRef.current}"] .cta`), { duration: 0.25, opacity: 0, y: '10px', ease: "power1.in" }, "-=0");
        tl.to(q(`[data-idx="${currentSlideRef.current}"] .description`), { duration: 0.25, opacity: 0, x: '-10px', ease: "power1.in" }, "-=0.1");
        tl.to(q(`[data-idx="${currentSlideRef.current}"] .heading`), { duration: 0.25, opacity: 0, x: '-10px', ease: "power1.in" }, "-=0.05");
        tl.to(q(`[data-idx="${currentSlideRef.current}"] .img`), { duration: 0.25, opacity: 0, ease: "power1.in" }, "-=0.025");
        tl.call(() => {
            currentSlideRef.current = newSlideIdx;
            animateSlide(newSlideIdx);
        }, [], "-=0.25");
    };

    return (
        <div className={styles['slider']}>
            <ul className={styles['slides-wrap']} ref={sliderRef}>
                {sliderProps.slides.map((slide, index) => (
                    <li key={index} className={`${styles['slide']} slide-item`} data-idx={index}>
                        <img className={`${styles['main-img']} img`} src={slide.image} alt={slide.title} />
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
                            // Marca la interacción del usuario
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