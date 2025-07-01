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
  const isAnimatingRef = useRef(false);

  // Store GSAP selector and active timelines for proper cleanup
  const qRef = useRef<gsap.utils.SelectorFunc | null>(null);
  const activeTimelines = useRef<gsap.core.Timeline[]>([]);

  // Function to kill all active animations
  const killAllAnimations = useCallback(() => {
    // Kill all active timelines
    activeTimelines.current.forEach(tl => {
      if (tl) {
        tl.kill();
      }
    });
    activeTimelines.current = [];
    
    // Kill any remaining tweens on slider elements
    if (qRef.current && sliderRef.current) {
      gsap.killTweensOf(qRef.current('*'));
      // Reset any slides that might be mid-fade to full opacity and proper z-index
      gsap.set(qRef.current('.slide-item'), { opacity: 1 });
      // Ensure currently active slide has highest z-index
      gsap.set(qRef.current('.slide-item'), { zIndex: 1 });
      gsap.set(qRef.current(`[data-idx="${currentSlideRef.current}"]`), { zIndex: 10 });
    }
    
    isAnimatingRef.current = false;
  }, []);

  // Initialize selector and animate first slide
  useEffect(() => {
    qRef.current = gsap.utils.selector(sliderRef.current);
    animateSlide(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to animate slide entrance
  const animateSlide = useCallback((idxToAnimate: number) => {
    if (!qRef.current) return;
    
    isAnimatingRef.current = true;
    
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        // Remove this timeline from active timelines
        activeTimelines.current = activeTimelines.current.filter(timeline => timeline !== tl);
      }
    });
    
    // Add to active timelines for cleanup management
    activeTimelines.current.push(tl);
    
    setSlideIndex(idxToAnimate);

    // Ensure proper z-index layering
    tl.set(qRef.current('.slide-item'), { display: 'none', zIndex: 1 });
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"]`), { display: 'block', zIndex: 10 });
    
    // Set initial states for animation
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"] .img`), { scale: 1.1, opacity: 0 });
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"] .heading`), { opacity: 0, x: '-10px' });
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"] .description`), { opacity: 0, x: '-10px' });
    tl.set(qRef.current(`[data-idx="${idxToAnimate}"] .cta`), { opacity: 0, y: '20px' });
    
    // Animate elements in
    tl.to(qRef.current(`[data-idx="${idxToAnimate}"] .img`), { duration: 2, opacity: 1, scale: 1, ease: "power2.out" });
    tl.to(qRef.current(`[data-idx="${idxToAnimate}"] .heading`), { duration: 1, opacity: 1, x: 0, ease: "power2.out" }, "-=1.5");
    tl.to(qRef.current(`[data-idx="${idxToAnimate}"] .description`), { duration: 1, opacity: 1, x: 0, ease: "power2.out" }, "-=1.0");
    tl.to(qRef.current(`[data-idx="${idxToAnimate}"] .cta`), { duration: 1, opacity: 1, y: 0, ease: "power2.out" }, "-=0.5");
  }, []);

  // Function to transition from current slide to new slide
  const getNewSlide = useCallback((newSlideIdx: number) => {
    if (!qRef.current) return;
    if (newSlideIdx === currentSlideRef.current) return;

    // Kill all existing animations immediately to prevent overlap
    killAllAnimations();
    
    const oldSlideIdx = currentSlideRef.current;
    
    // Update the current slide reference immediately
    currentSlideRef.current = newSlideIdx;
    
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        // Hide the old slide only after transition is complete
        if (qRef.current) {
          gsap.set(qRef.current(`[data-idx="${oldSlideIdx}"]`), { display: 'none' });
          // Reset z-index for all slides and ensure new slide is on top
          gsap.set(qRef.current('.slide-item'), { zIndex: 1 });
          gsap.set(qRef.current(`[data-idx="${newSlideIdx}"]`), { zIndex: 10 });
        }
        isAnimatingRef.current = false;
        // Remove this timeline from active timelines
        activeTimelines.current = activeTimelines.current.filter(timeline => timeline !== tl);
      }
    });
    
    // Add to active timelines for cleanup management
    activeTimelines.current.push(tl);
    
    setSlideIndex(newSlideIdx);
    
    // Set up proper z-index layering for crossfade
    // Reset all slides to low z-index first
    tl.set(qRef.current('.slide-item'), { zIndex: 1 });
    
    // Show the new slide and prepare it for animation (behind the old slide initially)
    tl.set(qRef.current(`[data-idx="${newSlideIdx}"]`), { display: 'block', zIndex: 5 });
    tl.set(qRef.current(`[data-idx="${oldSlideIdx}"]`), { zIndex: 8 }); // Keep old slide on top initially
    
    // Set initial states for the new slide (invisible, ready to animate)
    tl.set(qRef.current(`[data-idx="${newSlideIdx}"] .img`), { scale: 1.1, opacity: 0 });
    tl.set(qRef.current(`[data-idx="${newSlideIdx}"] .heading`), { opacity: 0, x: '-10px' });
    tl.set(qRef.current(`[data-idx="${newSlideIdx}"] .description`), { opacity: 0, x: '-10px' });
    tl.set(qRef.current(`[data-idx="${newSlideIdx}"] .cta`), { opacity: 0, y: '20px' });
    
    // Crossfade: fade out old slide while fading in new slide
    tl.to(qRef.current(`[data-idx="${oldSlideIdx}"]`), { 
      duration: 0.6, 
      opacity: 0, 
      ease: "power2.inOut" 
    });
    
    // Bring new slide to front early in the crossfade
    tl.set(qRef.current(`[data-idx="${newSlideIdx}"]`), { zIndex: 10 }, "-=0.3");
    
    // Animate the new slide elements in with staggered timing
    tl.to(qRef.current(`[data-idx="${newSlideIdx}"] .img`), { 
      duration: 1.5, 
      opacity: 1, 
      scale: 1, 
      ease: "power2.out" 
    }, "-=0.4"); // Start before old slide fully fades
    
    tl.to(qRef.current(`[data-idx="${newSlideIdx}"] .heading`), { 
      duration: 0.8, 
      opacity: 1, 
      x: 0, 
      ease: "power2.out" 
    }, "-=1.0");
    
    tl.to(qRef.current(`[data-idx="${newSlideIdx}"] .description`), { 
      duration: 0.8, 
      opacity: 1, 
      x: 0, 
      ease: "power2.out" 
    }, "-=0.6");
    
    tl.to(qRef.current(`[data-idx="${newSlideIdx}"] .cta`), { 
      duration: 0.8, 
      opacity: 1, 
      y: 0, 
      ease: "power2.out" 
    }, "-=0.4");
  }, [killAllAnimations]);

  // Cleanup function to kill all animations on unmount
  useEffect(() => {
    return () => {
      killAllAnimations();
    };
  }, [killAllAnimations]);

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

  // Use react-swipeable to detect swipe gestures
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
    trackMouse: true // Allow mouse swipes on desktop
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
