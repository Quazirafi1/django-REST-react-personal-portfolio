import profilePic from "../assets/quaziProfilePic.jpeg";

const Hero = () => {
  return (
    <div className="border-b border-black pb-4 lg:mb-35 bg-black text-white">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-7xl">
              Quazi Ghulam Rafi
            </h1>
            <span className="text-4xl tracking-tight text-white">
              Software Engineer
            </span>
            <p className="my-2 max-w-xl py-6 font-light tracking-tighter text-white text-justify text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
