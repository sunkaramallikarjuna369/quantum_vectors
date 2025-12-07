import { useRef } from 'react'
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

// Animated Hadamard scene - must be inside Canvas
function HadamardScene() {
  const stateRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)
  
  useFrame((state) => {
    const t = (Math.sin(state.clock.elapsedTime) + 1) / 2
    progressRef.current = t
    if (stateRef.current) {
      stateRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })


  return (
    <group ref={stateRef}>
      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Axes */}
      <Vector3D start={[0, 0, 0]} end={[1.2, 0, 0]} color="#22c55e" label="X |+⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.2]} color="#3b82f6" label="Z |0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1.2]} color="#ef4444" label="|1⟩" />
      
      {/* Animated state vector - using a simple animated approach */}
      <AnimatedStateVector />
      
      {/* Equator */}
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

// Animated state vector component
function AnimatedStateVector() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const t = (Math.sin(state.clock.elapsedTime) + 1) / 2
    const x = t
    const z = 1 - t
    if (meshRef.current) {
      meshRef.current.position.set(x, 0, z)
    }
  })

  return (
    <group>
      <Sphere ref={meshRef} args={[0.1, 16, 16]} position={[0, 0, 1]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
      </Sphere>
    </group>
  )
}

export function HadamardGateVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <HadamardScene />
      <Text position={[0, -1.5, 0]} fontSize={0.12} color="#a855f7">
        H|0⟩ = |+⟩
      </Text>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function PauliGatesVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* X, Y, Z rotation axes */}
      <Vector3D start={[-1.3, 0, 0]} end={[1.3, 0, 0]} color="#ef4444" label="X" />
      <Vector3D start={[0, -1.3, 0]} end={[0, 1.3, 0]} color="#22c55e" label="Y" />
      <Vector3D start={[0, 0, -1.3]} end={[0, 0, 1.3]} color="#3b82f6" label="Z" />
      
      {/* Rotation indicators */}
      <Line
        points={Array.from({ length: 33 }, (_, i) => {
          const angle = (i / 32) * Math.PI * 2
          return [0, 0.5 * Math.cos(angle), 0.5 * Math.sin(angle)]
        })}
        color="#ef4444"
        lineWidth={2}
      />
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

// CNOT scene component - must be inside Canvas
function CNOTScene() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Control qubit */}
      <group position={[0, 0.8, 0]}>
        <Sphere args={[0.15, 16, 16]}>
          <meshStandardMaterial color="#3b82f6" />
        </Sphere>
        <Text position={[0.4, 0, 0]} fontSize={0.15} color="#3b82f6">
          Control
        </Text>
      </group>
      
      {/* Target qubit */}
      <group position={[0, -0.8, 0]}>
        <mesh>
          <torusGeometry args={[0.2, 0.05, 16, 32]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
        <Line points={[[0, -0.25, 0], [0, 0.25, 0]]} color="#22c55e" lineWidth={3} />
        <Text position={[0.4, 0, 0]} fontSize={0.15} color="#22c55e">
          Target
        </Text>
      </group>
      
      {/* Connection line */}
      <Line points={[[0, 0.65, 0], [0, -0.55, 0]]} color="#f59e0b" lineWidth={2} />
    </group>
  )
}

export function CNOTGateVisualization() {
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CNOTScene />
      <Text position={[0, -1.5, 0]} fontSize={0.1} color="#94a3b8">
        CNOT flips target if control is |1⟩
      </Text>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { HadamardGateVisualization, PauliGatesVisualization, CNOTGateVisualization }
