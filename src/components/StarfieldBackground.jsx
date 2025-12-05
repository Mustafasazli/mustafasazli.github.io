import React, { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        const starCount = 300; // Increased from 200

        // Create stars with varied properties
        for (let i = 0; i < starCount; i++) {
            const size = Math.random();
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: size * 2, // Larger stars
                opacity: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.02 + 0.005,
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                color: size > 0.7 ? 'cyan' : size > 0.4 ? 'white' : 'blue', // Color variety
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }

        // Add some shooting stars
        const shootingStars = [];
        const createShootingStar = () => {
            if (Math.random() > 0.98) { // 2% chance each frame
                shootingStars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height * 0.5,
                    length: Math.random() * 80 + 40,
                    speed: Math.random() * 8 + 4,
                    opacity: 1,
                    angle: Math.PI / 4 + Math.random() * 0.5,
                });
            }
        };

        let animationFrameId;
        let frame = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            // Draw regular stars with enhanced effects
            stars.forEach((star) => {
                // Smooth pulsing effect
                star.pulsePhase += star.twinkleSpeed;
                const pulse = Math.sin(star.pulsePhase) * 0.3 + 0.7;
                const currentOpacity = star.opacity * pulse;

                // Glow effect
                const gradient = ctx.createRadialGradient(
                    star.x, star.y, 0,
                    star.x, star.y, star.radius * 3
                );

                let color;
                if (star.color === 'cyan') {
                    color = `rgba(0, 255, 255, ${currentOpacity})`;
                    gradient.addColorStop(0, `rgba(0, 255, 255, ${currentOpacity})`);
                    gradient.addColorStop(0.5, `rgba(0, 255, 255, ${currentOpacity * 0.3})`);
                    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
                } else if (star.color === 'blue') {
                    color = `rgba(100, 150, 255, ${currentOpacity})`;
                    gradient.addColorStop(0, `rgba(100, 150, 255, ${currentOpacity})`);
                    gradient.addColorStop(0.5, `rgba(100, 150, 255, ${currentOpacity * 0.3})`);
                    gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
                } else {
                    color = `rgba(255, 255, 255, ${currentOpacity})`;
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
                    gradient.addColorStop(0.5, `rgba(255, 255, 255, ${currentOpacity * 0.3})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                }

                // Draw star with glow
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Add sparkle effect for larger stars
                if (star.radius > 1.5 && pulse > 0.9) {
                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y - star.radius * 2);
                    ctx.lineTo(star.x, star.y + star.radius * 2);
                    ctx.moveTo(star.x - star.radius * 2, star.y);
                    ctx.lineTo(star.x + star.radius * 2, star.y);
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });

            // Create and animate shooting stars
            if (frame % 60 === 0) {
                createShootingStar();
            }

            shootingStars.forEach((star, index) => {
                star.x += Math.cos(star.angle) * star.speed;
                star.y += Math.sin(star.angle) * star.speed;
                star.opacity -= 0.01;

                if (star.opacity > 0) {
                    const gradient = ctx.createLinearGradient(
                        star.x, star.y,
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    gradient.addColorStop(0, `rgba(0, 255, 255, ${star.opacity})`);
                    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(
                        star.x - Math.cos(star.angle) * star.length,
                        star.y - Math.sin(star.angle) * star.length
                    );
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                } else {
                    shootingStars.splice(index, 1);
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                background: 'linear-gradient(to bottom, #0a0e27 0%, #0f1629 50%, #1a1f3a 100%)',
            }}
        />
    );
};

export default StarfieldBackground;
