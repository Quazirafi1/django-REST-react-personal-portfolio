import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get('https://quazirafi.online/api/about/');
                setAboutData(response.data);
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };
        fetchAboutData(); 
    }, []);

    if (!aboutData) {
        return <div>Loading...</div>;
    }

    return (
        <div id="about" className="border-b border-black pb-4 bg-black text-white">
            <h2 className="my-20 text-center text-4xl">
                About
                <span className="text-neutral-500"> Me</span>
            </h2>
            <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-2/3 lg:p-8 flex justify-center items-center">
                    <div className="w-full flex justify-center items-center">
                        <div className="max-w-7xl mx-auto w-full grid sm:grid-cols-9 sm:gap-0 gap-8 px-2">
                            {aboutData.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    {index % 2 === 0 ? (
                                        <>
                                            <div className="sm:col-span-4 w-full h-full flex items-center justify-end">
                                                <div className="w-full h-full bg-neutral-700 rounded-md p-4">
                                                    <h1 className="text-white text-xl font-medium py-2">{item.title}</h1>
                                                    <span className="block text-neutral-300 text-sm">{item.date}</span>
                                                    <p className="text-neutral-200 sm:text-sm text-xs text-justify">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="relative sm:col-span-1 w-full h-full justify-center items-center hidden sm:flex">
                                                <div className="h-full w-1 bg-neutral-600"></div>
                                                <div className="absolute w-6 h-6 rounded-full bg-neutral-400 z-10"></div>
                                                <div className="absolute w-full h-full flex items-center justify-center">
                                                    <div className="absolute h-1 bg-neutral-800 left-0" style={{ width: 'calc(50%)' }}></div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4 hidden sm:flex w-full h-full"></div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="sm:col-span-4 w-full h-full sm:flex hidden"></div>
                                            <div className="relative sm:col-span-1 w-full h-full justify-center items-center hidden sm:flex">
                                                <div className="h-full w-1 bg-neutral-600"></div>
                                                <div className="absolute w-6 h-6 rounded-full bg-neutral-400 z-10"></div>
                                                <div className="absolute w-full h-full flex items-center justify-center">
                                                    <div className="absolute h-1 bg-neutral-800 right-0" style={{ width: 'calc(50%)' }}></div>
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4 w-full h-full flex items-center justify-start">
                                                <div className="w-full h-full bg-neutral-700 rounded-md p-4">
                                                    <h1 className="text-white text-xl font-medium py-2">{item.title}</h1>
                                                    <span className="block text-neutral-300 text-sm">{item.date}</span>
                                                    <p className="text-neutral-200 sm:text-sm text-xs text-justify">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
