import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Trophy, RotateCcw, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const MiniGame = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [coins, setCoins] = useState(0);
    const [timer, setTimer] = useState(0);
    const gameLoopRef = useRef(null);
    const keysRef = useRef({ left: false, right: false, jump: false });
    const timerRef = useRef(null);

    // Game state
    const gameStateRef = useRef({
        player: {
            x: 100,
            y: 200,
            width: 32,
            height: 32,
            velocityX: 0,
            velocityY: 0,
            speed: 5,
            jumpForce: -13, // Slightly stronger jump for harder platforms
            isJumping: false,
            color: '#00f2ea'
        },
        platforms: [
            // Ground
            { x: 0, y: 350, width: 800, height: 50, color: '#1a1f3a' },

            // Level 1 - Easy jumps
            { x: 100, y: 280, width: 100, height: 20, color: '#2a2f4a' },
            { x: 280, y: 250, width: 80, height: 20, color: '#2a2f4a' },
            { x: 450, y: 280, width: 100, height: 20, color: '#2a2f4a' },
            { x: 630, y: 250, width: 90, height: 20, color: '#2a2f4a' },

            // Level 2 - Medium difficulty
            { x: 50, y: 200, width: 80, height: 20, color: '#2a2f4a' },
            { x: 200, y: 170, width: 70, height: 20, color: '#2a2f4a' },
            { x: 350, y: 190, width: 80, height: 20, color: '#2a2f4a' },
            { x: 520, y: 160, width: 70, height: 20, color: '#2a2f4a' },
            { x: 670, y: 180, width: 80, height: 20, color: '#2a2f4a' },

            // Level 3 - Hard jumps
            { x: 120, y: 120, width: 60, height: 20, color: '#2a2f4a' },
            { x: 260, y: 100, width: 60, height: 20, color: '#2a2f4a' },
            { x: 400, y: 110, width: 70, height: 20, color: '#2a2f4a' },
            { x: 550, y: 90, width: 60, height: 20, color: '#2a2f4a' },

            // Level 4 - Very hard (top level)
            { x: 180, y: 50, width: 50, height: 20, color: '#2a2f4a' },
            { x: 320, y: 40, width: 50, height: 20, color: '#2a2f4a' },
            { x: 460, y: 50, width: 50, height: 20, color: '#2a2f4a' },
            { x: 600, y: 35, width: 50, height: 20, color: '#2a2f4a' },
        ],
        coins: [
            // Level 1 coins
            { x: 140, y: 250, width: 20, height: 20, collected: false },
            { x: 310, y: 220, width: 20, height: 20, collected: false },
            { x: 490, y: 250, width: 20, height: 20, collected: false },
            { x: 670, y: 220, width: 20, height: 20, collected: false },

            // Level 2 coins
            { x: 80, y: 170, width: 20, height: 20, collected: false },
            { x: 230, y: 140, width: 20, height: 20, collected: false },
            { x: 380, y: 160, width: 20, height: 20, collected: false },
            { x: 550, y: 130, width: 20, height: 20, collected: false },
            { x: 700, y: 150, width: 20, height: 20, collected: false },

            // Level 3 coins
            { x: 150, y: 90, width: 20, height: 20, collected: false },
            { x: 290, y: 70, width: 20, height: 20, collected: false },
            { x: 430, y: 80, width: 20, height: 20, collected: false },
            { x: 580, y: 60, width: 20, height: 20, collected: false },

            // Level 4 coins (bonus - very hard to get)
            { x: 210, y: 20, width: 20, height: 20, collected: false },
            { x: 350, y: 10, width: 20, height: 20, collected: false },
            { x: 490, y: 20, width: 20, height: 20, collected: false },
            { x: 630, y: 5, width: 20, height: 20, collected: false },

            // Extra scattered coins for longer gameplay
            { x: 400, y: 320, width: 20, height: 20, collected: false },
            { x: 720, y: 310, width: 20, height: 20, collected: false },
            { x: 30, y: 260, width: 20, height: 20, collected: false },
            { x: 750, y: 240, width: 20, height: 20, collected: false },
            { x: 20, y: 150, width: 20, height: 20, collected: false },
            { x: 770, y: 120, width: 20, height: 20, collected: false },
            { x: 10, y: 80, width: 20, height: 20, collected: false },
            { x: 780, y: 50, width: 20, height: 20, collected: false },
        ],
        totalCoins: 25, // Total number of coins
        gravity: 0.6,
        canvasWidth: 800,
        canvasHeight: 400
    });

    // Handle keyboard input
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;
            if (e.key === 'ArrowLeft') keysRef.current.left = true;
            if (e.key === 'ArrowRight') keysRef.current.right = true;
            if (e.key === 'ArrowUp' || e.key === ' ') {
                e.preventDefault();
                keysRef.current.jump = true;
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft') keysRef.current.left = false;
            if (e.key === 'ArrowRight') keysRef.current.right = false;
            if (e.key === 'ArrowUp' || e.key === ' ') keysRef.current.jump = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameOver]);

    // Touch controls
    const handleTouchButton = useCallback((action, isPressed) => {
        if (gameOver) return;
        if (action === 'left') keysRef.current.left = isPressed;
        if (action === 'right') keysRef.current.right = isPressed;
        if (action === 'jump') keysRef.current.jump = isPressed;
    }, [gameOver]);

    // Timer
    useEffect(() => {
        if (gameOver || gameWon) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            return;
        }

        timerRef.current = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [gameOver, gameWon]);

    // Game loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const state = gameStateRef.current;

        const gameLoop = () => {
            if (gameOver) return;

            // Clear canvas
            ctx.fillStyle = '#0a0e27';
            ctx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);

            // Draw gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, state.canvasHeight);
            gradient.addColorStop(0, '#0a0e27');
            gradient.addColorStop(1, '#1a1f3a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);

            // Update player
            const player = state.player;

            // Horizontal movement
            if (keysRef.current.left) {
                player.velocityX = -player.speed;
            } else if (keysRef.current.right) {
                player.velocityX = player.speed;
            } else {
                player.velocityX = 0;
            }

            // Jump
            if (keysRef.current.jump && !player.isJumping) {
                player.velocityY = player.jumpForce;
                player.isJumping = true;
            }

            // Apply gravity
            player.velocityY += state.gravity;

            // Update position
            player.x += player.velocityX;
            player.y += player.velocityY;

            // Boundary check
            if (player.x < 0) player.x = 0;
            if (player.x + player.width > state.canvasWidth) {
                player.x = state.canvasWidth - player.width;
            }

            // Platform collision
            let onPlatform = false;
            state.platforms.forEach(platform => {
                if (
                    player.x + player.width > platform.x &&
                    player.x < platform.x + platform.width &&
                    player.y + player.height > platform.y &&
                    player.y + player.height < platform.y + platform.height &&
                    player.velocityY > 0
                ) {
                    player.y = platform.y - player.height;
                    player.velocityY = 0;
                    player.isJumping = false;
                    onPlatform = true;
                }
            });

            // Fall off screen = game over
            if (player.y > state.canvasHeight) {
                setGameOver(true);
            }

            // Coin collision
            state.coins.forEach(coin => {
                if (
                    !coin.collected &&
                    player.x + player.width > coin.x &&
                    player.x < coin.x + coin.width &&
                    player.y + player.height > coin.y &&
                    player.y < coin.y + coin.height
                ) {
                    coin.collected = true;
                    const newCoins = coins + 1;
                    setCoins(newCoins);
                    setScore(prev => prev + 100);

                    // Check if all coins collected (WIN!)
                    if (newCoins >= state.totalCoins) {
                        setGameWon(true);
                    }
                }
            });

            // Draw platforms
            state.platforms.forEach(platform => {
                ctx.fillStyle = platform.color;
                ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

                // Neon border
                ctx.strokeStyle = '#00f2ea';
                ctx.lineWidth = 2;
                ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
            });

            // Draw coins
            state.coins.forEach(coin => {
                if (!coin.collected) {
                    // Coin glow effect
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#ffd700';
                    ctx.fillStyle = '#ffd700';
                    ctx.beginPath();
                    ctx.arc(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            // Draw player
            ctx.shadowBlur = 20;
            ctx.shadowColor = player.color;
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);
            ctx.shadowBlur = 0;

            // Draw player eyes (cute touch)
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(player.x + 8, player.y + 10, 6, 6);
            ctx.fillRect(player.x + 18, player.y + 10, 6, 6);

            gameLoopRef.current = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
            }
        };
    }, [gameOver]);

    const handleReset = () => {
        setScore(0);
        setCoins(0);
        setTimer(0);
        setGameOver(false);
        setGameWon(false);
        keysRef.current = { left: false, right: false, jump: false };

        // Reset game state
        const state = gameStateRef.current;
        state.player.x = 100;
        state.player.y = 200;
        state.player.velocityX = 0;
        state.player.velocityY = 0;
        state.player.isJumping = false;
        state.coins.forEach(coin => coin.collected = false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(10, 14, 39, 0.95)' }}
        >
            <div className="glass-strong rounded-2xl p-6 max-w-4xl w-full neon-border">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-2xl font-display text-white neon-text">Super MS Bros 🎮</h3>
                        <p className="text-white/70 text-sm font-heading mt-1">
                            Collect coins and reach the top!
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
                <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-3">
                        <div className="glass rounded-lg px-4 py-2">
                            <span className="text-white/70 text-sm font-heading">Score: </span>
                            <span className="text-neon-cyan font-display text-xl">{score}</span>
                        </div>
                        <div className="glass rounded-lg px-4 py-2">
                            <span className="text-white/70 text-sm font-heading">Coins: </span>
                            <span className="text-yellow-400 font-display text-xl">🪙 {coins}/25</span>
                        </div>
                        <div className="glass rounded-lg px-4 py-2">
                            <span className="text-white/70 text-sm font-heading">Time: </span>
                            <span className="text-neon-cyan font-display text-xl">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
                        </div>
                    </div>

                    {gameWon && (
                        <div className="flex items-center space-x-3">
                            <div className="glass rounded-lg px-4 py-2 flex items-center space-x-2 neon-border animate-pulse">
                                <Trophy className="w-5 h-5 text-yellow-400" />
                                <span className="text-yellow-400 font-heading font-bold">🎉 FINISH! 🎉</span>
                            </div>
                            <button
                                onClick={handleReset}
                                className="glass rounded-lg px-4 py-2 hover:glass-strong hover:neon-border transition-smooth flex items-center space-x-2"
                            >
                                <RotateCcw className="w-4 h-4 text-white" />
                                <span className="text-white font-heading text-sm">Play Again</span>
                            </button>
                        </div>
                    )}

                    {gameOver && !gameWon && (
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

                {/* Canvas */}
                <div className="relative rounded-xl overflow-hidden glass mb-4">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={400}
                        className="w-full h-auto"
                        style={{ maxHeight: '400px' }}
                    />
                </div>

                {/* Controls */}
                <div className="space-y-3">
                    {/* Desktop Instructions */}
                    <div className="hidden md:block">
                        <p className="text-white/50 text-xs font-heading text-center mb-2">
                            Desktop: Use ← → arrows to move • ↑ or Space to jump
                        </p>
                        <div className="flex justify-center space-x-2">
                            <div className="glass rounded px-3 py-1">
                                <span className="text-neon-cyan text-xs font-heading">← Left</span>
                            </div>
                            <div className="glass rounded px-3 py-1">
                                <span className="text-neon-cyan text-xs font-heading">→ Right</span>
                            </div>
                            <div className="glass rounded px-3 py-1">
                                <span className="text-neon-cyan text-xs font-heading">↑ Jump</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Touch Controls */}
                    <div className="md:hidden flex justify-center items-center space-x-4">
                        <div className="flex space-x-2">
                            <button
                                onTouchStart={() => handleTouchButton('left', true)}
                                onTouchEnd={() => handleTouchButton('left', false)}
                                onMouseDown={() => handleTouchButton('left', true)}
                                onMouseUp={() => handleTouchButton('left', false)}
                                className="glass-strong rounded-lg p-4 hover:neon-border transition-smooth active:scale-95"
                            >
                                <ArrowLeft className="w-8 h-8 text-neon-cyan" />
                            </button>
                            <button
                                onTouchStart={() => handleTouchButton('right', true)}
                                onTouchEnd={() => handleTouchButton('right', false)}
                                onMouseDown={() => handleTouchButton('right', true)}
                                onMouseUp={() => handleTouchButton('right', false)}
                                className="glass-strong rounded-lg p-4 hover:neon-border transition-smooth active:scale-95"
                            >
                                <ArrowRight className="w-8 h-8 text-neon-cyan" />
                            </button>
                        </div>
                        <button
                            onTouchStart={() => handleTouchButton('jump', true)}
                            onTouchEnd={() => handleTouchButton('jump', false)}
                            onMouseDown={() => handleTouchButton('jump', true)}
                            onMouseUp={() => handleTouchButton('jump', false)}
                            className="glass-strong rounded-lg p-4 hover:neon-border transition-smooth active:scale-95"
                        >
                            <ArrowUp className="w-8 h-8 text-yellow-400" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MiniGame;
