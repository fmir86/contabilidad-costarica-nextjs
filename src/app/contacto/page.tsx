// File: src/app/contacto/page.tsx
import { Metadata } from 'next';
import styles from '@/styles/contacto.module.scss';
import { ContactForm } from '@/components/ContactForm/ContactForm';

// Define once, use everywhere
const pageTitle = 'Contabilidad Costa Rica | Contáctenos';
const pageDescription = 'Contáctenos para obtener más información sobre nuestros servicios contables a la medida.';
const ogImage = '/images/og-image.jpg';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    images: [{
      url: ogImage,
      width: 1200,
      height: 630,
      alt: 'Contabilidad Costa Rica - Contacto'
    }],
    type: 'website',
    url: 'https://contabilidadcostarica.net/contacto'
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImage]
  }
};

export default function ContactPage() {
  const contactInfo = [
    {
      title: 'Ubicación',
      info: 'San Luis, Santo Domingo de Heredia, Costa Rica',
    },
    {
      title: 'Teléfono',
      info: 'Llámenos: 85949097',
    },
    {
      title: 'E-mail',
      info: 'info@contabilidadcostarica.net',
    },
  ];

  return (
    <div className={styles['contact-container']}>
      <h1 className="inner-page-title">Contáctenos</h1>

      <section className={styles['contact-section']}>
        <div className={styles['content-wrapper']}>
          <div className={styles['contact-info']}>
            {contactInfo.map((item, idx) => (
              <div className={styles['info-card']} key={idx}>
                <div className={styles['info-content']}>
                  <h3 className={styles['info-title']}>{item.title}</h3>
                  <p className={styles['info-text']}>{item.info}</p>
                </div>
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </section>

      <section className={styles['map-section']}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0935959515696!2d-84.0326395!3d10.009127399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e5682c29f65d%3A0x55ebf61aca79bc49!2sContabilidad%20Costa%20Rica!5e0!3m2!1sen!2scr!4v1739596664802!5m2!1sen!2scr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}