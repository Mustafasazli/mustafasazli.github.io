import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'

const skills = [
    { name: 'Go', level: 90, color: '#00ADD8' },
    { name: 'C#', level: 85, color: '#239120' },
    { name: 'Java', level: 80, color: '#007396' },
    { name: 'Django', level: 85, color: '#092E20' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'Kafka', level: 75, color: '#231F20' },
    { name: 'WebSocket', level: 80, color: '#ffffff' },
    { name: 'SQL/NoSQL', level: 85, color: '#4479A1' }
]

const SkillsGraph = () => {
    const { t } = useLanguage();

    return (
        <div style={{ marginTop: '4rem', width: '100%', maxWidth: '800px' }}>
            <h3 style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: 'var(--primary-color)',
                fontSize: '1.8rem'
            }}>
                {t('about.skillsTitle')}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {skills.map((skill, index) => (
                    <div key={skill.name} style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 'bold' }}>{skill.name}</span>
                            <span style={{ color: '#ccc' }}>{skill.level}%</span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '10px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '5px',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                style={{
                                    height: '100%',
                                    background: skill.color,
                                    borderRadius: '5px',
                                    boxShadow: `0 0 10px ${skill.color}`
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillsGraph
