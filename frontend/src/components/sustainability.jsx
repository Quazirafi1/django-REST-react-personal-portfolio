import { SiGreensock } from "react-icons/si";
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';

const Sustainability = ({ contactData }) => {
    const [sustainabilityData, setSustainabilityData] = useState(null);
  
    useEffect(() => {
      const fetchSustainabilityData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/sustainability/latest/');
          setSustainabilityData(response.data);
        } catch (error) {
          console.error('Error fetching sustainability data:', error);
        }
      };
      fetchSustainabilityData(); 
    }, []);
  
    if (!sustainabilityData) {
      return <div>Loading...</div>;
    }
  
  return (
    <div id="sustainability" className="border-b border-black pb-4 bg-black text-white">
      <h2 className="my-20 text-center text-4xl flex items-center justify-center">
        Sustainability <SiGreensock className="ml-2" />
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-2/3 lg:p-8">
          <h3 className="text-3xl font-semi-bold mb-4 text-neutral-200 text-justify">{sustainabilityData.sustainability_title}</h3>
          <p className="text-xl mb-4 text-justify">
            {sustainabilityData.sustainability_description}
          </p>
          <h4 className="text-lg italic text-neutral-400">
            **This website is intentionally monochromatic for sustainability purposes
          </h4>
        </div>
        <div className="w-full flex justify-center mt-12">
            <a 
                href={contactData.socials_data.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-2 bg-neutral-600 text-white font-semibold rounded-full hover:bg-neutral-800 text-center transition duration-300"
            >
                Let's Make Sustainable Solutions Together
            </a>
        </div>
      </div>
    </div>
  );
}

export default Sustainability;
