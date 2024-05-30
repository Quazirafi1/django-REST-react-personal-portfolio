import React, { useEffect, useState } from 'react'; // Importing necessary hooks from React
import axios from 'axios';  // Importing axios for making HTTP requests
import profilePic from "../assets/quaziProfilePic.jpeg";

const Hero = () => {
  // useState hook to manage the state of heroData, initialized to null
  const [heroData, setHeroData] = useState(null);
  
  // useEffect hook to perform side effects, in this case, fetching data when the component mounts
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/hero/latest/');
        setHeroData(response.data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };
    // Calling the fetchHeroData function
    fetchHeroData(); 
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  if (!heroData) {
    return <div>Loading...</div>;
  }

  return (
    <div id="home" className="border-b border-black pb-4 lg:mb-35 bg-black text-white">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="pb-16 text-4xl font-thin tracking-tight lg:mt-16 lg:text-7xl md:text-5xl">
              Quazi Ghulam Rafi
            </h1>
            <span className="text-3xl tracking-tight text-neutral-300">
                {heroData.hero_title}
            </span>
            <p className="my-2 max-w-xl py-6 font-light tracking-tighter text-neutral-200 text-justify text-lg">
                {heroData.hero_description}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <img src={profilePic} alt="Quazi Ghulam Rafi" className="grayscale" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
