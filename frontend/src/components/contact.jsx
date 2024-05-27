import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  return (
    <div id="contact" className="border-b border-black pb-20">
      <h1 className="my-10 text-center text-4xl">Get In Touch</h1>
      <div className="text-center tracking-tighter">
        <p className="my-4 text-neutral-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="flex justify-center space-x-8 mt-8">
        <a href="mailto:your-email@example.com" className="flex items-center space-x-2 text-neutral-400">
          <FaEnvelope className="text-2xl" />
          <span>your-email@example.com</span>
        </a>
        <a href="https://www.linkedin.com/in/your-linkedin/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-neutral-400">
          <FaLinkedin className="text-2xl" />
          <span>Check out My LinkedIn!</span>
        </a>
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-neutral-400">
          <FaGithub className="text-2xl" />
          <span>Check out My GitHub!</span>
        </a>
      </div>
    </div>
  );
};

export default Contact;
