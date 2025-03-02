import Clients from "@/components/Clients/Clients";
import Featured from "@/components/Featured/Featured";
import LatestPosts from "@/components/LatestPosts/LatestPosts";
import QuickContact from "@/components/QuickContact/QuickContact";
import Services from "@/components/Services/Services";
import Slider from "@/components/Slider/Slider";
import slidesData from "@/data/home-slider.json";
import { getPosts } from "../../lib/getPosts"; // Import the direct function
import Software from "@/components/Software/Software";
import Head from "next/head";

async function Home() {
  // Get posts directly without API call - already formatted with day/month
  const formattedPosts = await getPosts(3);

  <Head>
    <title>Contabilidad Costa Rica | Servicios contables de confianza, calidad, y accesibles</title>
    <meta name="description" content="Ofrecemos servicios contables para la micro, pequeña y mediana empresa en Costa Rica. Gestión Tributaria, estados financieros, asesorías." />
  </Head>

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