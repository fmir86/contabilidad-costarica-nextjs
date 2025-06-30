"use client";

import { useRef, useState } from 'react';
import styles from '@/styles/contacto.module.scss';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage(result.message);
        setIsError(false);
        formRef.current?.reset();
      } else {
        setMessage(result.message);
        setIsError(true);
      }
    } catch (error) {
      setMessage('Error al enviar el formulario');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles['contact-form']}>
      <form ref={formRef} onSubmit={handleSubmit} className={styles['form']}>
        <div className={styles['form-grid']}>
          <div className={styles['form-left']}>
            <div className={styles['input-group']}>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                required
                className={styles['input']}
              />
            </div>
            
            <div className={styles['input-group']}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className={styles['input']}
              />
            </div>
            
            <div className={styles['input-group']}>
              <input
                type="text"
                name="subject"
                placeholder="Tema"
                required
                className={styles['input']}
              />
            </div>
            
            <div className={styles['input-group']}>
              <input
                type="text"
                name="phone"
                placeholder="Teléfono"
                required
                className={styles['input']}
              />
            </div>
          </div>
          
          <div className={styles['form-right']}>
            <div className={styles['input-group']}>
              <textarea
                name="message"
                placeholder="Mensaje"
                required
                className={styles['textarea']}
              ></textarea>
            </div>
          </div>
        </div>

        <div className={styles['submit-container']}>
          <div className={styles['result-container']}>
            {message && (
              <p className={styles[isError ? 'error-message' : 'success-message']}>
                {message}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            className={styles['submit-button']}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
          </button>
        </div>
      </form>
    </div>
  );
}