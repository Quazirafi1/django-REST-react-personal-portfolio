import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Skill = () => {
    const [skillData, setSkillData] = useState(null);

    useEffect(() => {
        const fetchSkillData = async () => {
            try {
                const response = await axios.get('https://quazirafi.online/api/skill/');
                setSkillData(response.data);
            } catch (error) {
                console.error('Error fetching skill data:', error);
            }
        };
        fetchSkillData();
    }, []);

    if (!skillData) {
        return <div>Loading...</div>;
    }

    return (
        <div id="skills" className="border-b border-black pb-4 bg-black text-white">
            <h2 className="my-20 text-center text-4xl">
                Skills
            </h2>
            <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-2/3 lg:p-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {skillData.map((category) => (
                            <div key={category.skill_category_id} className="border-2 border-neutral-200 p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl text-neutral-200 font-semibold mb-4">{category.skill_category_name}:</h3>
                                <p className="text-lg text-neutral-300">
                                    {category.skills.map(skill => skill.skill).join(', ')}
                                </p>
                            </div>
                        ))}
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
