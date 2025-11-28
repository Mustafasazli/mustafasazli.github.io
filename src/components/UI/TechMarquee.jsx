import React from 'react'
import { motion } from 'framer-motion'

const techs = [
    'Go', 'C#', 'Java', 'Django', 'Python', 'React', 'Node.js', 'Three.js', 'Kafka', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis', 'TypeScript', 'Next.js'
]

const TechMarquee = () => {
    return (
        <div style={{
            width: '100%',
            overflow: 'hidden',
            padding: '50px 0',
            background: 'rgba(255,255,255,0.02)',
            borderTop: '1px solid var(--glass-border)',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap' }}
            >
                {[...techs, ...techs, ...techs].map((tech, index) => (
                    <span key={index} style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'rgba(255,255,255,0.3)',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        {tech}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

export default TechMarquee
