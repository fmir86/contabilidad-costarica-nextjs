import { Metadata } from 'next';
import Head from "next/head";
import styles from '@/styles/sobre-nosotros.module.scss';

export const metadata: Metadata = {
  title: 'Contabilidad Costa Rica | Sobre Nosotros',
  description: 'Descubre cómo en Contabilidad Costa Rica unimos responsabilidad, profesionalismo y confianza para ofrecerle servicios contables integrales.',
};


async function SobreNosotros() {
  return (
    <section className={styles['sobre-nosotros']}>
      
      <h1 className="inner-page-title">Sobre Nosotros</h1>

      <div className={`box-content`}>
          <h2 className="centered">Una Historia de Esfuerzo y Adaptación</h2>

          <figure className={styles['left-img']}>
              <img src="/images/sobre-nosotros/connie-palma-caribbean-veener.jpg" width={'50%'}/>
              <figcaption>Iniciando mi carrera en 1985. Caribbean Veneer Co.</figcaption>
          </figure>

          <p>Permítame presentarme, soy Connie Palma, contadora privada en jefe de ContabilidadCostaRica.net. Cuento con más de 30 años de experiencia trabajando en el sector privado, brindando servicios tanto a pequeñas como a grandes empresas.</p>
          
          <p>A lo largo de mi trayectoria he manejado áreas clave como cuentas por pagar, elaboración de estados financieros, pago de planillas, control de inventarios, procesamiento de facturas y todo lo relacionado con el cumplimiento fiscal para mantener a mis clientes en regla con la legislación costarricense.</p>
          
          <h3>Responsabilidad: El Pilar de Nuestro Compromiso</h3>
          
          <p>En ContabilidadCostaRica.net, entendemos que la responsabilidad va más allá de cumplir con plazos y obligaciones. Para nosotros, significa asumir cada proyecto con total dedicación, garantizando que la información financiera de su empresa esté siempre actualizada, precisa y en conformidad con las normativas vigentes. Nos hacemos cargo de su contabilidad como si fuera la nuestra propia, anticipándonos a posibles problemas y ofreciendo soluciones oportunas que salvaguarden el patrimonio de su negocio.</p>
          
          <p>Mi pasión por la contabilidad radica en ayudar a cada negocio a alcanzar un orden financiero sólido y a tomar decisiones estratégicas que impulsen su crecimiento. En ContabilidadCostaRica.net, mi equipo y yo nos esforzamos por ofrecer soluciones contables integrales, confiables y adaptadas a la realidad de cada cliente. Creemos en la transparencia, la cercanía y el profesionalismo como pilares fundamentales de nuestro trabajo, y estamos comprometidos con acompañarlo en cada paso hacia el éxito financiero de su empresa.</p>
          
          <figure className={styles['right-img']}>
              <img src="/images/sobre-nosotros/connie-2016-distribuidora-olman.jpg" width={'50%'}/>
              <figcaption>2016. Distribuidora Olman S.A.</figcaption>
          </figure>
          
          <h3>Profesionalismo: Excelencia en Cada Detalle</h3>
          
          <p>El profesionalismo es la columna vertebral de nuestros servicios. Cada miembro de nuestro equipo cuenta con una sólida formación académica y experiencia práctica en el campo contable y tributario. Nos mantenemos constantemente actualizados sobre cambios en la legislación fiscal, nuevas tecnologías y mejores prácticas del sector para ofrecer un servicio de vanguardia. Nuestro enfoque meticuloso nos permite identificar oportunidades de optimización fiscal y financiera que muchas veces pasan desapercibidas, generando valor adicional para su empresa.</p>
          
          <p>Gracias a nuestra experiencia trabajando con empresas de diversos tamaños, comprendemos a fondo la realidad y los desafíos que enfrentan las pequeñas y medianas empresas en su día a día. Esto nos ha permitido diseñar paquetes de servicios contables efectivos y accesibles, para que negocios de este tipo puedan contar con asesoría de primer nivel sin comprometer su presupuesto. Nuestra prioridad es brindar soluciones ajustadas a las necesidades reales de cada cliente, manteniendo siempre un alto estándar de calidad y un enfoque cercano y personalizado.</p>
          
          <h3>Confianza: Construyendo Relaciones Duraderas</h3>
          
          <p>La confianza se gana día a día, y en ContabilidadCostaRica.net lo sabemos bien. Por eso, trabajamos con total transparencia, manteniendo una comunicación clara y constante con nuestros clientes. Entendemos que nos confían información sensible y crucial para sus operaciones, responsabilidad que asumimos con el máximo respeto y confidencialidad. Nuestra trayectoria de más de tres décadas en el mercado costarricense avala nuestra reputación, respaldada por clientes satisfechos que han crecido de la mano con nosotros a lo largo de los años.</p>
          
          <p>Nos enorgullece ser más que simples proveedores de servicios contables; somos aliados estratégicos que acompañan a cada empresa en su camino hacia la estabilidad financiera y el crecimiento sostenible. Nuestro compromiso va más allá de los números: buscamos entender su modelo de negocio, sus objetivos y sus preocupaciones para ofrecerle soluciones verdaderamente adaptadas a su realidad empresarial.</p>

          <p><b>Contáctenos! Permítanos demostrarle por qué somos la opción correcta para fortalecer y mejorar el área contable de su negocio. En ContabilidadCostaRica.net unimos responsabilidad, profesionalismo y confianza para ofrecerle un servicio integral que haga la diferencia. Estamos para servirle.</b></p>

          <div className="dividers dividers-bc-v4"></div>
      </div>
    </section>
  );
}

export default SobreNosotros;