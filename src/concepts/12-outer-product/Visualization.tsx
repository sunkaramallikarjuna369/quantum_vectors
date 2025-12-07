import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'

export function OuterProductVisualization() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Html position={[0, 0, 0]} center>
        <div className="text-white text-lg font-mono bg-slate-800/90 p-6 rounded-lg border border-slate-600">
          <div className="text-center mb-4 text-amber-400">Outer Product: |ψ⟩⟨φ|</div>
          <div className="flex items-center gap-4 justify-center">
            <div className="flex flex-col items-center">
              <span className="text-blue-400 text-2xl">[</span>
              <span className="text-blue-400">α</span>
              <span className="text-blue-400">β</span>
              <span className="text-blue-400 text-2xl">]</span>
            </div>
            <span className="text-slate-400">×</span>
            <div className="flex items-center">
              <span className="text-green-400 text-2xl">[</span>
              <span className="text-green-400 mx-1">γ*</span>
              <span className="text-green-400 mx-1">δ*</span>
              <span className="text-green-400 text-2xl">]</span>
            </div>
            <span className="text-slate-400">=</span>
            <div className="flex flex-col items-center">
              <span className="text-purple-400 text-2xl">[</span>
              <div className="flex gap-2">
                <span className="text-purple-400">αγ*</span>
                <span className="text-purple-400">αδ*</span>
              </div>
              <div className="flex gap-2">
                <span className="text-purple-400">βγ*</span>
                <span className="text-purple-400">βδ*</span>
              </div>
              <span className="text-purple-400 text-2xl">]</span>
            </div>
          </div>
        </div>
      </Html>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function DensityMatrixVisualization() {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* 2x2 density matrix as 3D bars */}
      <group>
        {/* ρ₀₀ */}
        <mesh position={[-0.6, 0.4, 0.6]}>
          <boxGeometry args={[0.5, 0.8, 0.5]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <Text position={[-0.6, 0.9, 0.6]} fontSize={0.15} color="#3b82f6">
          ρ₀₀
        </Text>
        
        {/* ρ₀₁ */}
        <mesh position={[0.6, 0.15, 0.6]}>
          <boxGeometry args={[0.5, 0.3, 0.5]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
        <Text position={[0.6, 0.4, 0.6]} fontSize={0.15} color="#22c55e">
          ρ₀₁
        </Text>
        
        {/* ρ₁₀ */}
        <mesh position={[-0.6, 0.15, -0.6]}>
          <boxGeometry args={[0.5, 0.3, 0.5]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        <Text position={[-0.6, 0.4, -0.6]} fontSize={0.15} color="#f59e0b">
          ρ₁₀
        </Text>
        
        {/* ρ₁₁ */}
        <mesh position={[0.6, 0.1, -0.6]}>
          <boxGeometry args={[0.5, 0.2, 0.5]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <Text position={[0.6, 0.3, -0.6]} fontSize={0.15} color="#ef4444">
          ρ₁₁
        </Text>
        
        {/* Base plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[2.5, 2.5]} />
          <meshBasicMaterial color="#1e293b" transparent opacity={0.5} />
        </mesh>
      </group>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export function ProjectorVisualization() {
  return (
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Bloch sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* |0⟩⟨0| projects onto north pole */}
      <mesh position={[0, 0, 1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <Text position={[0.3, 0, 1.2]} fontSize={0.12} color="#3b82f6">
        |0⟩⟨0|
      </Text>
      
      {/* |1⟩⟨1| projects onto south pole */}
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>
      <Text position={[0.3, 0, -1.2]} fontSize={0.12} color="#ef4444">
        |1⟩⟨1|
      </Text>
      
      {/* Projection plane indicator */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[0.9, 1, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} side={2} />
      </mesh>
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

export default { OuterProductVisualization, DensityMatrixVisualization, ProjectorVisualization }
