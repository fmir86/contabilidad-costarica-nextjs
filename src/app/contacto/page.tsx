// File: src/app/contacto/page.tsx
import { Metadata } from 'next';
import styles from '@/styles/contacto.module.scss';
import nodemailer from 'nodemailer';
import { ContactForm } from '@/components/ContactForm/ContactForm';

export const metadata: Metadata = {
  title: 'Contabilidad Costa Rica | Contáctenos',
  description: 'Contáctenos para obtener más información sobre nuestros servicios contables a la medida.',
};

// Server action for form submission
async function sendContactForm(formData: FormData) {
  'use server';

  try {
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    
    // Server-side validation
    if (!name || !email || !subject || !phone || !message) {
      throw new Error('Todos los campos son obligatorios');
    }
    
    // Configure transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build email
    const mailOptions = {
      from: `"Formulario Web" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: 'Nuevo mensaje desde contabilidadcostarica.net',
      text: `Interés: ${subject}\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`,
      html: `
        <p><strong>Interés:</strong> ${subject}</p>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return { 
      success: true, 
      message: 'Mensaje enviado correctamente' 
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Error al enviar el formulario' 
    };
  }
}

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

          <ContactForm sendContactForm={sendContactForm} />
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