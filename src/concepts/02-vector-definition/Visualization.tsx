import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Line, Html } from '@react-three/drei'

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

export function VectorDefinitionVisualization() {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Coordinate axes */}
      <Vector3D start={[-2, 0, 0]} end={[2, 0, 0]} color="#ef4444" label="x" />
      <Vector3D start={[0, -2, 0]} end={[0, 2, 0]} color="#22c55e" label="y" />
      <Vector3D start={[0, 0, -2]} end={[0, 0, 2]} color="#3b82f6" label="z" />
      
      {/* Example vector */}
      <Vector3D start={[0, 0, 0]} end={[1.5, 1, 0.5]} color="#f59e0b" label="|v⟩" />
      
      {/* Component projections */}
      <Line points={[[1.5, 0, 0], [1.5, 1, 0], [0, 1, 0]]} color="#475569" lineWidth={1} />
      <Line points={[[1.5, 1, 0], [1.5, 1, 0.5]]} color="#475569" lineWidth={1} />
      
      {/* Labels for components */}
      <Html position={[0.75, -0.3, 0]}>
        <div className="text-red-400 text-xs">v₁</div>
      </Html>
      <Html position={[-0.3, 0.5, 0]}>
        <div className="text-green-400 text-xs">v₂</div>
      </Html>
      <Html position={[1.7, 1, 0.25]}>
        <div className="text-blue-400 text-xs">v₃</div>
      </Html>
      
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function ColumnVectorVisualization() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Matrix bracket visualization */}
      <Html position={[0, 0, 0]} center>
        <div className="text-white text-2xl font-mono bg-slate-800/80 p-4 rounded-lg border border-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-4xl">[</span>
            <div className="flex flex-col items-center">
              <span className="text-amber-400">α</span>
              <span className="text-purple-400">β</span>
            </div>
            <span className="text-4xl">]</span>
            <span className="text-slate-400 ml-4">=</span>
            <span className="text-amber-400 ml-4">α|0⟩</span>
            <span className="text-slate-400">+</span>
            <span className="text-purple-400">β|1⟩</span>
          </div>
        </div>
      </Html>
    </Canvas>
  )
}

export default { VectorDefinitionVisualization, ColumnVectorVisualization }
