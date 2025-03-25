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

export const metadata: Metadata = {
  title: 'Contabilidad Costa Rica | Servicios contables accesibles y confiables',
  description: 'Ofrecemos servicios contables para la micro, pequeña y mediana empresa en Costa Rica. Gestión Tributaria, estados financieros, asesorías.'
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