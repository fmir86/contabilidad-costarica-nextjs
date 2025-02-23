import Slider from "@/components/Slider/Slider";
import slidesData from "@/data/home-slider.json";
import styles from "../styles/index.module.scss";

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
