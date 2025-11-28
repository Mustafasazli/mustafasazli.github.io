import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { Code, Award, Users, Coffee } from 'lucide-react'

const StatCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime
        let animationFrame

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration])

    return <span>{count}{suffix}</span>
}

const About = () => {
    const { t, language } = useLanguage()
    const [isVisible, setIsVisible] = useState(false)

    const stats = [
        { icon: <Code size={32} />, value: 3, suffix: '+', label: language === 'tr' ? 'Yıl Deneyim' : 'Years Experience' },
        { icon: <Award size={32} />, value: 25, suffix: '+', label: language === 'tr' ? 'Tamamlanan Proje' : 'Projects Completed' },
        { icon: <Users size={32} />, value: 10, suffix: '+', label: language === 'tr' ? 'Müşteri' : 'Clients' },
        { icon: <Coffee size={32} />, value: 9999, suffix: '+', label: language === 'tr' ? 'Kahve' : 'Cups of Coffee' }
    ]

    return (
        <section style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '5rem auto',
            padding: '0 20px'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                onViewportEnter={() => setIsVisible(true)}
                transition={{ duration: 0.6 }}
            >
                <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    color: 'var(--primary-color)',
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}>
                    {t('about.title')}
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, scale: 1.05 }}
                            style={{
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '20px',
                                padding: '2rem',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '3px',
                                background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))'
                            }} />

                            <div style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
                                {stat.icon}
                            </div>

                            <div style={{
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                color: 'var(--text-color)',
                                marginBottom: '0.5rem'
                            }}>
                                {isVisible && <StatCounter end={stat.value} suffix={stat.suffix} />}
                            </div>

                            <div style={{
                                fontSize: '1rem',
                                color: 'var(--text-color)',
                                opacity: 0.7
                            }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    style={{
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '20px',
                        padding: '3rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        right: '-10%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(0,243,255,0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(40px)'
                    }} />

                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        lineHeight: '1.8',
                        color: 'var(--text-color)',
                        marginBottom: '1.5rem',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {t('about.description')}
                    </p>

                    <p style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        lineHeight: '1.8',
                        color: 'var(--text-color)',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {t('about.passion')}
                    </p>

                    <div style={{
                        marginTop: '2rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                    }}>
                        {['Go', 'Django', 'C#', 'Java', 'React', 'Node.js', 'Kafka', 'Docker', 'Kubernetes'].map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + index * 0.05 }}
                                whileHover={{ scale: 1.1, y: -3 }}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(0, 243, 255, 0.1)',
                                    border: '1px solid rgba(0, 243, 255, 0.3)',
                                    borderRadius: '20px',
                                    color: 'var(--primary-color)',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    cursor: 'default'
                                }}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default About
