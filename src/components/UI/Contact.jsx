import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react'

const Contact = () => {
    const { t, language } = useLanguage()
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = language === 'tr' ? 'İsim gerekli' : 'Name required'
        if (!formData.email.trim()) {
            newErrors.email = language === 'tr' ? 'Email gerekli' : 'Email required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = language === 'tr' ? 'Geçersiz email' : 'Invalid email'
        }
        if (!formData.message.trim()) newErrors.message = language === 'tr' ? 'Mesaj gerekli' : 'Message required'
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = validate()
        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true)
            setTimeout(() => {
                setFormData({ name: '', email: '', message: '' })
                setSubmitted(false)
            }, 3000)
        } else {
            setErrors(newErrors)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' })
        }
    }

    return (
        <section style={{
            minHeight: '100vh',
            padding: '120px 20px 50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
        }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ width: '100%', maxWidth: '600px' }}
            >
                <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                    color: 'var(--primary-color)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    {t('contact.title')}
                </h2>

                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-color)',
                    opacity: 0.7,
                    marginBottom: '3rem',
                    fontSize: '1.1rem'
                }}>
                    {language === 'tr'
                        ? 'Benimle iletişime geçin, projeleriniz hakkında konuşalım'
                        : 'Get in touch with me, let\'s talk about your projects'}
                </p>

                {submitted ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                            background: 'rgba(0, 243, 255, 0.1)',
                            border: '1px solid var(--primary-color)',
                            borderRadius: '20px',
                            padding: '3rem',
                            textAlign: 'center'
                        }}
                    >
                        <CheckCircle size={64} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                        <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                            {language === 'tr' ? 'Mesaj Gönderildi!' : 'Message Sent!'}
                        </h3>
                        <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                            {language === 'tr' ? 'En kısa sürede dönüş yapacağım.' : 'I\'ll get back to you soon.'}
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        style={{
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '20px',
                            padding: '2.5rem'
                        }}
                    >
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                color: 'var(--text-color)',
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                            }}>
                                <User size={16} />
                                {t('contact.name')}
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t('contact.namePlaceholder')}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: errors.name ? '1px solid #ff4444' : '1px solid var(--glass-border)',
                                    borderRadius: '10px',
                                    color: 'var(--text-color)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                onBlur={(e) => !errors.name && (e.target.style.borderColor = 'var(--glass-border)')}
                            />
                            {errors.name && <span style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                color: 'var(--text-color)',
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                            }}>
                                <Mail size={16} />
                                {t('contact.email')}
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={t('contact.emailPlaceholder')}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: errors.email ? '1px solid #ff4444' : '1px solid var(--glass-border)',
                                    borderRadius: '10px',
                                    color: 'var(--text-color)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                onBlur={(e) => !errors.email && (e.target.style.borderColor = 'var(--glass-border)')}
                            />
                            {errors.email && <span style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                color: 'var(--text-color)',
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                            }}>
                                <MessageSquare size={16} />
                                {t('contact.message')}
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={t('contact.messagePlaceholder')}
                                rows="5"
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: errors.message ? '1px solid #ff4444' : '1px solid var(--glass-border)',
                                    borderRadius: '10px',
                                    color: 'var(--text-color)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                                onBlur={(e) => !errors.message && (e.target.style.borderColor = 'var(--glass-border)')}
                            />
                            {errors.message && <span style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>{errors.message}</span>}
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 243, 255, 0.5)' }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '1.2rem',
                                background: 'var(--primary-color)',
                                border: 'none',
                                borderRadius: '10px',
                                color: '#000',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Send size={20} />
                            {t('contact.send')}
                        </motion.button>
                    </motion.form>
                )}
            </motion.div>
        </section>
    )
}

export default Contact
