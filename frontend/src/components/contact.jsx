import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = ({ contactData }) => {
  return (
    <div id="contact" className="border-b border-black pb-20">
      <h1 className="my-10 text-center text-4xl">Get In Touch</h1>
      <div className="text-center tracking-tighter">
        <p className="my-4 text-neutral-400">
          {contactData.contact_description}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mt-8">
        <a href="mailto:your-email@example.com" className="flex items-center space-x-2 text-neutral-400">
          <FaEnvelope className="text-2xl" />
          <span>{contactData.socials_data.email}</span>
        </a>
        <a href={contactData.socials_data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-neutral-400">
          <FaLinkedin className="text-2xl" />
          <span>Checkout My LinkedIn!</span>
        </a>
        <a href={contactData.socials_data.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-neutral-400">
          <FaGithub className="text-2xl" />
          <span>Checkout My GitHub!</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
