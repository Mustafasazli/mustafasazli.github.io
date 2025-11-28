import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const Footer = () => {
    const { t, language } = useLanguage();

    const socialLinks = [
        { icon: <Github size={20} />, url: 'https://github.com/Mustafasazli', label: 'GitHub' },
        { icon: <Linkedin size={20} />, url: 'https://tr.linkedin.com/in/mustafa-sazl%C4%B1-b2a214375?trk=people-guest_people_search-card', label: 'LinkedIn' },
        { icon: <Mail size={20} />, url: 'mailto:imustafasazli@gmail.com', label: 'Email' }
    ];

    const quickLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.projects'), path: '/projects' },
        { name: t('nav.experience'), path: '/experience' },
        { name: t('nav.contact'), path: '/contact' }
    ];

    return (
        <footer style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--glass-border)',
            padding: '3rem 2rem 1.5rem',
            marginTop: '5rem',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem',
                marginBottom: '2rem'
            }}>
                {/* Brand Section */}
                <div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '1rem',
                        color: 'var(--primary-color)'
                    }}>
                        Mustafa Sazlı
                    </h3>
                    <p style={{
                        color: 'var(--text-color)',
                        opacity: 0.7,
                        lineHeight: 1.6,
                        fontSize: '0.9rem'
                    }}>
                        {language === 'tr'
                            ? 'Yazılım geliştirme tutkusuyla, modern teknolojiler kullanarak yenilikçi çözümler üretiyorum.'
                            : 'Creating innovative solutions with modern technologies, driven by passion for software development.'}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{
                        fontSize: '1.1rem',
                        marginBottom: '1rem',
                        color: 'var(--text-color)'
                    }}>
                        {language === 'tr' ? 'Hızlı Erişim' : 'Quick Links'}
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {quickLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    style={{
                                        color: 'var(--text-color)',
                                        opacity: 0.7,
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.opacity = '1';
                                        e.target.style.color = 'var(--primary-color)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.opacity = '0.7';
                                        e.target.style.color = 'var(--text-color)';
                                    }}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h4 style={{
                        fontSize: '1.1rem',
                        marginBottom: '1rem',
                        color: 'var(--text-color)'
                    }}>
                        {language === 'tr' ? 'Sosyal Medya' : 'Connect'}
                    </h4>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '50%',
                                    color: 'var(--text-color)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--primary-color)';
                                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                borderTop: '1px solid var(--glass-border)',
                paddingTop: '1.5rem',
                textAlign: 'center',
                color: 'var(--text-color)',
                opacity: 0.6,
                fontSize: '0.85rem'
            }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    © {new Date().getFullYear()} Mustafa Sazlı.
                    {language === 'tr' ? ' Tüm hakları saklıdır. ' : ' All rights reserved. '}
                    {language === 'tr' ? 'Sevgiyle yapıldı' : 'Made with'} <Heart size={14} fill="var(--primary-color)" color="var(--primary-color)" />
                </p>
            </div>
        </footer>
    )
}

export default Footer
