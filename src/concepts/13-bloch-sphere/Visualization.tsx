import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function Vector3D({ start = [0, 0, 0], end = [1, 0, 0], color = '#6366f1', label = '' }: { 
  start?: number[], end?: number[], color?: string, label?: string 
}) {
  return (
    <group>
      <Line
        points={[[start[0], start[1], start[2]], [end[0], end[1], end[2]]]}
        color={color}
        lineWidth={3}
      />
      <mesh position={[end[0], end[1], end[2]]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {label && (
        <Text position={[end[0] + 0.2, end[1] + 0.2, end[2]]} fontSize={0.2} color={color}>
          {label}
        </Text>
      )}
    </group>
  )
}

interface BlochSphereProps {
  theta: number
  phi: number
}

// Bloch sphere scene - must be inside Canvas
function BlochSphereScene({ theta, phi }: { theta: number, phi: number }) {
  const stateRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (stateRef.current) {
      stateRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  const stateVector: [number, number, number] = useMemo(() => {
    const x = Math.sin(theta) * Math.cos(phi)
    const y = Math.sin(theta) * Math.sin(phi)
    const z = Math.cos(theta)
    return [x, y, z]
  }, [theta, phi])

  return (
    <group>
      {/* Bloch sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Axes */}
      <Vector3D start={[0, 0, 0]} end={[1.3, 0, 0]} color="#ef4444" label="X" />
      <Vector3D start={[0, 0, 0]} end={[0, 1.3, 0]} color="#22c55e" label="Y" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.3]} color="#3b82f6" label="Z |0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1.3]} color="#a855f7" label="|1⟩" />
      
      {/* State vector */}
      <group ref={stateRef}>
        <Vector3D start={[0, 0, 0]} end={stateVector} color="#f59e0b" label="|ψ⟩" />
        <Sphere args={[0.08, 16, 16]} position={stateVector}>
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </Sphere>
      </group>
      
      {/* Equator circle */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [Math.cos(angle), Math.sin(angle), 0]
        })}
        color="#475569"
        lineWidth={1}
      />
      
      {/* Meridian circles */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [Math.cos(angle), 0, Math.sin(angle)]
        })}
        color="#475569"
        lineWidth={1}
      />
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [0, Math.cos(angle), Math.sin(angle)]
        })}
        color="#475569"
        lineWidth={1}
      />
      
      {/* Theta arc */}
      <Line
        points={Array.from({ length: 17 }, (_, i) => {
          const t = (i / 16) * theta
          return [
            0.3 * Math.sin(t) * Math.cos(phi),
            0.3 * Math.sin(t) * Math.sin(phi),
            0.3 * Math.cos(t)
          ]
        })}
        color="#f59e0b"
        lineWidth={2}
      />
      
      {/* Phi arc on equator */}
      <Line
        points={Array.from({ length: 17 }, (_, i) => {
          const p = (i / 16) * phi
          return [0.4 * Math.cos(p), 0.4 * Math.sin(p), 0]
        })}
        color="#a855f7"
        lineWidth={2}
      />
    </group>
  )
}

export function InteractiveBlochSphere({ theta = Math.PI / 4, phi = Math.PI / 4 }: BlochSphereProps) {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <BlochSphereScene theta={theta} phi={phi} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function BlochSphereStatesVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Important states */}
      {/* |0⟩ - North pole */}
      <Sphere args={[0.1, 16, 16]} position={[0, 0, 1]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </Sphere>
      <Text position={[0.25, 0, 1.1]} fontSize={0.12} color="#3b82f6">|0⟩</Text>
      
      {/* |1⟩ - South pole */}
      <Sphere args={[0.1, 16, 16]} position={[0, 0, -1]}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </Sphere>
      <Text position={[0.25, 0, -1.1]} fontSize={0.12} color="#ef4444">|1⟩</Text>
      
      {/* |+⟩ - +X */}
      <Sphere args={[0.1, 16, 16]} position={[1, 0, 0]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
      </Sphere>
      <Text position={[1.2, 0, 0]} fontSize={0.12} color="#22c55e">|+⟩</Text>
      
      {/* |-⟩ - -X */}
      <Sphere args={[0.1, 16, 16]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
      </Sphere>
      <Text position={[-1.2, 0, 0]} fontSize={0.12} color="#a855f7">|-⟩</Text>
      
      {/* |+i⟩ - +Y */}
      <Sphere args={[0.1, 16, 16]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
      </Sphere>
      <Text position={[0, 1.2, 0]} fontSize={0.12} color="#f59e0b">|+i⟩</Text>
      
      {/* |-i⟩ - -Y */}
      <Sphere args={[0.1, 16, 16]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
      </Sphere>
      <Text position={[0, -1.2, 0]} fontSize={0.12} color="#ec4899">|-i⟩</Text>
      
      {/* Equator */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [Math.cos(angle), Math.sin(angle), 0]
        })}
        color="#475569"
        lineWidth={1}
      />
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { InteractiveBlochSphere, BlochSphereStatesVisualization }
