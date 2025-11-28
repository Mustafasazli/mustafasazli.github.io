import React from 'react'
import { motion } from 'framer-motion'

const FloatingShapes = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
            {/* Circle */}
            <motion.div
                animate={{
                    y: [0, -50, 0],
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,243,255,0.1) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(40px)'
                }}
            />

            {/* Square */}
            <motion.div
                animate={{
                    y: [0, 50, 0],
                    rotate: [0, -360],
                    scale: [1, 1.5, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '20%',
                    background: 'radial-gradient(circle, rgba(188,19,254,0.1) 0%, rgba(0,0,0,0) 70%)',
                    filter: 'blur(50px)'
                }}
            />
        </div>
    )
}

export default FloatingShapes
