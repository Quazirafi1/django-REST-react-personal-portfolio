import { SiGreensock } from "react-icons/si";

const Sustainability = () => {
  return (
    <div className="border-b border-black pb-4 bg-black text-white">
      <h2 className="my-20 text-center text-4xl flex items-center justify-center">
        Sustainability <SiGreensock className="ml-2" />
      </h2>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-2/3 lg:p-8">
          <h3 className="text-3xl font-semi-bold mb-4 text-neutral-200 text-justify">Did you know there is sustainability in and by software?</h3>
          <p className="text-xl mb-4 text-justify">
            My expertise at the intersection of software and sustainability can help your solution to be more sustainable. My expertise at the intersection of software and sustainability can help your solution to be more sustainable. My expertise at the intersection of software and sustainability can help your solution to be more sustainable.
          </p>
          <h4 className="text-lg italic text-neutral-400">
            **This website is intentionally monochromatic for sustainability purposes
          </h4>
        </div>
        <div className="w-full flex justify-center mt-12">
          <button className="px-6 py-2 bg-neutral-600 text-white font-semibold rounded-full hover:bg-neutral-800 transition duration-300">
            Feel Free to Contact Me For More Details 
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sustainability;
