import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function ShootingStar({ index }) {
    const ref = useRef()
    const speed = useRef(0.8 + Math.random() * 0.6)
    const offset = useRef(Math.random() * 100)

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed.current + offset.current

        // Continuous circular motion around Earth
        const radius = 3.5 + Math.sin(t * 0.5) * 0.8
        const angle = t * 0.8
        const height = Math.sin(t * 0.3) * 2.5

        ref.current.position.x = Math.cos(angle) * radius
        ref.current.position.y = height
        ref.current.position.z = Math.sin(angle) * radius

        // Point in direction of movement
        const nextAngle = angle + 0.1
        const nextX = Math.cos(nextAngle) * radius
        const nextZ = Math.sin(nextAngle) * radius
        ref.current.lookAt(nextX, height, nextZ)
    })

    return (
        <group ref={ref}>
            {/* Main bright star */}
            <mesh>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Outer glow */}
            <mesh>
                <sphereGeometry args={[0.25, 16, 16]} />
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Trail */}
            {[...Array(18)].map((_, i) => (
                <mesh key={i} position={[-i * 0.18, 0, 0]}>
                    <sphereGeometry args={[0.08 * (1 - i * 0.04), 8, 8]} />
                    <meshBasicMaterial
                        color={i < 4 ? "#ffffff" : "#00f3ff"}
                        transparent
                        opacity={Math.max(0.15, 1 - i * 0.05)}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}

            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
                <mesh
                    key={`sparkle-${i}`}
                    position={[-i * 0.25 + (Math.random() - 0.5) * 0.15, (Math.random() - 0.5) * 0.15, 0]}
                >
                    <sphereGeometry args={[0.03, 4, 4]} />
                    <meshBasicMaterial
                        color="#bc13fe"
                        transparent
                        opacity={0.9 - i * 0.1}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    )
}

function HolographicEarth() {
    const earthRef = useRef()
    const [hovered, setHovered] = React.useState(false)

    useFrame((state) => {
        earthRef.current.rotation.y += 0.003

        const targetScale = hovered ? 1.2 : 1
        earthRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    })

    return (
        <group
            ref={earthRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Main Earth sphere - wireframe */}
            <Sphere args={[1.8, 64, 64]}>
                <meshStandardMaterial
                    color={hovered ? "#bc13fe" : "#00f3ff"}
                    emissive={hovered ? "#bc13fe" : "#00f3ff"}
                    emissiveIntensity={0.6}
                    wireframe={true}
                    transparent
                    opacity={0.8}
                />
            </Sphere>

            {/* Solid inner sphere for visibility */}
            <Sphere args={[1.75, 32, 32]}>
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Latitude lines */}
            {[...Array(10)].map((_, i) => {
                const lat = (i - 5) * 0.3
                const radius = Math.cos(lat) * 1.82
                return (
                    <mesh key={`lat-${i}`} rotation={[Math.PI / 2, 0, 0]} position={[0, Math.sin(lat) * 1.82, 0]}>
                        <torusGeometry args={[radius, 0.012, 16, 100]} />
                        <meshBasicMaterial
                            color="#00f3ff"
                            transparent
                            opacity={0.6}
                            emissive="#00f3ff"
                            emissiveIntensity={0.3}
                        />
                    </mesh>
                )
            })}

            {/* Longitude lines */}
            {[...Array(16)].map((_, i) => (
                <mesh key={`lon-${i}`} rotation={[0, (i / 16) * Math.PI * 2, 0]}>
                    <torusGeometry args={[1.82, 0.012, 16, 100]} />
                    <meshBasicMaterial
                        color="#00f3ff"
                        transparent
                        opacity={0.5}
                        emissive="#00f3ff"
                        emissiveIntensity={0.3}
                    />
                </mesh>
            ))}

            {/* Equator highlight */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.84, 0.018, 16, 100]} />
                <meshBasicMaterial
                    color="#bc13fe"
                    transparent
                    opacity={0.8}
                    emissive="#bc13fe"
                    emissiveIntensity={0.8}
                />
            </mesh>

            {/* Rotating data points */}
            {[...Array(50)].map((_, i) => {
                const theta = Math.random() * Math.PI * 2
                const phi = Math.random() * Math.PI
                const x = 1.8 * Math.sin(phi) * Math.cos(theta)
                const y = 1.8 * Math.cos(phi)
                const z = 1.8 * Math.sin(phi) * Math.sin(theta)

                return (
                    <mesh key={`point-${i}`} position={[x, y, z]}>
                        <sphereGeometry args={[0.025, 8, 8]} />
                        <meshBasicMaterial
                            color={i % 3 === 0 ? "#bc13fe" : "#00f3ff"}
                            emissive={i % 3 === 0 ? "#bc13fe" : "#00f3ff"}
                            emissiveIntensity={1}
                        />
                    </mesh>
                )
            })}

            {/* Outer glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.2, 0.02, 16, 100]} />
                <meshBasicMaterial
                    color="#00f3ff"
                    transparent
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
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
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
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
            <dodecahedronGeometry args={[0.08, 0]} />
            <meshPhongMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.3} />
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
            background: 'radial-gradient(ellipse at center, #0f1b2e 0%, #050a14 50%, #000000 100%)'
        }}>
            <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                <color attach="background" args={['#000']} />
                <fog attach="fog" args={['#000', 10, 30]} />

                {/* Enhanced Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={3} color="#00f3ff" />
                <pointLight position={[-10, -10, -10]} intensity={3} color="#bc13fe" />
                <pointLight position={[0, 0, 8]} intensity={2} color="#ffffff" />
                <spotLight
                    position={[0, 5, 5]}
                    angle={0.6}
                    penumbra={1}
                    intensity={2}
                    color="#00f3ff"
                />

                {/* Holographic Earth */}
                <HolographicEarth />

                {/* Continuously orbiting shooting stars */}
                {[...Array(12)].map((_, i) => (
                    <ShootingStar key={i} index={i} />
                ))}

                <ParticleField />
                <Sparkles count={250} scale={20} size={5} speed={0.4} color="#00f3ff" />
                <Stars radius={60} depth={60} count={12000} factor={6} saturation={0} fade speed={2} />

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.4}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    )
}

export default Background
