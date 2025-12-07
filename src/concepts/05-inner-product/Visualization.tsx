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

interface InnerProductVisualizationProps {
  angle: number
}

export function InnerProductVisualization({ angle = Math.PI / 4 }: InnerProductVisualizationProps) {
  const v1 = [1.5, 0, 0]
  const v2 = [1.5 * Math.cos(angle), 1.5 * Math.sin(angle), 0]
  const dotProduct = Math.cos(angle)

  return (
    <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Vector 1 */}
      <Vector3D start={[0, 0, 0]} end={v1} color="#6366f1" label="|u⟩" />
      
      {/* Vector 2 */}
      <Vector3D start={[0, 0, 0]} end={v2} color="#22c55e" label="|v⟩" />
      
      {/* Angle arc */}
      <Line
        points={Array.from({ length: 17 }, (_, i) => {
          const a = (i / 16) * angle
          return [0.4 * Math.cos(a), 0.4 * Math.sin(a), 0]
        })}
        color="#f59e0b"
        lineWidth={2}
      />
      
      {/* Projection line */}
      <Line
        points={[[v2[0], v2[1], 0], [v2[0], 0, 0]]}
        color="#475569"
        lineWidth={1}
      />
      
      <Text position={[0.6, 0.3, 0]} fontSize={0.15} color="#f59e0b">
        θ
      </Text>
      
      <Text position={[0, -0.5, 0]} fontSize={0.15} color="#a855f7">
        {`⟨u|v⟩ = ${dotProduct.toFixed(2)}`}
      </Text>
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function BraKetVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* |0⟩ and |1⟩ states */}
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1]} color="#3b82f6" label="|0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1]} color="#ef4444" label="|1⟩" />
      
      {/* Two states to show inner product */}
      <Vector3D start={[0, 0, 0]} end={[0.7, 0, 0.7]} color="#22c55e" label="|ψ⟩" />
      <Sphere args={[0.06, 16, 16]} position={[0.7, 0, 0.7]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
      </Sphere>
      
      <Vector3D start={[0, 0, 0]} end={[0.5, 0.5, 0.7]} color="#f59e0b" label="|φ⟩" />
      <Sphere args={[0.06, 16, 16]} position={[0.5, 0.5, 0.7]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
      </Sphere>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { InnerProductVisualization, BraKetVisualization }
