import React from 'react';
import Projects from '../components/Projects';
import StarfieldBackground from '../components/StarfieldBackground';

const ProjectsPage = () => {
    return (
        <div className="relative min-h-screen pt-20">
            <StarfieldBackground />
            <div className="relative z-10">
                <Projects />
            </div>
        </div>
    );
};

export default ProjectsPage;
