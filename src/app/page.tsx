import Slider from "@/components/Slider/Slider";
import slidesData from "@/data/home-slider.json";

const Home = () => {
  
  return (
    <section>
      <Slider 
        slides={slidesData.slides} 
        settings={slidesData.settings} 
      />

      <p>This is the homepage content.</p>
    </section>
  )

}

export default Home;
