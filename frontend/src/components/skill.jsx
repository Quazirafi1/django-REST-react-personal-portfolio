const Skill = () => {
    return (
      <div className="border-b border-black pb-4 bg-black text-white">
        <h2 className="my-20 text-center text-4xl">
          Skills
        </h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-2/3 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="border-2 border-neutral-200 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl text-neutral-200 font-semibold mb-4">Backend:</h3>
                <p className="text-lg text-neutral-300">Django, Laravel, Lumen</p>
              </div>
              <div className="border-2 border-neutral-200 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl text-neutral-200 font-semibold mb-4">Frontend:</h3>
                <p className="text-lg text-neutral-300">JavaScript, React, NextJS, NuxtJS, VueJS, HTML, CSS</p>
              </div>
              <div className="border-2 border-neutral-200 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl text-neutral-200 font-semibold mb-4">Databases:</h3>
                <p className="text-lg text-neutral-300">Kuwaiba, PostgreSQL</p>
              </div>
              <div className="border-2 border-neutral-200 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl text-neutral-200 font-semibold mb-4">Others:</h3>
                <p className="text-lg text-neutral-300">Docker, Git, Azure</p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <button className="px-6 py-2 bg-neutral-600 text-white font-semibold rounded-full hover:bg-neutral-800 transition duration-300">
                Explore Some of My Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Skill;
  