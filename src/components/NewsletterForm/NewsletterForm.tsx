// components/NewsletterForm.tsx
"use client";

import { useState, FormEvent } from 'react';
import styles from './NewsletterForm.module.scss';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      setStatus('loading');
      setMessage('');
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Hubo un error al suscribirse');
      }
      
      setStatus('success');
      setMessage(data.message);
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Hubo un error al suscribirse');
    }
  };

  return (
    <form 
      className={styles['newsletter-form']} 
      onSubmit={handleSubmit}
      acceptCharset="utf-8"
    >
      <label htmlFor="subscribe-email">Únase a nuestro Newsletter:</label>
      <div className={styles['input-wrapper']}>
        <input
          type="email"
          name="email"
          id="subscribe-email"
          placeholder="Ingrese su email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'ENVIANDO...' : 'ENVIAR'}
        </button>
      </div>
      
      {message && (
        <div 
          className={`${styles['message']} ${styles[status === 'success' ? 'success' : 'error']}`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default NewsletterForm;