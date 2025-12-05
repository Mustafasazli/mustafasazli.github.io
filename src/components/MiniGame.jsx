import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { X, Trophy, RotateCcw } from 'lucide-react';

function Player({ position, onCollision }) {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
                color="#00f2ea"
                emissive="#00f2ea"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

function Obstacle({ position, speed, onPassed }) {
    const meshRef = useRef();
    const [passed, setPassed] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.z += speed;
            meshRef.current.rotation.x += 0.02;
            meshRef.current.rotation.y += 0.02;

            // Check if passed player
            if (meshRef.current.position.z > 2 && !passed) {
                setPassed(true);
                onPassed();
            }

            // Reset position when off screen
            if (meshRef.current.position.z > 10) {
                meshRef.current.position.z = -20;
                setPassed(false);
            }
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
                color="#ff006e"
                emissive="#ff006e"
                emissiveIntensity={0.3}
                wireframe
            />
        </mesh>
    );
}

const MiniGame = ({ onClose }) => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [playerX, setPlayerX] = useState(0);
    const [obstacles, setObstacles] = useState([
        { id: 1, x: -2, z: -10, speed: 0.1 },
        { id: 2, x: 0, z: -15, speed: 0.12 },
        { id: 3, x: 2, z: -20, speed: 0.11 },
        { id: 4, x: -1, z: -25, speed: 0.13 },
        { id: 5, x: 1, z: -30, speed: 0.1 },
    ]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (gameOver) return;

            if (e.key === 'ArrowLeft' && playerX > -2) {
                setPlayerX(prev => prev - 1);
            } else if (e.key === 'ArrowRight' && playerX < 2) {
                setPlayerX(prev => prev + 1);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [playerX, gameOver]);

    const handleObstaclePassed = () => {
        if (!gameOver) {
            setScore(prev => prev + 10);
        }
    };

    const handleReset = () => {
        setScore(0);
        setGameOver(false);
        setPlayerX(0);
        setObstacles([
            { id: 1, x: -2, z: -10, speed: 0.1 },
            { id: 2, x: 0, z: -15, speed: 0.12 },
            { id: 3, x: 2, z: -20, speed: 0.11 },
            { id: 4, x: -1, z: -25, speed: 0.13 },
            { id: 5, x: 1, z: -30, speed: 0.1 },
        ]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(10, 14, 39, 0.95)' }}
        >
            <div className="glass-strong rounded-2xl p-6 max-w-2xl w-full neon-border">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-2xl font-display text-white neon-text">Neon Dodge</h3>
                        <p className="text-white/70 text-sm font-heading mt-1">
                            Use ← → arrows to dodge obstacles!
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 glass rounded-lg hover:glass-strong hover:neon-border transition-smooth"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Score & Status */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="glass rounded-lg px-4 py-2">
                        <span className="text-white/70 text-sm font-heading">Score: </span>
                        <span className="text-neon-cyan font-display text-xl">{score}</span>
                    </div>

                    {gameOver && (
                        <div className="flex items-center space-x-3">
                            <div className="glass rounded-lg px-4 py-2 flex items-center space-x-2 neon-border">
                                <Trophy className="w-5 h-5 text-neon-cyan" />
                                <span className="text-neon-cyan font-heading">Game Over!</span>
                            </div>
                            <button
                                onClick={handleReset}
                                className="glass rounded-lg px-4 py-2 hover:glass-strong hover:neon-border transition-smooth flex items-center space-x-2"
                            >
                                <RotateCcw className="w-4 h-4 text-white" />
                                <span className="text-white font-heading text-sm">Restart</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* 3D Canvas */}
                <div className="h-96 rounded-xl overflow-hidden glass">
                    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f2ea" />

                        {/* Player */}
                        <Player position={[playerX, 0, 0]} />

                        {/* Obstacles */}
                        {!gameOver && obstacles.map((obstacle) => (
                            <Obstacle
                                key={obstacle.id}
                                position={[obstacle.x, 0, obstacle.z]}
                                speed={obstacle.speed}
                                onPassed={handleObstaclePassed}
                            />
                        ))}

                        {/* Grid Floor */}
                        <gridHelper args={[20, 20, '#00f2ea', '#1a1f3a']} position={[0, -0.5, 0]} />
                    </Canvas>
                </div>

                {/* Instructions */}
                <div className="mt-4 space-y-2">
                    <p className="text-white/50 text-xs font-heading text-center">
                        Use ← and → arrow keys to move • Avoid red obstacles • Score points by dodging!
                    </p>
                    <div className="flex justify-center space-x-2">
                        <div className="glass rounded px-3 py-1">
                            <span className="text-neon-cyan text-xs font-heading">← Left</span>
                        </div>
                        <div className="glass rounded px-3 py-1">
                            <span className="text-neon-cyan text-xs font-heading">→ Right</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MiniGame;
