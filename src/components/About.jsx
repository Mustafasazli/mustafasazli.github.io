import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-20 bg-primary-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-heading">
                        {t('about.title')}
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">
                            I'm a passionate Full Stack Developer with over 5 years of experience in building scalable web applications.
                            My expertise spans across modern JavaScript frameworks, cloud technologies, and database management.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">
                            I specialize in creating elegant solutions to complex problems, with a focus on clean code,
                            performance optimization, and user experience. I'm constantly learning and adapting to new technologies
                            to stay at the forefront of web development.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            When I'm not coding, I enjoy contributing to open-source projects, writing technical blog posts,
                            and mentoring junior developers. I believe in continuous learning and sharing knowledge with the community.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
