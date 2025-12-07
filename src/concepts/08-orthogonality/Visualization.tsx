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

export function OrthogonalVectorsVisualization() {
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Orthogonal vectors */}
      <Vector3D start={[0, 0, 0]} end={[1.5, 0, 0]} color="#3b82f6" label="|u⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 1.5, 0]} color="#22c55e" label="|v⟩" />
      
      {/* Right angle indicator */}
      <Line
        points={[[0.3, 0, 0], [0.3, 0.3, 0], [0, 0.3, 0]]}
        color="#f59e0b"
        lineWidth={2}
      />
      
      {/* Label for 90° */}
      <Text position={[0.4, 0.4, 0]} fontSize={0.15} color="#f59e0b">
        90°
      </Text>
      
      <Text position={[0, -0.5, 0]} fontSize={0.15} color="#a855f7">
        ⟨u|v⟩ = 0
      </Text>
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function OrthonormalBasisVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Orthonormal basis vectors */}
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1]} color="#3b82f6" label="|0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1]} color="#ef4444" label="|1⟩" />
      
      {/* Points at poles */}
      <Sphere args={[0.08, 16, 16]} position={[0, 0, 1]}>
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0, 0, -1]}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Show they are opposite (orthogonal) */}
      <Text position={[0.8, 0, 0.5]} fontSize={0.12} color="#f59e0b">
        ⟨0|1⟩ = 0
      </Text>
      <Text position={[0.8, 0, -0.5]} fontSize={0.12} color="#22c55e">
        ⟨0|0⟩ = 1
      </Text>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function MutuallyExclusiveVisualization() {
  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Three orthogonal axes */}
      <Vector3D start={[0, 0, 0]} end={[1.3, 0, 0]} color="#ef4444" label="X" />
      <Vector3D start={[0, 0, 0]} end={[0, 1.3, 0]} color="#22c55e" label="Y" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.3]} color="#3b82f6" label="Z" />
      
      {/* Right angle indicators */}
      <Line points={[[0.2, 0, 0], [0.2, 0.2, 0], [0, 0.2, 0]]} color="#f59e0b" lineWidth={2} />
      <Line points={[[0.2, 0, 0], [0.2, 0, 0.2], [0, 0, 0.2]]} color="#f59e0b" lineWidth={2} />
      <Line points={[[0, 0.2, 0], [0, 0.2, 0.2], [0, 0, 0.2]]} color="#f59e0b" lineWidth={2} />
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { OrthogonalVectorsVisualization, OrthonormalBasisVisualization, MutuallyExclusiveVisualization }
