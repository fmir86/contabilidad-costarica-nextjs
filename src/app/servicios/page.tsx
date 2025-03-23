import React from 'react';
import styles from '@/styles/servicios.module.scss';

// Definición de interfaces para los tipos de datos

interface ImageBox {
  id: string;
  imgsrc: string;
  title: string;
  description: string;
}

const Servicios: React.FC = () => {
  // Datos de servicios

  const imagebox: ImageBox[] = [
    {
      id: '1',
      imgsrc: 'images/servicios/procesamiento-facturas.jpg',
      title: 'Procesamiento de Facturas',
      description: 'Procesamos, ordenamos y archivamos sus facturas según la normativa costarricense, realizando sus declaraciones en la plataforma ATV de Hacienda.'
    },
    {
      id: '2',
      imgsrc: 'images/servicios/estados-financieros.jpg',
      title: 'Informes Contables',
      description: 'Elaboramos informes detallados de la situación financiera de su organización, facilitando la toma de decisiones estratégicas, el cumplimiento normativo y la gestión administrativa.'
    },
    {
      id: '3',
      imgsrc: 'images/servicios/gestion-fiscal.jpg',
      title: 'Gestión Fiscal',
      description: 'Gestionamos adecuadamente sus deberes fiscales, cumpliendo con los plazos y periodos estipulados para que su organización se pueda enfocar en producir y generar valor.'
    },
    {
      id: '4',
      imgsrc: 'images/servicios/pago-planillas.jpg',
      title: 'Pago de Planillas',
      description: 'Nos encargamos de la elaboración y pago de planillas en la plataforma de su preferencia, asegurando que sus colaboradores reciban su salario a tiempo y en regla.'
    },
    {
      id: '5',
      imgsrc: 'images/servicios/inscripcion-contribuyente.jpg',
      title: 'Registro de Contributyentes',
      description: 'Le facilitamos el servicio de Registro de Contribuyentes ante la Dirección General de Tributación Directa, para que pueda operar a derecho y cumplir sus deberes fiscales.'
    },
    {
      id: '9',
      imgsrc: 'images/servicios/servicios-a-la-medida.jpg',
      title: 'Servicios a la Medida',
      description: 'Diseñamos paquetes de servicios contables a la medida de sus necesidades, para que pueda contar con la asesoría que requiere sin comprometer su presupuesto.'
    }
  ];

  return (
    <section className={styles['services']}>

      <h1 className="inner-page-title">Servicios</h1>

      <h2 className='centered'>Le ofrecemos ayuda en las siguientes areas</h2>

      <p className={styles['centered']}>Como parte de un servicio integral, ponemos a su dispocisión una amplia gama de servicios contables y financieros.</p>

      <div className={styles['services-grid']}>
        {imagebox.map(data => (
          <div className={`${styles['card']}`} key={data.id}>
            <div className={`${styles['image']}`}>
              <img src={data.imgsrc} alt="img" />
            </div>
            <div className={`${styles['content']}`}>
              <h3 className={`${styles['title']}`}>
                {data.title}
              </h3>
              <div className={`${styles['description']}`}>{data.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;