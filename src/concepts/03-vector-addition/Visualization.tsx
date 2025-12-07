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

export function VectorAdditionVisualization() {
  const v1: [number, number, number] = [1, 0.5, 0]
  const v2: [number, number, number] = [0.5, 1, 0]
  const sum: [number, number, number] = [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]

  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Vector 1 */}
      <Vector3D start={[0, 0, 0]} end={v1} color="#6366f1" label="|v₁⟩" />
      
      {/* Vector 2 (starting from origin) */}
      <Vector3D start={[0, 0, 0]} end={v2} color="#22c55e" label="|v₂⟩" />
      
      {/* Vector 2 translated (for parallelogram) */}
      <Vector3D start={v1} end={sum} color="#22c55e" />
      
      {/* Sum vector */}
      <Vector3D start={[0, 0, 0]} end={sum} color="#f59e0b" label="|v₁⟩+|v₂⟩" />
      
      {/* Dashed line to complete parallelogram */}
      <Line points={[v2, sum]} color="#475569" lineWidth={1} />
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function SuperpositionVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bloch sphere wireframe */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Axes */}
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.2]} color="#3b82f6" label="|0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1.2]} color="#ef4444" label="|1⟩" />
      
      {/* Superposition state |+⟩ */}
      <Vector3D start={[0, 0, 0]} end={[1, 0, 0]} color="#f59e0b" label="|+⟩" />
      
      {/* Show the addition */}
      <Line points={[[0, 0, 0.7], [0.7, 0, 0.7], [0.7, 0, 0]]} color="#475569" lineWidth={1} />
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { VectorAdditionVisualization, SuperpositionVisualization }
