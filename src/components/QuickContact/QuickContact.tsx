'use client';

import React, { useState } from 'react';
import styles from './QuickContact.module.scss';

const QuickContact: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    topic: '',
    username: '',
    email: '',
    phone: ''
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate phone inputs to only allow digits
    if (name === 'phone' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Send data to API
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      const data = await response.json();
      setSuccess(data.message || 'Mensaje enviado con éxito');
      
      // Clear form data on success
      setFormData({
        topic: '',
        username: '',
        email: '',
        phone: ''
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.quickContactSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textBlock}>
            <h2>CUÉNTENOS SUS NECECIDADES</h2>
            <p>
              ¿Le gustaría conversar sobre necesidades específicas de su empresa? 
              Déjenos sus datos y nos pondremos en contacto con usted.
            </p>
          </div>
          
          <div className={styles.formBlock}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="topic">¿En qué podemos ayudarle?</label>
                <div className={styles.selectWrapper}>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Me gustaría conversar sobre:</option>
                    <option value="Procesamiento de facturas">Procesamiento de facturas</option>
                    <option value="Declaración de Renta">Declaración de Renta</option>
                    <option value="Soy Profesional Independiente">Soy Profesional Independiente</option>
                    <option value="Servicios para MiPymes">Servicios para MiPymes</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  placeholder="Su Nombre"
                  required
                  onChange={handleChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="Su Email"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  placeholder="Su número de teléfono"
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'ENVIANDO...' : 'ENVIAR'}
              </button>

              <div className={styles.resultField}>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {success && <p className={styles.successMessage}>{success}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContact;