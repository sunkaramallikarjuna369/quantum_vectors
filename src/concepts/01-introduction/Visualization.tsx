import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// 3D Vector Arrow Component
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

// Classical Vector Visualization
export function ClassicalVectorVisualization() {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Vector3D start={[0, 0, 0]} end={[1.5, 1, 0]} color="#6366f1" label="Force" />
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

// Quantum state scene - must be inside Canvas
function QuantumStateScene() {
  const stateRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (stateRef.current) {
      stateRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const theta = Math.PI / 3
  const phi = Math.PI / 4
  const stateVector: [number, number, number] = [
    Math.sin(theta) * Math.cos(phi),
    Math.sin(theta) * Math.sin(phi),
    Math.cos(theta)
  ]

  return (
    <group>
      {/* Sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Axes */}
      <Vector3D start={[0, 0, 0]} end={[1.3, 0, 0]} color="#ef4444" label="X" />
      <Vector3D start={[0, 0, 0]} end={[0, 1.3, 0]} color="#22c55e" label="Y" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.3]} color="#3b82f6" label="Z |0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1.3]} color="#3b82f6" label="|1⟩" />
      
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
    </group>
  )
}

// Quantum State Vector on Bloch Sphere
export function QuantumStateVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <QuantumStateScene />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { ClassicalVectorVisualization, QuantumStateVisualization }
