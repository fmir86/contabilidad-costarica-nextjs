import Slider from "@/components/Slider/Slider";
import slidesData from "@/data/home-slider.json";

const Home = () => {
  
  return (
    <>
      <Slider 
        slides={slidesData.slides} 
        settings={slidesData.settings} 
      />
      
      <section>
        <p>This is the homepage content.</p>
      </section>
    </>
  )

}

export default Home;
