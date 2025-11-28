import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, OrbitControls, Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

function ShootingStar({ delay = 0, speed = 1 }) {
    const ref = useRef()
    const [isActive, setIsActive] = React.useState(false)
    const [startTime, setStartTime] = React.useState(0)

    useFrame((state) => {
        const t = state.clock.getElapsedTime() + delay

        if (Math.floor(t * 0.4) % 4 === 0 && !isActive && t - startTime > 4) {
            setIsActive(true)
            setStartTime(t)

            ref.current.position.set(
                -25 + Math.random() * 10,
                8 + Math.random() * 4,
                -15 + Math.random() * 5
            )
        }

        if (isActive) {
            ref.current.position.x += 0.3 * speed
            ref.current.position.y -= 0.2 * speed
            ref.current.position.z += 0.1 * speed

            if (ref.current.position.x > 30 || ref.current.position.y < -12) {
                setIsActive(false)
            }
        }
    })

    return (
        <group ref={ref}>
            {/* Simple small star - similar to background stars */}
            <mesh>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Very subtle trail */}
            {[...Array(3)].map((_, i) => (
                <mesh key={i} position={[-i * 0.15, i * 0.08, -i * 0.05]}>
                    <sphereGeometry args={[0.04 * (1 - i * 0.2), 4, 4]} />
                    <meshBasicMaterial
                        color="#00f3ff"
                        transparent
                        opacity={0.6 - i * 0.2}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    )
}

function HologramEarth() {
    const earthRef = useRef()
    const cloudsRef = useRef()
    const [hovered, setHovered] = React.useState(false)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        earthRef.current.rotation.y = t * 0.1
        cloudsRef.current.rotation.y = t * 0.12

        const targetScale = hovered ? 1.3 : 1.1
        earthRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    })

    return (
        <group
            ref={earthRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Main Earth with texture simulation */}
            <Sphere args={[1.8, 64, 64]}>
                <meshPhongMaterial
                    color="#1a5f9d"
                    transparent
                    opacity={0.9}
                    specular="#ffffff"
                    shininess={30}
                />
            </Sphere>

            {/* Cloud layer */}
            <group ref={cloudsRef}>
                <Sphere args={[1.82, 48, 48]}>
                    <meshPhongMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.3}
                        wireframe
                    />
                </Sphere>
            </group>

            {/* Detailed latitude lines */}
            {[...Array(12)].map((_, i) => {
                const lat = (i - 6) * 0.2
                const radius = Math.cos(lat) * 1.83
                return (
                    <mesh key={`lat-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[0, lat * 1.8, 0]}>
                        <torusGeometry args={[radius, 0.004, 8, 64]} />
                        <meshBasicMaterial
                            color="#00f3ff"
                            transparent
                            opacity={0.3}
                        />
                    </mesh>
                )
            })}

            {/* Detailed longitude lines */}
            {[...Array(24)].map((_, i) => (
                <mesh key={`lon-${i}`} rotation={[0, (i * Math.PI) / 12, 0]}>
                    <torusGeometry args={[1.83, 0.004, 8, 64]} />
                    <meshBasicMaterial
                        color="#00f3ff"
                        transparent
                        opacity={0.2}
                    />
                </mesh>
            ))}

            {/* Continent simulation with more detail */}
            {[...Array(200)].map((_, i) => {
                const theta = Math.random() * Math.PI * 2
                const phi = Math.acos(2 * Math.random() - 1)
                const size = 0.015 + Math.random() * 0.02
                const x = 1.84 * Math.sin(phi) * Math.cos(theta)
                const y = 1.84 * Math.sin(phi) * Math.sin(theta)
                const z = 1.84 * Math.cos(phi)

                // Create continent-like clusters
                const isContinent = Math.random() > 0.7
                const continentSize = isContinent ? size * 2 : size

                return (
                    <mesh key={`dot-${i}`} position={[x, y, z]}>
                        <sphereGeometry args={[continentSize, 6, 6]} />
                        <meshBasicMaterial
                            color={isContinent ? "#4CAF50" : "#8BC34A"}
                            transparent
                            opacity={isContinent ? 0.9 : 0.6}
                        />
                    </mesh>
                )
            })}

            {/* Enhanced equator */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.85, 0.006, 12, 80]} />
                <meshBasicMaterial
                    color="#bc13fe"
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Orbital rings */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2.3, 0.008, 16, 100]} />
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.3}
                />
            </mesh>

            <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
                <torusGeometry args={[2.1, 0.005, 12, 80]} />
                <meshBasicMaterial
                    color="#bc13fe"
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Data points floating around */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2 + Date.now() * 0.001
                const radius = 2.5
                return (
                    <group key={`data-${i}`} position={[
                        Math.cos(angle) * radius,
                        Math.sin(angle) * 0.3,
                        Math.sin(angle) * radius
                    ]}>
                        <mesh>
                            <sphereGeometry args={[0.05, 8, 8]} />
                            <meshBasicMaterial color="#00f3ff" />
                        </mesh>
                        <mesh position={[0.1, 0, 0]}>
                            <boxGeometry args={[0.15, 0.02, 0.02]} />
                            <meshBasicMaterial color="#ffffff" />
                        </mesh>
                    </group>
                )
            })}
        </group>
    )
}

function Moon() {
    const moonRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // Moon orbit around earth
        const orbitRadius = 4
        const orbitSpeed = 0.3
        moonRef.current.position.x = Math.cos(t * orbitSpeed) * orbitRadius
        moonRef.current.position.z = Math.sin(t * orbitSpeed) * orbitRadius
        moonRef.current.rotation.y = t * 0.2
    })

    return (
        <group ref={moonRef} position={[3, 0.5, 0]}>
            <Sphere args={[0.4, 32, 32]}>
                <meshPhongMaterial
                    color="#cccccc"
                    transparent
                    opacity={0.9}
                    specular="#ffffff"
                    shininess={20}
                />
            </Sphere>

            {/* Moon craters */}
            {[...Array(15)].map((_, i) => {
                const theta = Math.random() * Math.PI * 2
                const phi = Math.acos(2 * Math.random() - 1)
                const x = 0.41 * Math.sin(phi) * Math.cos(theta)
                const y = 0.41 * Math.sin(phi) * Math.sin(theta)
                const z = 0.41 * Math.cos(phi)

                return (
                    <mesh key={`crater-${i}`} position={[x, y, z]}>
                        <sphereGeometry args={[0.03 + Math.random() * 0.04, 6, 6]} />
                        <meshBasicMaterial color="#888888" />
                    </mesh>
                )
            })}
        </group>
    )
}

function Sun() {
    const sunRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        sunRef.current.rotation.y = t * 0.05

        // Pulsing glow effect
        const pulse = Math.sin(t * 2) * 0.1 + 1
        sunRef.current.scale.set(pulse, pulse, pulse)
    })

    return (
        <group ref={sunRef} position={[12, 3, -8]}>
            {/* Sun core */}
            <Sphere args={[1.5, 32, 32]}>
                <meshBasicMaterial color="#ffeb3b" />
            </Sphere>

            {/* Sun glow */}
            <Sphere args={[1.8, 32, 32]}>
                <meshBasicMaterial
                    color="#ff9800"
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Outer glow */}
            <Sphere args={[2.2, 32, 32]}>
                <meshBasicMaterial
                    color="#ff5722"
                    transparent
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Solar flares */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2
                const length = 0.8 + Math.random() * 0.4
                return (
                    <mesh key={`flare-${i}`} rotation={[0, 0, angle]}>
                        <coneGeometry args={[0.1, length, 8]} />
                        <meshBasicMaterial
                            color="#ffeb3b"
                            transparent
                            opacity={0.6}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                )
            })}
        </group>
    )
}

function ParticleField() {
    const count = 1000
    const mesh = useRef()

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 30 + Math.random() * 150
            const speed = 0.01 + Math.random() / 200
            const xFactor = -80 + Math.random() * 160
            const yFactor = -80 + Math.random() * 160
            const zFactor = -80 + Math.random() * 160
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])

    const dummy = useMemo(() => new THREE.Object3D(), [])

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            )
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshPhongMaterial color="#00f3ff" />
        </instancedMesh>
    )
}

const Background = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'radial-gradient(ellipse at bottom, #0a1628 0%, #020509 100%)'
        }}>
            <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
                <color attach="background" args={['#000']} />
                <fog attach="fog" args={['#000', 15, 40]} />

                {/* Enhanced lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[12, 3, -8]} intensity={3} color="#ffeb3b" /> {/* Sun light */}
                <pointLight position={[0, 0, 0]} intensity={1.5} color="#00f3ff" /> {/* Earth light */}
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#bc13fe" />

                <HologramEarth />
                <Moon />
                <Sun />
                <ParticleField />

                {/* Simple shooting stars */}
                {[...Array(8)].map((_, i) => (
                    <ShootingStar key={i} delay={i * 0.8} speed={0.5 + Math.random() * 0.3} />
                ))}

                <Sparkles count={200} scale={25} size={3} speed={0.2} color="#00f3ff" />
                <Stars radius={80} depth={80} count={8000} factor={4} saturation={0} fade speed={1.5} />

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.3}
                    maxPolarAngle={Math.PI / 1.8}
                    minPolarAngle={Math.PI / 4}
                    minDistance={8}
                    maxDistance={20}
                />
            </Canvas>
        </div>
    )
}

export default Background