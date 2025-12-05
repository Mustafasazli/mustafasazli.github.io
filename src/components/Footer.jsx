import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { name: 'Home', to: '/' },
            { name: 'About', to: '/about' },
            { name: 'Skills', to: '/skills' },
            { name: 'Projects', to: '/projects' },
            { name: 'Contact', to: '/contact' },
        ],
        social: [
            { icon: <Github className="w-5 h-5" />, href: 'https://github.com/Mustafasazli', label: 'GitHub' },
            { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/mustafa-sazl%C4%B1-b2a214375/', label: 'LinkedIn' },
            { icon: <Mail className="w-5 h-5" />, href: 'mailto:imustafasazli@gmail.com', label: 'Email' },
        ],
    };

    return (
        <footer className="relative mt-20 border-t border-white/10">
            <div className="glass-strong">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Brand */}
                        <div>
                            <Link to="/" className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl font-display text-white tracking-wider">MS</span>
                                <span className="text-neon-cyan text-2xl font-display animate-glow-pulse">.</span>
                            </Link>
                            <p className="text-white/70 text-sm leading-relaxed">
                                Building digital experiences with passion and precision. Full Stack Developer specializing in modern web technologies.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-heading text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {footerLinks.navigation.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.to}
                                            className="text-white/70 hover:text-neon-cyan transition-colors text-sm font-heading"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h3 className="text-white font-heading text-lg mb-4">Connect</h3>
                            <div className="flex space-x-4">
                                {footerLinks.social.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 glass rounded-lg text-white hover:text-neon-cyan hover:neon-border transition-smooth"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-white/50 text-sm font-heading flex items-center">
                            © {currentYear} Mustafa Sazlı. Made with <Heart className="w-4 h-4 mx-1 text-neon-cyan" /> and React
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-white/50 hover:text-neon-cyan transition-colors font-heading">
                                Privacy
                            </a>
                            <a href="#" className="text-white/50 hover:text-neon-cyan transition-colors font-heading">
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
