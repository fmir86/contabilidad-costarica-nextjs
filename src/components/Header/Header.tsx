"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Header = () => {
    const pathname = usePathname();
    const mainNav = useRef<HTMLElement>(null);

    const expandMobileMenu = () => {
        const q = gsap.utils.selector(mainNav.current);

        if(!mainNav.current?.classList.contains(styles['expanded'])) {
            mainNav.current?.classList.add(styles['expanded']);
            document.body.classList.add('no-scroll');

            gsap.set(q('ul'), {opacity:0});
            gsap.to(q('ul'), {duration:0.3, opacity:1});
            gsap.set(q('li'), {opacity:0, y:-5});
            gsap.to(q('li'), {duration:0.3, opacity:1, y:0, stagger:0.05});
            // Hamburger
            toggleHamburger('open');

        }else{
            document.body.classList.remove('no-scroll');
            gsap.to(q('li'), {duration:0.3, opacity:0, y:-5, stagger: { each: 0.05, from: 'end' }});
            gsap.to(q('ul'), {duration:0.3, opacity:0, onComplete: () => {
                mainNav.current?.classList.remove(styles['expanded']);
            }});
            // Hamburger
            toggleHamburger('close');
            
        }
    }

    const collapseMobileMenu = () => {
        if(!mainNav.current?.classList.contains(styles['expanded'])) return;
        setTimeout(() => expandMobileMenu(), 500);
    }

    const toggleHamburger = (action:string) => {
        console.log(`Hamburger action: ${action}`);
        const q = gsap.utils.selector(mainNav.current);
        if(action === 'open') {
            gsap.to(q(`span.center`), {duration:0.1, scaleX:0, opacity:0, ease: 'sine.out'});
            gsap.to(q(`span.top`), {duration:0.1, rotate:225, y:11, x:0, ease: 'sine.out'});
            gsap.to(q(`span.bottom`), {duration:0.1, rotate:-225, y:-11, x:0, ease: 'sine.out'});
        }else if(action === 'close') {
            gsap.to(q(`span.center`), {duration:0.1, scaleX:1, opacity:1, ease: 'sine.out'});
            gsap.to(q(`span.top`), {duration:0.1, rotate:0, y:0, x:0, ease: 'sine.out'});
            gsap.to(q(`span.bottom`), {duration:0.1, rotate:0, y:0, x:0, ease: 'sine.out'});

        }
    }

    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
    
        const handleMediaChange = (e: MediaQueryListEvent) => {
          if (e.matches) {
            mainNav.current?.classList.remove(styles['expanded']);
            document.body.classList.remove('no-scroll');
            toggleHamburger('close');
          }
        };
        
        mediaQuery.addEventListener("change", handleMediaChange);
        return () => mediaQuery.removeEventListener("change", handleMediaChange);
      }, []);

    return (
        <header className={styles['main-header']}>

            <nav className={styles['contact-row']}>
                <ul>
                    <li className={styles['phone']}>
                        <Link href="tel:5068594 9097">
                            <FontAwesomeIcon icon={faPhone} size="1x" />
                            <span>LLámenos: (+506) 8594 9097</span>
                        </Link>
                    </li>
                    <li className={styles['email']}>
                        <Link href="mailto:info@contabilidadcostarica.net">
                            <FontAwesomeIcon icon={faEnvelope} size="1x" />
                            <span>Email: info@contabilidadcostarica.net</span>
                        </Link>
                    </li>
                    <li className={styles['whatsapp']}>
                        <Link href="https://wa.me/50685949097?text=Hola%2C%20acabo%20de%20visitar%20el%20sitio%20web%20y%20estoy%20interesado%20en%20los%20servicios%20que%20ofrecen">
                            <FontAwesomeIcon icon={faWhatsapp} size="1x" /> <span>Whatsapp</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <nav className={styles['main-row']} ref={mainNav}>
                <div className={styles['wrapper']}>
                    <Link href="/" className={styles['logo']}>
                        <Image src="/images/contabilidadcr-logo.svg" alt="Contabilidad Costa Rica" width={240} height={56} data-width={157} data-height={29}/>
                    </Link>

                    <ul>
                        <li>
                            <Link href="/" className={isActiveLink('/') ? styles['active'] : ''} onClick={ collapseMobileMenu }>
                                INICIO
                            </Link>
                        </li>
                        <li>
                            <Link href="/sobre-nosotros" className={isActiveLink('/sobre-nosotros') ? styles['active'] : ''} onClick={ collapseMobileMenu }>
                                SOBRE NOSOTROS
                            </Link>
                        </li>
                        <li>
                            <Link href="/servicios" className={isActiveLink('/servicios') ? styles['active'] : ''} onClick={ collapseMobileMenu }>
                                SERVICIOS
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className={isActiveLink('/blog') ? styles['active'] : ''} onClick={ collapseMobileMenu }>
                                BLOG
                            </Link>
                        </li>
                        <li>
                            <Link href="/contacto" className={isActiveLink('/contacto') ? styles['active'] : ''} onClick={ collapseMobileMenu }>
                                CONTACTO
                            </Link>
                        </li>
                    </ul>

                    <button className={styles['hamburger-mobile']} onClick={expandMobileMenu}>
                        <span className='top'></span>
                        <span className='center'></span>
                        <span className='bottom'></span>
                    </button>

                </div>
            </nav>

        </header>
    );

};

export default Header;