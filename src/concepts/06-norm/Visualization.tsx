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

interface NormVisualizationProps {
  magnitude: number
}

export function NormVisualization({ magnitude = 1.5 }: NormVisualizationProps) {
  const angle = Math.PI / 4
  const vector = [magnitude * Math.cos(angle), magnitude * Math.sin(angle), 0]
  const normalized = [Math.cos(angle), Math.sin(angle), 0]

  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Original vector */}
      <Vector3D start={[0, 0, 0]} end={vector} color="#6366f1" label={`|v⟩ (${magnitude.toFixed(1)})`} />
      
      {/* Normalized vector */}
      <Vector3D start={[0, 0, 0]} end={normalized} color="#22c55e" label="v̂ (1.0)" />
      
      {/* Unit circle */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const a = (i / 64) * Math.PI * 2
          return [Math.cos(a), Math.sin(a), 0]
        })}
        color="#475569"
        lineWidth={1}
      />
      
      {/* Point on unit circle */}
      <Sphere args={[0.06, 16, 16]} position={normalized as [number, number, number]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
      </Sphere>
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function ProbabilityNormVisualization() {
  const alpha = 0.6
  const beta = 0.8
  const norm = Math.sqrt(alpha * alpha + beta * beta)

  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Axes */}
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.2]} color="#3b82f6" label="|0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1.2]} color="#ef4444" label="|1⟩" />
      
      {/* Unnormalized state */}
      <Vector3D 
        start={[0, 0, 0]} 
        end={[0, alpha * 0.8, beta * 0.8]} 
        color="#f59e0b" 
        label={`|ψ⟩ (‖ψ‖=${norm.toFixed(2)})`} 
      />
      
      {/* Normalized state on sphere surface */}
      <Vector3D 
        start={[0, 0, 0]} 
        end={[0, alpha / norm, beta / norm]} 
        color="#22c55e" 
        label="ψ̂ (‖ψ̂‖=1)" 
      />
      
      <Sphere args={[0.06, 16, 16]} position={[0, alpha / norm, beta / norm]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
      </Sphere>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { NormVisualization, ProbabilityNormVisualization }
