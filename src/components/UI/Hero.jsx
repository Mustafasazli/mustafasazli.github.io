import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { ArrowRight, Sparkles } from 'lucide-react'

const Hero = () => {
    const { t } = useLanguage();
    const [displayedText, setDisplayedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);
    const fullText = t('hero.role');

    // Typewriter effect
    useEffect(() => {
        setDisplayedText('');
        setIsTypingComplete(false);

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
                setDisplayedText(fullText.substring(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsTypingComplete(true);
                clearInterval(typingInterval);
            }
        }, 80);

        return () => clearInterval(typingInterval);
    }, [fullText]);

    // Particle cursor trail
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    life: 1
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.speedX;
                p.y += p.speedY;
                p.life -= 0.02;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                } else {
                    ctx.fillStyle = `rgba(0, 243, 255, ${p.life})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
            padding: '0 20px'
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 2
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ textAlign: 'center', position: 'relative', zIndex: 3 }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1.5rem',
                        background: 'rgba(0, 243, 255, 0.1)',
                        border: '1px solid rgba(0, 243, 255, 0.3)',
                        borderRadius: '50px',
                        marginBottom: '2rem'
                    }}
                >
                    <Sparkles size={16} color="var(--primary-color)" />
                    <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {t('hero.greeting')}
                    </span>
                </motion.div>

                <h1 className={isTypingComplete ? 'galaxy-text' : ''} style={{
                    fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                    fontWeight: '900',
                    marginBottom: '1.5rem',
                    lineHeight: 1,
                    minHeight: '1.2em',
                    color: isTypingComplete ? 'transparent' : 'var(--text-color)',
                    letterSpacing: '-0.02em'
                }}>
                    {displayedText}
                    {!isTypingComplete && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            style={{ color: 'var(--primary-color)' }}
                        >
                            |
                        </motion.span>
                    )}
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                        color: 'var(--text-color)',
                        maxWidth: '700px',
                        margin: '0 auto 3rem',
                        opacity: 0.8,
                        lineHeight: 1.6
                    }}
                >
                    {t('hero.description')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 243, 255, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: 'clamp(1rem, 2vw, 1.2rem) clamp(2rem, 4vw, 3rem)',
                            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                            background: 'var(--primary-color)',
                            border: 'none',
                            color: '#000',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {t('hero.cta')}
                        <ArrowRight size={20} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: 'clamp(1rem, 2vw, 1.2rem) clamp(2rem, 4vw, 3rem)',
                            fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-color)',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            backdropFilter: 'blur(10px)',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        View Projects
                    </motion.button>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    bottom: '3rem',
                    color: 'var(--text-color)',
                    fontSize: '2rem',
                    opacity: 0.5
                }}
            >
                ↓
            </motion.div>
        </section>
    )
}

export default Hero
