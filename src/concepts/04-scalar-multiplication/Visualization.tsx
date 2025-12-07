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

interface ScalarVisualizationProps {
  scalar: number
}

export function ScalarMultiplicationVisualization({ scalar = 1.5 }: ScalarVisualizationProps) {
  const originalVector = [1, 0.5, 0]
  const scaledVector = [originalVector[0] * scalar, originalVector[1] * scalar, originalVector[2] * scalar]

  return (
    <Canvas camera={{ position: [4, 3, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Original vector */}
      <Vector3D start={[0, 0, 0]} end={originalVector} color="#6366f1" label="|v⟩" />
      
      {/* Scaled vector */}
      <Vector3D start={[0, 0, 0]} end={scaledVector} color="#f59e0b" label={`${scalar}|v⟩`} />
      
      <gridHelper args={[6, 12, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

interface PhaseVisualizationProps {
  phase: number
}

export function PhaseVisualization({ phase = Math.PI / 4 }: PhaseVisualizationProps) {
  const x = Math.cos(phase)
  const y = Math.sin(phase)

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Unit circle */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [Math.cos(angle), Math.sin(angle), 0]
        })}
        color="#475569"
        lineWidth={2}
      />
      
      {/* Axes */}
      <Line points={[[-1.5, 0, 0], [1.5, 0, 0]]} color="#ef4444" lineWidth={1} />
      <Line points={[[0, -1.5, 0], [0, 1.5, 0]]} color="#22c55e" lineWidth={1} />
      
      {/* Phase vector */}
      <Vector3D start={[0, 0, 0]} end={[x, y, 0]} color="#f59e0b" label={`e^(iφ)`} />
      
      {/* Point on circle */}
      <Sphere args={[0.08, 16, 16]} position={[x, y, 0]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Phase arc */}
      <Line
        points={Array.from({ length: 17 }, (_, i) => {
          const angle = (i / 16) * phase
          return [0.3 * Math.cos(angle), 0.3 * Math.sin(angle), 0]
        })}
        color="#a855f7"
        lineWidth={2}
      />
      
      <Text position={[0.5, 0.3, 0]} fontSize={0.15} color="#a855f7">
        φ
      </Text>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { ScalarMultiplicationVisualization, PhaseVisualization }
