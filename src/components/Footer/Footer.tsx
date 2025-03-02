"use client";

import React from 'react';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope,faPhone,faLocationDot} from '@fortawesome/free-solid-svg-icons';

import styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      {/* CONTACT ROW */}
      <div className={styles['contact-row']}>
        <ul className={styles['contact-list']}>
          <li>
            <Link href="mailto:info@contabilidadcostarica.net">
              <span className={styles['icon-circle']}>
                <FontAwesomeIcon icon={faEnvelope} size="1x" />
              </span>
              info@contabilidadcostarica.net
            </Link>
          </li>
          <li>
            <Link href="tel:+50685949097">
              <span className={styles['icon-circle']}>
                <FontAwesomeIcon icon={faPhone} size="1x" />
              </span>
              +506 85949097
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className={styles['icon-circle']}>
                <FontAwesomeIcon icon={faLocationDot} size="1x" />
              </span>
              Pará de Santo Domingo de Heredia, Costa Rica
            </Link>
          </li>
        </ul>
      </div>

      {/* MAIN ROW */}
      <div className={styles['main-row']}>
        {/* Column 1: Logo & Text */}
        <div className={`${styles.col} ${styles.about}`}>
          <div className={styles['logo-wrapper']}>
            <Image
              className={styles['white-logo']}
              src="/images/contabilidadcr-logo-white.svg"
              alt="Contabilidad Costa Rica"
              width={256}
              height={60}
            />
          </div>
          <p>
            Contabilidad Costa Rica. Somos una empresa dedicada a la prestación 
            de servicios de contabilidad 100% costarricense.
          </p>
        </div>

        {/* Column 2: Nav Links (with arrow icons) */}
        <div className={`${styles.col} ${styles.navItems}`}>
          <ul className={styles.nav}>
            <li>
              <Link href="/">
                INICIO
              </Link>
            </li>
            <li>
              <Link href="/sobre-nosotros">
                SOBRE NOSOTROS
              </Link>
            </li>
            <li>
              <Link href="/servicios">
                SERVICIOS
              </Link>
            </li>
            <li>
              <Link href="/blog">
                BLOG
              </Link>
            </li>
            <li>
              <Link href="/contacto">
                CONTACTO
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Subscribe Form */}
        <div className={styles.col}>
          <form id="subscribe-form" acceptCharset="utf-8">
            <label htmlFor="subscribe-email">Únase a nuestro Newsletter:</label>
            <div className={styles['input-wrapper']}>
              <input
                type="email"
                name="email"
                id="subscribe-email"
                placeholder="Ingrese su email"
                required
              />
              <button type="submit" id="subscribe-button">
                ENVIAR
              </button>
            </div>
            <div id="subscribe-msg"></div>
          </form>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className={styles['footer-bottom']}>
        <p>©2025. Contabilidad Costa Rica. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;