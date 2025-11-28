import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Globe, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useLanguage } from '../../context/LanguageContext'

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.projects'), path: '/projects' },
        { name: t('nav.experience'), path: '/experience' },
        { name: t('nav.contact'), path: '/contact' }
    ];

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '1rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 100,
                    backdropFilter: 'blur(10px)',
                    background: 'var(--glass-bg)',
                    borderBottom: '1px solid var(--glass-border)'
                }}
            >
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
                    Mustafa Sazlı<span style={{ color: 'var(--primary-color)' }}>.</span>
                </Link>

                {/* Desktop Menu */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-menu">
                    <ul style={{ display: 'flex', gap: '2rem' }}>
                        {links.map((item) => (
                            <li key={item.path}>
                                <Link to={item.path} style={{
                                    color: location.pathname === item.path ? 'var(--primary-color)' : 'var(--text-color)',
                                    fontSize: '0.9rem',
                                    transition: 'color 0.3s ease',
                                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                    position: 'relative'
                                }}>
                                    {item.name}
                                    {location.pathname === item.path && (
                                        <motion.div
                                            layoutId="activeTab"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-5px',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                background: 'var(--primary-color)'
                                            }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}>
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button onClick={toggleLanguage} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Globe size={20} />
                            <span style={{ fontSize: '0.8rem' }}>{language.toUpperCase()}</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="mobile-toggle">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-color)',
                            cursor: 'pointer',
                            padding: '0.5rem'
                        }}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            top: '70px',
                            right: 0,
                            width: '100%',
                            maxWidth: '300px',
                            height: 'calc(100vh - 70px)',
                            background: 'var(--bg-color)',
                            backdropFilter: 'blur(20px)',
                            borderLeft: '1px solid var(--glass-border)',
                            zIndex: 99,
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem'
                        }}
                    >
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {links.map((item, index) => (
                                <motion.li
                                    key={item.path}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={handleLinkClick}
                                        style={{
                                            color: location.pathname === item.path ? 'var(--primary-color)' : 'var(--text-color)',
                                            fontSize: '1.2rem',
                                            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                                            display: 'block',
                                            padding: '0.5rem 0'
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid var(--glass-border)'
                        }}>
                            <button
                                onClick={toggleTheme}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    color: 'var(--text-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                {theme === 'dark' ? 'Light' : 'Dark'}
                            </button>
                            <button
                                onClick={toggleLanguage}
                                style={{
                                    flex: 1,
                                    padding: '0.75rem',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    color: 'var(--text-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Globe size={20} />
                                {language.toUpperCase()}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
