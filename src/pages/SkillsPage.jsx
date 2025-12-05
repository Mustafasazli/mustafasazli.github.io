import React from 'react';
import Skills from '../components/Skills';
import StarfieldBackground from '../components/StarfieldBackground';

const SkillsPage = () => {
    return (
        <div className="relative min-h-screen pt-20">
            <StarfieldBackground />
            <div className="relative z-10">
                <Skills />
            </div>
        </div>
    );
};

export default SkillsPage;
