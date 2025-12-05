import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Zap, Shield, Users, Sparkles, Rocket, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarfieldBackground from '../components/StarfieldBackground';
import ParticleGrid from '../components/ParticleGrid';
import MiniGame from '../components/MiniGame';

const HomePage = () => {
    const { t } = useTranslation();
    const [showGame, setShowGame] = useState(false);
    const [showCurtain, setShowCurtain] = useState(true);

    useEffect(() => {
        // Hide curtain after a delay
        const timer = setTimeout(() => {
            setShowCurtain(false);
        }, 1000); // Increased delay for better viewing

        return () => clearTimeout(timer);
    }, []);

    const features = [
        {
            icon: <Code className="w-8 h-8" />,
            title: 'Clean Code',
            description: 'Maintainable, scalable code following best practices'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Fast Performance',
            description: 'Lightning-fast load times and smooth interactions'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Secure Solutions',
            description: 'Security-first with modern authentication'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'User-Focused',
            description: 'Intuitive interfaces for best UX'
        }
    ];

    const stats = [
        { number: '5+', label: 'Years' },
        { number: '50+', label: 'Projects' },
        { number: '30+', label: 'Clients' },
        { number: '100%', label: 'Satisfaction' }
    ];

    return (
        <div className="relative">
            <StarfieldBackground />

            {/* Curtain Opening Animation */}
            <AnimatePresence>
                {showCurtain && (
                    <>
                        {/* Left Curtain */}
                        <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: '-100%' }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                            className="fixed inset-y-0 left-0 w-1/2 z-[100]"
                            style={{
                                background: 'linear-gradient(to right, #0a0e27, #1a1f3a)',
                            }}
                        >
                            {/* Glowing edge */}
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-cyan animate-pulse"
                                style={{
                                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.5)',
                                }}
                            ></div>
                            {/* Decorative pattern */}
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
                                }}
                            ></div>
                        </motion.div>

                        {/* Right Curtain */}
                        <motion.div
                            initial={{ x: 0 }}
                            animate={{ x: '100%' }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                            className="fixed inset-y-0 right-0 w-1/2 z-[100]"
                            style={{
                                background: 'linear-gradient(to left, #0a0e27, #1a1f3a)',
                            }}
                        >
                            {/* Glowing edge */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-cyan animate-pulse"
                                style={{
                                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.5)',
                                }}
                            ></div>
                            {/* Decorative pattern */}
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
                                }}
                            ></div>
                        </motion.div>

                        {/* Center Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="fixed inset-0 z-[101] flex items-center justify-center"
                        >
                            <div className="text-center">
                                {/* Main Name */}
                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="text-7xl md:text-8xl lg:text-9xl font-display font-bold mb-6"
                                    style={{
                                        background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ffff 100%)',
                                        backgroundSize: '200% 200%',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        animation: 'gradient-shift 3s ease infinite',
                                        textShadow: '0 0 40px rgba(0, 255, 255, 0.5)',
                                    }}
                                >
                                    Mustafa Sazlı
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="space-y-2"
                                >
                                    <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>
                                    <p className="text-neon-cyan font-heading text-lg md:text-xl tracking-[0.3em] uppercase">
                                        Full Stack Developer
                                    </p>
                                    <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-neon-magenta to-transparent"></div>
                                </motion.div>

                                {/* Loading indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                    className="mt-12 flex justify-center space-x-2"
                                >
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 h-2 rounded-full bg-neon-cyan"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.5, 1, 0.5],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
                <ParticleGrid />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text Content */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 neon-text">
                                    Mustafa Sazlı
                                </h1>

                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading text-neon-cyan mb-6">
                                    {t('hero.title')}
                                </h2>

                                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl">
                                    {t('hero.subtitle')}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/projects">
                                    <button className="group relative px-8 py-4 bg-neon-cyan/20 hover:bg-neon-cyan text-white hover:text-space-900 rounded-lg font-heading tracking-wider transition-all duration-300 neon-border overflow-hidden">
                                        <span className="relative z-10 flex items-center justify-center">
                                            {t('hero.cta')}
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                </Link>

                                <Link to="/contact">
                                    <button className="px-8 py-4 glass hover:glass-strong rounded-lg font-heading tracking-wider text-white transition-smooth">
                                        {t('hero.contact')}
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Particle Grid (handled by ParticleGrid component) */}
                        <div className="hidden lg:block"></div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 text-center hover:glass-strong hover:neon-border transition-smooth group"
                            >
                                <div className="text-4xl md:text-5xl font-display font-bold text-neon-cyan mb-2 group-hover:animate-glow-pulse">
                                    {stat.number}
                                </div>
                                <div className="text-sm font-heading text-white/70 tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 neon-text">
                            Why Work With Me
                        </h2>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Combining technical expertise with creative problem-solving
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-6 hover:glass-strong hover:neon-border transition-smooth group"
                            >
                                <div className="text-neon-cyan mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-heading font-bold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="glass-strong rounded-2xl p-12 text-center neon-border">
                        <Sparkles className="w-12 h-12 text-neon-cyan mx-auto mb-6 animate-float" />
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 neon-text">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                            Let's collaborate to bring your ideas to life with cutting-edge technology
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact">
                                <button className="group relative px-8 py-4 bg-neon-cyan/20 hover:bg-neon-cyan text-white hover:text-space-900 rounded-lg font-heading tracking-wider transition-all duration-300 neon-border">
                                    <span className="relative z-10 flex items-center justify-center">
                                        Get In Touch
                                        <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>

                            <button
                                onClick={() => setShowGame(true)}
                                className="group relative px-8 py-4 glass hover:glass-strong rounded-lg font-heading tracking-wider text-white transition-smooth hover:neon-border"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    Play Mini Game
                                    <Gamepad2 className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini Game Modal */}
            <AnimatePresence>
                {showGame && <MiniGame onClose={() => setShowGame(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default HomePage;
