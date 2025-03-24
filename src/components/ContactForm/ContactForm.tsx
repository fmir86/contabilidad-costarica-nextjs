"use client";

import { useRef, useState, useTransition } from 'react';
import styles from '@/styles/contacto.module.scss';

// Define the type for the server action
type FormSubmitAction = (formData: FormData) => Promise<{
  success: boolean;
  message: string;
}>;

interface ContactFormProps {
  sendContactForm: FormSubmitAction;
}

export function ContactForm({ sendContactForm }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendContactForm(formData);
      
      setFormStatus({
        type: result.success ? 'success' : 'error',
        message: result.message,
      });

      if (result.success && formRef.current) {
        formRef.current.reset();
      }
    });
  }

  return (
    <div className={styles['contact-form']}>
      <form ref={formRef} action={handleSubmit} className={styles['form']}>
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
            {formStatus.type && (
                <p className={styles[`${formStatus.type}-message`]}>
                    {formStatus.message}
                </p>
            )}
          </div>

          <button 
            type="submit" 
            className={styles['submit-button']}
            disabled={isPending}
          >
            {isPending ? 'ENVIANDO...' : 'ENVIAR'}
          </button>
        </div>
      </form>
    </div>
  );
}