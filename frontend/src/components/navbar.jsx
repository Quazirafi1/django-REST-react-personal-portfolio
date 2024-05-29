import React from 'react';
import logo from "../assets/quaziLogo.png";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = ({ contactData }) => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6 bg-black text-white">
      <div className="flex items-center">
        <img className="w-16" src={logo} alt="logo"/>
      </div>
      <div className="flex items-center gap-8 text-xl">
        <a href="#home" className="hover:text-gray-400 md:block hidden">Home</a>
        <a href="#about" className="hover:text-gray-400 md:block hidden">About</a>
        <a href="#skills" className="hover:text-gray-400 md:block hidden">Skills</a>
        <a href="#sustainability" className="hover:text-gray-400 md:block hidden">Sustainability</a>
        <a href="#contact" className="hover:text-gray-400 md:block hidden">Contact</a>
        <div className="flex items-center gap-4 text-2xl">
          <a href={contactData.socials_data.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href={contactData.socials_data.github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
