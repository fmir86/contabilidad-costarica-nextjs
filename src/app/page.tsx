import Clients from "@/components/Clients/Clients";
import Featured from "@/components/Featured/Featured";
import LatestPosts from "@/components/LatestPosts/LatestPosts";
import QuickContact from "@/components/QuickContact/QuickContact";
import Services from "@/components/Services/Services";
import Slider from "@/components/Slider/Slider";
import slidesData from "@/data/home-slider.json";
import { getPosts } from "../../lib/getPosts"; // Import the direct function
import Software from "@/components/Software/Software";

import type { Metadata } from 'next'

// Define once, use everywhere
const pageTitle = 'Contabilidad Costa Rica | Servicios contables accesibles y confiables';
const pageDescription = 'Ofrecemos servicios contables para la micro, pequeña y mediana empresa en Costa Rica. Gestión Tributaria, estados financieros, asesorías.';
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
      alt: 'Contabilidad Costa Rica - Servicios contables profesionales'
    }],
    type: 'website',
    url: 'https://contabilidadcostarica.net'
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: [ogImage]
  }
}



async function Home() {
  // Get posts directly without API call - already formatted with day/month
  const formattedPosts = await getPosts(3);

  return (
    <>
      <Slider 
        slides={slidesData.slides} 
        settings={slidesData.settings} 
      />
      <Featured/>
      <Services/>
      <Clients/>
      <QuickContact/>
      <LatestPosts posts={formattedPosts} />
      <Software/>
    </>
  );
}

export default Home;