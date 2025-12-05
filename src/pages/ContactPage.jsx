import React from 'react';
import Contact from '../components/Contact';
import StarfieldBackground from '../components/StarfieldBackground';

const ContactPage = () => {
    return (
        <div className="relative min-h-screen pt-20">
            <StarfieldBackground />
            <div className="relative z-10">
                <Contact />
            </div>
        </div>
    );
};

export default ContactPage;
