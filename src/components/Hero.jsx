import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center bg-primary-900 overflow-hidden pt-16">
            <ParticlesBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-heading tracking-tight">
                        Mustafa Sazlı
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-blue mb-8 drop-shadow-[0_0_10px_rgba(0,242,234,0.3)]">
                        {t('hero.title')}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light">
                        {t('hero.subtitle')}
                    </p>
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 242, 234, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-primary-900 bg-accent hover:bg-accent-glow transition-all duration-300"
                    >
                        {t('hero.cta')}
                        <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
