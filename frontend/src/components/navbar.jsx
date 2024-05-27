import React from 'react';
import logo from "../assets/quaziLogo.png";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6 bg-black text-white">
      <div className="flex items-center">
        <img className="w-16" src={logo} alt="logo"/>
      </div>
      <div className="flex items-center gap-8 text-xl">
        <a href="#home" className="hover:text-gray-400">Home</a>
        <a href="#about" className="hover:text-gray-400">About</a>
        <a href="#skills" className="hover:text-gray-400">Skills</a>
        <a href="#sustainability" className="hover:text-gray-400">Sustainability</a>
        <a href="#contact" className="hover:text-gray-400">Contact</a>
        <div className="flex items-center gap-4 text-2xl">
          <a href="https://www.linkedin.com/in/your-linkedin/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
