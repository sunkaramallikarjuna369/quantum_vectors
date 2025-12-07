import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Line, Sphere } from '@react-three/drei'

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

export function ComputationalBasisVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Z-axis: Computational basis */}
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.3]} color="#3b82f6" label="|0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1.3]} color="#ef4444" label="|1⟩" />
      
      {/* Points at poles */}
      <Sphere args={[0.08, 16, 16]} position={[0, 0, 1]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0, 0, -1]}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* X-axis: |+⟩ and |-⟩ */}
      <Vector3D start={[0, 0, 0]} end={[1.3, 0, 0]} color="#22c55e" label="|+⟩" />
      <Vector3D start={[0, 0, 0]} end={[-1.3, 0, 0]} color="#a855f7" label="|-⟩" />
      
      {/* Equator circle */}
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

export function BasisExpansionVisualization() {
  const alpha = 0.8
  const beta = 0.6
  
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Basis vectors */}
      <Vector3D start={[0, 0, 0]} end={[1.5, 0, 0]} color="#3b82f6" label="|0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 1.5, 0]} color="#ef4444" label="|1⟩" />
      
      {/* State vector as combination */}
      <Vector3D start={[0, 0, 0]} end={[alpha * 1.2, beta * 1.2, 0]} color="#f59e0b" label="|ψ⟩" />
      
      {/* Component projections */}
      <Line points={[[alpha * 1.2, 0, 0], [alpha * 1.2, beta * 1.2, 0]]} color="#475569" lineWidth={1} />
      <Line points={[[0, beta * 1.2, 0], [alpha * 1.2, beta * 1.2, 0]]} color="#475569" lineWidth={1} />
      
      {/* Labels for components */}
      <Text position={[alpha * 0.6, -0.2, 0]} fontSize={0.15} color="#3b82f6">
        α
      </Text>
      <Text position={[-0.2, beta * 0.6, 0]} fontSize={0.15} color="#ef4444">
        β
      </Text>
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { ComputationalBasisVisualization, BasisExpansionVisualization }
