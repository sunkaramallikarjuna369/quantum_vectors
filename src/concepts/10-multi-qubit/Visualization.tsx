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

export function TensorProductVisualization() {
  return (
    <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* First qubit space */}
      <group position={[-1.5, 0, 0]}>
        <Vector3D start={[0, 0, 0]} end={[0, 0, 1]} color="#3b82f6" label="|0⟩" />
        <Vector3D start={[0, 0, 0]} end={[0, 0, -1]} color="#ef4444" label="|1⟩" />
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
        </mesh>
        <Text position={[0, -1.3, 0]} fontSize={0.15} color="#94a3b8">
          Qubit A
        </Text>
      </group>
      
      {/* Tensor product symbol */}
      <Text position={[0, 0, 0]} fontSize={0.3} color="#f59e0b">
        ⊗
      </Text>
      
      {/* Second qubit space */}
      <group position={[1.5, 0, 0]}>
        <Vector3D start={[0, 0, 0]} end={[0, 0, 1]} color="#3b82f6" label="|0⟩" />
        <Vector3D start={[0, 0, 0]} end={[0, 0, -1]} color="#ef4444" label="|1⟩" />
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.2} />
        </mesh>
        <Text position={[0, -1.3, 0]} fontSize={0.15} color="#94a3b8">
          Qubit B
        </Text>
      </group>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

// Entangled state scene - must be inside Canvas
function EntangledStateScene() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Bell state visualization - correlated qubits */}
      <group position={[-0.8, 0, 0]}>
        <Sphere args={[0.3, 16, 16]}>
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
        </Sphere>
        <Text position={[0, 0.5, 0]} fontSize={0.15} color="#3b82f6">
          A
        </Text>
      </group>
      
      <group position={[0.8, 0, 0]}>
        <Sphere args={[0.3, 16, 16]}>
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
        </Sphere>
        <Text position={[0, 0.5, 0]} fontSize={0.15} color="#22c55e">
          B
        </Text>
      </group>
      
      {/* Entanglement connection */}
      <Line
        points={[[-0.5, 0, 0], [0.5, 0, 0]]}
        color="#f59e0b"
        lineWidth={3}
      />
      
      {/* Wavy entanglement lines */}
      <Line
        points={Array.from({ length: 21 }, (_, i) => {
          const t = (i / 20) * Math.PI * 2
          const x = -0.5 + (i / 20)
          return [x, Math.sin(t * 2) * 0.15, Math.cos(t * 2) * 0.15]
        })}
        color="#a855f7"
        lineWidth={2}
      />
    </group>
  )
}

export function EntangledStateVisualization() {
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <EntangledStateScene />
      <Text position={[0, -1, 0]} fontSize={0.12} color="#f59e0b">
        |Φ⁺⟩ = (|00⟩ + |11⟩)/√2
      </Text>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function FourDimensionalBasisVisualization() {
  return (
    <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* 4 basis states of 2-qubit system */}
      <Vector3D start={[0, 0, 0]} end={[1.2, 0, 0]} color="#3b82f6" label="|00⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 1.2, 0]} color="#22c55e" label="|01⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.2]} color="#ef4444" label="|10⟩" />
      <Vector3D start={[0, 0, 0]} end={[0.7, 0.7, 0.7]} color="#f59e0b" label="|11⟩" />
      
      <gridHelper args={[3, 6, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { TensorProductVisualization, EntangledStateVisualization, FourDimensionalBasisVisualization }
