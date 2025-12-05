import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Phone, Send } from 'lucide-react';

const Contact = () => {
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        window.location.href = `mailto:imustafasazli@gmail.com?subject=Contact from ${data.name}&body=${data.message}`;
    };

    const contactInfo = [
        {
            icon: <Mail className="w-5 h-5" />,
            label: 'Email',
            value: 'imustafasazli@gmail.com',
            href: 'mailto:imustafasazli@gmail.com'
        },
        {
            icon: <Phone className="w-5 h-5" />,
            label: 'Phone',
            value: '0551 075 0775',
            href: 'tel:+905510750775'
        },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: 'Location',
            value: 'Konya, Türkiye',
            href: null
        }
    ];

    const socialLinks = [
        { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mustafa-sazl%C4%B1-b2a214375/' },
        { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/Mustafasazli' }
    ];

    return (
        <section id="contact" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-center neon-text">
                        {t('contact.title')}
                    </h2>
                    <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                        Let's discuss your next project. I'm always open to new opportunities.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left: Contact Info */}
                        <div className="space-y-8">
                            <div className="glass rounded-xl p-8">
                                <h3 className="text-2xl font-heading font-bold text-white mb-6">Get In Touch</h3>

                                <div className="space-y-4 mb-8">
                                    {contactInfo.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start space-x-4 group"
                                        >
                                            <div className="p-3 glass rounded-lg text-neon-cyan group-hover:neon-border transition-smooth">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm text-white/50 font-heading">{item.label}</p>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className="text-white hover:text-neon-cyan transition-colors"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-white">{item.value}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-sm text-white/50 font-heading mb-4">Follow Me</p>
                                    <div className="flex space-x-4">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.href}
                                                className="p-3 glass rounded-lg text-white hover:text-neon-cyan hover:neon-border transition-smooth"
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="glass rounded-xl p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-heading text-white/70 mb-2">
                                        {t('contact.name')}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/30 focus:glass-strong focus:neon-border transition-smooth outline-none font-body"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-heading text-white/70 mb-2">
                                        {t('contact.email')}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/30 focus:glass-strong focus:neon-border transition-smooth outline-none font-body"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-heading text-white/70 mb-2">
                                        {t('contact.message')}
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={5}
                                        required
                                        className="w-full px-4 py-3 glass rounded-lg text-white placeholder-white/30 focus:glass-strong focus:neon-border transition-smooth outline-none resize-none font-body"
                                        placeholder="Your message here..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 bg-neon-cyan/20 hover:bg-neon-cyan text-white hover:text-space-900 rounded-lg font-heading tracking-wider transition-all duration-300 neon-border flex items-center justify-center space-x-2"
                                >
                                    <span>{t('contact.send')}</span>
                                    <Send className="w-4 h-4" />
                                </motion.button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
