const About = () => {
    return (
      <div className="border-b border-black pb-4 bg-black text-white">
        <h2 className="my-20 text-center text-4xl">
          About
          <span className="text-neutral-500"> Me</span>
        </h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-2/3 lg:p-8 flex justify-center items-center">
            {/* this is start */}
            <div className="w-full flex justify-center items-center">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-9 px-2">
                {/* <!-- Stack 1 --> */}
                <div className="col-span-4 w-full h-full">
                  <div className="w-full h-full bg-neutral-700 rounded-md p-4">
                    <h1 className="text-white text-xl font-medium py-2">Title</h1>
                    <span className="block text-neutral-300 text-sm">MM/YYYY</span>
                    <p className="text-neutral-200 sm:text-sm text-xs text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis consequuntur voluptate nulla iusto quam ut quasi, eaque quas omnis vero totam ullam, reprehenderit ratione pariatur accusamus suscipit odit nostrum?
                    </p>
                  </div>
                </div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                  <div className="h-full w-1 bg-neutral-600"></div>
                  <div className="absolute w-6 h-6 rounded-full bg-neutral-400 z-10"></div>
                </div>
                <div className="col-span-4 w-full h-full"></div>
  
                {/* <!-- Stack 2 --> */}
                <div className="col-span-4 w-full h-full"></div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                  <div className="h-full w-1 bg-neutral-600"></div>
                  <div className="absolute w-6 h-6 rounded-full bg-neutral-400 z-10"></div>
                </div>
                <div className="col-span-4 w-full h-full">
                  <div className="w-full h-full bg-neutral-700 rounded-md p-4">
                    <h1 className="text-white text-xl font-medium py-2">Title</h1>
                    <span className="block text-neutral-300 text-sm">MM/YYYY</span>
                    <p className="text-neutral-200 sm:text-sm text-xs text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis consequuntur voluptate nulla iusto quam ut quasi, eaque quas omnis vero totam ullam, reprehenderit ratione pariatur accusamus suscipit odit nostrum?
                    </p>
                  </div>
                </div>
  
                {/* <!-- Stack 3 --> */}
                <div className="col-span-4 w-full h-full">
                  <div className="w-full h-full bg-neutral-700 rounded-md p-4">
                    <h1 className="text-white text-xl font-medium py-2">Title</h1>
                    <span className="block text-neutral-300 text-sm">MM/YYYY</span>
                    <p className="text-neutral-200 sm:text-sm text-xs text-justify">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt corporis consequuntur voluptate nulla iusto quam ut quasi, eaque quas omnis vero totam ullam, reprehenderit ratione pariatur accusamus suscipit odit nostrum?
                    </p>
                  </div>
                </div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                  <div className="h-full w-1 bg-neutral-600"></div>
                  <div className="absolute w-6 h-6 rounded-full bg-neutral-400 z-10"></div>
                </div>
                <div className="col-span-4 w-full h-full"></div>
              </div>
            </div>
            {/* this is end */}
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  