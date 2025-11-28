import React from 'react'
import { motion } from 'framer-motion'
import { Server, Layout, Cloud, Database, Zap, Shield } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const Services = () => {
    const { language } = useLanguage()

    const services = [
        {
            icon: <Server size={40} />,
            title: 'Backend Development',
            titleTr: 'Backend Geliştirme',
            description: 'Robust and scalable server-side solutions using Go, Node.js, and C#.',
            descriptionTr: 'Go, Node.js ve C# kullanarak sağlam ve ölçeklenebilir sunucu tarafı çözümleri.',
            color: '#00f3ff'
        },
        {
            icon: <Layout size={40} />,
            title: 'Frontend Development',
            titleTr: 'Frontend Geliştirme',
            description: 'Immersive and responsive user interfaces with React, Three.js, and modern CSS.',
            descriptionTr: 'React, Three.js ve modern CSS ile sürükleyici ve responsive kullanıcı arayüzleri.',
            color: '#bc13fe'
        },
        {
            icon: <Cloud size={40} />,
            title: 'Cloud Architecture',
            titleTr: 'Bulut Mimarisi',
            description: 'Designing cloud-native applications with Docker, Kubernetes, and Kafka.',
            descriptionTr: 'Docker, Kubernetes ve Kafka ile bulut-native uygulamalar tasarlama.',
            color: '#00f3ff'
        },
        {
            icon: <Database size={40} />,
            title: 'Database Design',
            titleTr: 'Veritabanı Tasarımı',
            description: 'Optimized database schemas for SQL and NoSQL systems.',
            descriptionTr: 'SQL ve NoSQL sistemleri için optimize edilmiş veritabanı şemaları.',
            color: '#bc13fe'
        },
        {
            icon: <Zap size={40} />,
            title: 'Performance Optimization',
            titleTr: 'Performans Optimizasyonu',
            description: 'Speed up applications with caching, lazy loading, and code splitting.',
            descriptionTr: 'Önbellekleme, lazy loading ve code splitting ile uygulamaları hızlandırma.',
            color: '#00f3ff'
        },
        {
            icon: <Shield size={40} />,
            title: 'Security & Testing',
            titleTr: 'Güvenlik & Test',
            description: 'Implementing security best practices and comprehensive testing.',
            descriptionTr: 'Güvenlik en iyi uygulamalarını ve kapsamlı testleri uygulama.',
            color: '#bc13fe'
        }
    ]

    return (
        <section style={{
            padding: '5rem 20px',
            maxWidth: '1400px',
            margin: '0 auto',
            position: 'relative'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    color: 'var(--primary-color)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    {language === 'tr' ? 'Hizmetler' : 'Services'}
                </h2>

                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-color)',
                    opacity: 0.7,
                    marginBottom: '4rem',
                    maxWidth: '600px',
                    margin: '0 auto 4rem',
                    fontSize: '1.1rem'
                }}>
                    {language === 'tr'
                        ? 'Sunduğum profesyonel yazılım geliştirme hizmetleri'
                        : 'Professional software development services I offer'}
                </p>
            </motion.div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem'
            }}>
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -15, scale: 1.03 }}
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            padding: '2.5rem',
                            borderRadius: '20px',
                            textAlign: 'center',
                            backdropFilter: 'blur(10px)',
                            color: 'var(--text-color)',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = service.color
                            e.currentTarget.querySelector('.service-icon').style.color = service.color
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--glass-border)'
                            e.currentTarget.querySelector('.service-icon').style.color = 'var(--primary-color)'
                        }}
                    >
                        {/* Animated background gradient */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            style={{
                                position: 'absolute',
                                top: '-50%',
                                left: '-50%',
                                width: '200%',
                                height: '200%',
                                background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                                pointerEvents: 'none'
                            }}
                        />

                        <motion.div
                            className="service-icon"
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                color: 'var(--primary-color)',
                                marginBottom: '1.5rem',
                                display: 'inline-block'
                            }}
                        >
                            {service.icon}
                        </motion.div>

                        <h3 style={{
                            marginBottom: '1rem',
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}>
                            {language === 'tr' ? service.titleTr : service.title}
                        </h3>

                        <p style={{
                            opacity: 0.8,
                            lineHeight: '1.7',
                            fontSize: '1rem'
                        }}>
                            {language === 'tr' ? service.descriptionTr : service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Services
