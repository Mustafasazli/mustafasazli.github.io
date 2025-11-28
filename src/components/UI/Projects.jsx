import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
    {
        id: 1,
        title: 'Real-time Analytics Platform',
        description: 'High-throughput data processing system using Kafka and Go for real-time analytics.',
        descriptionTr: 'Kafka ve Go kullanarak gerçek zamanlı analitik için yüksek verimli veri işleme sistemi.',
        tags: ['Go', 'Kafka', 'WebSocket', 'Redis'],
        link: '#',
        github: '#'
    },
    {
        id: 2,
        title: 'E-Commerce Platform',
        description: 'Scalable e-commerce solution built with Django, React, and PostgreSQL.',
        descriptionTr: 'Django, React ve PostgreSQL ile oluşturulmuş ölçeklenebilir e-ticaret çözümü.',
        tags: ['Django', 'Python', 'React', 'PostgreSQL'],
        link: '#',
        github: '#'
    },
    {
        id: 3,
        title: 'Enterprise CRM',
        description: 'Customer relationship management system with C# .NET Core and React.',
        descriptionTr: 'C# .NET Core ve React ile müşteri ilişkileri yönetim sistemi.',
        tags: ['C#', '.NET Core', 'React', 'SQL Server'],
        link: '#',
        github: '#'
    },
    {
        id: 4,
        title: 'Microservices Architecture',
        description: 'Decomposed monolithic application into Java Spring Boot microservices.',
        descriptionTr: 'Monolitik uygulamayı Java Spring Boot mikroservislerine dönüştürme.',
        tags: ['Java', 'Spring Boot', 'Docker', 'Kubernetes'],
        link: '#',
        github: '#'
    },
    {
        id: 5,
        title: 'API Gateway',
        description: 'High-performance API gateway built with Go and Redis for caching.',
        descriptionTr: 'Go ve Redis ile önbellekleme için yüksek performanslı API gateway.',
        tags: ['Go', 'Redis', 'Docker', 'Nginx'],
        link: '#',
        github: '#'
    },
    {
        id: 6,
        title: 'Real-time Chat Application',
        description: 'WebSocket-based chat application with Node.js and MongoDB.',
        descriptionTr: 'Node.js ve MongoDB ile WebSocket tabanlı sohbet uygulaması.',
        tags: ['Node.js', 'WebSocket', 'MongoDB', 'React'],
        link: '#',
        github: '#'
    }
]

const Projects = () => {
    const { t, language } = useLanguage();

    return (
        <section style={{
            minHeight: '100vh',
            padding: '50px 20px',
            position: 'relative',
            zIndex: 1
        }}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    color: 'var(--primary-color)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}
            >
                {t('projects.title')}
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    textAlign: 'center',
                    color: 'var(--text-color)',
                    opacity: 0.7,
                    marginBottom: '3rem',
                    maxWidth: '600px',
                    margin: '0 auto 3rem'
                }}
            >
                {language === 'tr'
                    ? 'Modern teknolojiler kullanarak geliştirdiğim bazı projeler'
                    : 'Some projects I\'ve built using modern technologies'}
            </motion.p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        style={{
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '15px',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                    >
                        {/* Gradient overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))'
                        }} />

                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>
                                {project.title}
                            </h3>
                            <p style={{
                                color: 'var(--text-color)',
                                marginBottom: '1.5rem',
                                lineHeight: '1.6',
                                opacity: 0.8,
                                minHeight: '3em'
                            }}>
                                {language === 'tr' ? project.descriptionTr : project.description}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                {project.tags.map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.3rem 0.8rem',
                                        background: 'rgba(0, 243, 255, 0.1)',
                                        border: '1px solid rgba(0, 243, 255, 0.3)',
                                        borderRadius: '15px',
                                        color: 'var(--primary-color)'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a
                                href={project.link}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem',
                                    background: 'rgba(0, 243, 255, 0.1)',
                                    border: '1px solid var(--primary-color)',
                                    borderRadius: '8px',
                                    color: 'var(--primary-color)',
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--primary-color)';
                                    e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(0, 243, 255, 0.1)';
                                    e.currentTarget.style.color = 'var(--primary-color)';
                                }}
                            >
                                <ExternalLink size={16} />
                                {t('projects.view')}
                            </a>
                            <a
                                href={project.github}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.75rem',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '8px',
                                    color: 'var(--text-color)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--primary-color)';
                                    e.currentTarget.style.color = 'var(--primary-color)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                                    e.currentTarget.style.color = 'var(--text-color)';
                                }}
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Projects
