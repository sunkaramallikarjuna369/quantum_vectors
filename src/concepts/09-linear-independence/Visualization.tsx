import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Line } from '@react-three/drei'

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

export function LinearlyIndependentVisualization() {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Two linearly independent vectors */}
      <Vector3D start={[0, 0, 0]} end={[1.5, 0, 0]} color="#3b82f6" label="|v₁⟩" />
      <Vector3D start={[0, 0, 0]} end={[0.5, 1.2, 0]} color="#22c55e" label="|v₂⟩" />
      
      {/* Show the span (plane) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.3, 0]}>
        <planeGeometry args={[2.5, 2]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.1} side={2} />
      </mesh>
      
      {/* A vector in the span */}
      <Vector3D start={[0, 0, 0]} end={[1, 0.6, 0]} color="#f59e0b" label="span" />
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function LinearlyDependentVisualization() {
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Two linearly dependent vectors (one is scalar multiple of other) */}
      <Vector3D start={[0, 0, 0]} end={[1, 0.5, 0]} color="#3b82f6" label="|v₁⟩" />
      <Vector3D start={[0, 0, 0]} end={[2, 1, 0]} color="#ef4444" label="|v₂⟩ = 2|v₁⟩" />
      
      {/* Show they lie on same line */}
      <Line
        points={[[-0.5, -0.25, 0], [2.5, 1.25, 0]]}
        color="#475569"
        lineWidth={1}
      />
      
      <Text position={[1.5, -0.3, 0]} fontSize={0.15} color="#f59e0b">
        Linearly Dependent
      </Text>
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function HilbertSpaceBasisVisualization() {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* 3D orthonormal basis */}
      <Vector3D start={[0, 0, 0]} end={[1.3, 0, 0]} color="#ef4444" label="|e₁⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 1.3, 0]} color="#22c55e" label="|e₂⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.3]} color="#3b82f6" label="|e₃⟩" />
      
      {/* Arbitrary vector as combination */}
      <Vector3D start={[0, 0, 0]} end={[0.8, 0.6, 0.9]} color="#f59e0b" label="|ψ⟩" />
      
      {/* Projections */}
      <Line points={[[0.8, 0, 0], [0.8, 0.6, 0], [0, 0.6, 0]]} color="#475569" lineWidth={1} />
      <Line points={[[0.8, 0.6, 0], [0.8, 0.6, 0.9]]} color="#475569" lineWidth={1} />
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { LinearlyIndependentVisualization, LinearlyDependentVisualization, HilbertSpaceBasisVisualization }
