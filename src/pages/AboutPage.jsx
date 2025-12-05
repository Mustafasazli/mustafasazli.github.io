import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Briefcase, Award, Code2 } from 'lucide-react';
import StarfieldBackground from '../components/StarfieldBackground';

const AboutPage = () => {
    const { t } = useTranslation();

    const experience = [
        {
            title: t('about.experience.senior.title'),
            company: t('about.experience.senior.company'),
            period: t('about.experience.senior.period'),
            description: t('about.experience.senior.description')
        },
        {
            title: t('about.experience.mid.title'),
            company: t('about.experience.mid.company'),
            period: t('about.experience.mid.period'),
            description: t('about.experience.mid.description')
        },
        {
            title: t('about.experience.junior.title'),
            company: t('about.experience.junior.company'),
            period: t('about.experience.junior.period'),
            description: t('about.experience.junior.description')
        }
    ];

    const achievements = [
        {
            icon: <Award className="w-6 h-6" />,
            title: t('about.achievements.projects'),
            description: t('about.achievements.projectsDesc')
        },
        {
            icon: <Code2 className="w-6 h-6" />,
            title: t('about.achievements.experience'),
            description: t('about.achievements.experienceDesc')
        },
        {
            icon: <Briefcase className="w-6 h-6" />,
            title: t('about.achievements.clients'),
            description: t('about.achievements.clientsDesc')
        }
    ];

    return (
        <div className="relative min-h-screen pt-20">
            <StarfieldBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 neon-text">
                        {t('about.title')}
                    </h1>
                    <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        {t('about.description')}
                    </p>
                </motion.div>

                {/* Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {achievements.map((item, index) => (
                        <div
                            key={index}
                            className="glass rounded-xl p-6 text-center hover:glass-strong hover:neon-border transition-smooth"
                        >
                            <div className="text-neon-cyan mb-3 flex justify-center">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-white/70 text-sm font-heading">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Experience */}
                <div className="mb-20">
                    <div className="flex items-center mb-8">
                        <Briefcase className="w-8 h-8 text-neon-cyan mr-3" />
                        <h2 className="text-3xl font-display font-bold text-white">{t('about.experience.title')}</h2>
                    </div>

                    <div className="space-y-6">
                        {experience.map((job, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 hover:glass-strong hover:neon-border transition-smooth"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                    <h3 className="text-xl font-heading font-bold text-white">{job.title}</h3>
                                    <span className="text-neon-cyan text-sm font-heading">{job.period}</span>
                                </div>
                                <p className="text-white/70 font-heading mb-2">{job.company}</p>
                                <p className="text-white/60 text-sm leading-relaxed">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
