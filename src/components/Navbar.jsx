import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, []);

    const navItems = [
        { name: t('nav.home'), to: '/' },
        { name: t('nav.about'), to: '/about' },
        { name: t('nav.skills'), to: '/skills' },
        { name: t('nav.projects'), to: '/projects' },
        { name: t('nav.contact'), to: '/contact' },
    ];

    return (
        <>
            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl px-4">
                <div className={`relative transition-all duration-500 rounded-full ${scrolled
                    ? 'glass-strong shadow-neon-cyan backdrop-blur-xl'
                    : 'glass backdrop-blur-md'
                    }`}>
                    {/* Animated border glow */}
                    <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'
                        }`} style={{
                            background: 'linear-gradient(90deg, rgba(0,255,255,0.3), rgba(255,0,255,0.3), rgba(0,255,255,0.3))',
                            backgroundSize: '200% 100%',
                            animation: 'gradient-shift 3s ease infinite',
                            padding: '1px',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                        }}></div>

                    <div className="relative flex items-center justify-between h-16 px-8">
                        {/* Logo with enhanced glow */}
                        <NavLink to="/" className="flex items-center space-x-2 group">
                            <div className="relative">
                                <span className="text-2xl font-display text-white tracking-wider font-bold relative z-10">
                                    M. Sazlı
                                </span>
                                <div className="absolute inset-0 blur-md bg-neon-cyan opacity-0 group-hover:opacity-50 transition-opacity"></div>
                            </div>
                            <span className="text-neon-cyan text-2xl font-display animate-glow-pulse"></span>
                        </NavLink>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `relative px-5 py-2 text-sm font-heading tracking-wider transition-all duration-300 rounded-full ${isActive
                                            ? 'text-white bg-neon-cyan/20'
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className="relative z-10">{item.name}</span>
                                            {isActive && (
                                                <>
                                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 animate-pulse"></span>
                                                    <span className="absolute inset-0 rounded-full border border-neon-cyan/50"></span>
                                                </>
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        {/* Language Switcher with enhanced style */}
                        <div className="hidden md:flex items-center">
                            <div className="px-3 py-1 rounded-full glass-strong">
                                <LanguageSwitcher />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-3 rounded-full glass hover:glass-strong transition-smooth hover:neon-border relative z-50"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6 text-neon-cyan" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes gradient-shift {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                `}</style>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-80 glass-strong backdrop-blur-xl z-50 md:hidden shadow-2xl"
                            style={{
                                boxShadow: '-10px 0 50px rgba(0, 255, 255, 0.2)',
                            }}
                        >
                            {/* Close button */}
                            <div className="flex justify-end p-6">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 rounded-full glass hover:glass-strong transition-smooth hover:neon-border"
                                >
                                    <X className="w-6 h-6 text-neon-cyan" />
                                </button>
                            </div>

                            {/* Logo */}
                            <div className="px-8 mb-8">
                                <div className="flex items-center space-x-2">
                                    <span className="text-3xl font-display text-white tracking-wider font-bold neon-text">
                                        MS
                                    </span>
                                    <span className="text-neon-cyan text-3xl font-display animate-glow-pulse">.</span>
                                </div>
                                <p className="text-white/50 text-sm mt-2 font-heading">Full Stack Developer</p>
                            </div>

                            {/* Navigation Links */}
                            <nav className="px-6 space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <NavLink
                                            to={item.to}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-6 py-4 rounded-2xl font-heading text-base tracking-wider transition-all duration-300 ${isActive
                                                    ? 'bg-neon-cyan/20 text-neon-cyan border-2 border-neon-cyan/50 shadow-neon-cyan'
                                                    : 'text-white/70 hover:bg-white/10 hover:text-white border-2 border-transparent'
                                                }`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Language Switcher */}
                            <div className="px-8 mt-8 pt-8 border-t border-white/10">
                                <p className="text-white/50 text-xs font-heading mb-3 uppercase tracking-wider">Language</p>
                                <LanguageSwitcher />
                            </div>

                            {/* Decorative gradient */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neon-cyan/10 to-transparent pointer-events-none"></div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
