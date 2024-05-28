import Navbar from './components/navbar'
import Hero from './components/hero'
import About from './components/about'
import Skill from './components/skill'
import Sustainability from './components/sustainability'
import Contact from './components/contact'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [contactData, setContactData] = useState(null);
  
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/contact/latest/');
        setContactData(response.data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };
    // Calling the fetchHeroData function
    fetchContactData(); 
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  if (!contactData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overflow-x-hidden text-white antialiased selection:bg-gray-300 selection:text-black bg-black min-h-screen'>
      <div className='fixed top-0 -z-10 h-full w-full bg-black'></div>
      <div className='container mx-auto px-8'>
        <Navbar contactData={contactData}/>
        <Hero/>
        <About/>
        <Skill/>
        <Sustainability/>
        <Contact contactData={contactData}/>
      </div>
    </div>
  )
}

export default App
