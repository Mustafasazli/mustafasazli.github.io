import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Briefcase, Calendar } from 'lucide-react'
import Footer from '../components/UI/Footer'

const experiences = [

    {
        id: 3,
        role: 'Java Developer',
        roleTr: 'Java Geliştirici',
        company: 'Enterprise Corp',
        period: '2018 - 2020',
        periodTr: '2018 - 2020',
        description: 'Maintained legacy Java systems and migrated modules to modern Spring Boot microservices. Improved system performance by 40%.',
        descriptionTr: 'Legacy Java sistemlerini sürdürdüm ve modülleri modern Spring Boot mikroservislerine taşıdım. Sistem performansını %40 artırdım.',
        technologies: ['Java', 'Spring Boot', 'MySQL', 'Redis']
    },
    {
        id: 4,
        role: 'Junior Developer',
        roleTr: 'Junior Geliştirici',
        company: 'StartUp Tech',
        period: '2017 - 2018',
        periodTr: '2017 - 2018',
        description: 'Started career building web applications with Python Django and JavaScript. Learned best practices and agile methodologies.',
        descriptionTr: 'Python Django ve JavaScript ile web uygulamaları geliştirerek kariyerime başladım. En iyi uygulamaları ve çevik metodolojileri öğrendim.',
        technologies: ['Python', 'Django', 'JavaScript', 'PostgreSQL']
    }
]

const ExperiencePage = () => {
    const { t, language } = useLanguage();

    return (
        <>
            <section style={{
                minHeight: '100vh',
                padding: '120px 20px 50px',
                position: 'relative',
                zIndex: 1,
                maxWidth: '900px',
                margin: '0 auto'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                        color: 'var(--primary-color)',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        {t('experience.title')}
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: 'var(--text-color)',
                        opacity: 0.7,
                        marginBottom: '4rem',
                        maxWidth: '600px',
                        margin: '0 auto 4rem'
                    }}>
                        {language === 'tr'
                            ? 'Profesyonel yazılım geliştirme yolculuğum'
                            : 'My professional software development journey'}
                    </p>
                </motion.div>

                <div style={{ position: 'relative', borderLeft: '2px solid var(--glass-border)', paddingLeft: '2rem' }}>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            viewport={{ once: true, margin: "-100px" }}
                            style={{
                                marginBottom: '3rem',
                                position: 'relative',
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                padding: '2rem',
                                marginLeft: '-1rem'
                            }}
                        >
                            {/* Timeline dot */}
                            <div style={{
                                position: 'absolute',
                                left: '-3.1rem',
                                top: '2rem',
                                width: '1.2rem',
                                height: '1.2rem',
                                background: 'var(--primary-color)',
                                borderRadius: '50%',
                                boxShadow: '0 0 15px var(--primary-color)',
                                border: '3px solid var(--bg-color)'
                            }} />

                            {/* Company icon */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                background: 'rgba(0, 243, 255, 0.1)',
                                borderRadius: '20px',
                                marginBottom: '1rem'
                            }}>
                                <Briefcase size={16} color="var(--primary-color)" />
                                <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                    {exp.company}
                                </span>
                            </div>

                            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>
                                {language === 'tr' ? exp.roleTr : exp.role}
                            </h3>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '1rem',
                                color: '#888'
                            }}>
                                <Calendar size={14} />
                                <span style={{ fontSize: '0.9rem' }}>
                                    {language === 'tr' ? exp.periodTr : exp.period}
                                </span>
                            </div>

                            <p style={{ color: '#ccc', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                {language === 'tr' ? exp.descriptionTr : exp.description}
                            </p>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {exp.technologies.map(tech => (
                                    <span key={tech} style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.75rem',
                                        background: 'rgba(188, 19, 254, 0.1)',
                                        border: '1px solid rgba(188, 19, 254, 0.3)',
                                        borderRadius: '12px',
                                        color: 'var(--secondary-color)'
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ExperiencePage
