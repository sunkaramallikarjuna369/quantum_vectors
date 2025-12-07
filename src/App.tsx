import { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BookOpen, Code, Atom, Zap, Target, Layers, GitBranch, Box, RotateCcw, Grid3X3, Circle } from 'lucide-react'

// 3D Vector Arrow Component
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
        <Text
          position={[end[0] + 0.2, end[1] + 0.2, end[2]]}
          fontSize={0.2}
          color={color}
        >
          {label}
        </Text>
      )}
    </group>
  )
}

// Animated Bloch Sphere
function BlochSphere({ theta = Math.PI / 4, phi = Math.PI / 4 }: { theta?: number, phi?: number }) {
  const sphereRef = useRef<THREE.Mesh>(null)
  const stateRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (stateRef.current) {
      stateRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const stateVector = useMemo(() => {
    const x = Math.sin(theta) * Math.cos(phi)
    const y = Math.sin(theta) * Math.sin(phi)
    const z = Math.cos(theta)
    return [x, y, z]
  }, [theta, phi])

  return (
    <group>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#1e293b" wireframe transparent opacity={0.3} />
      </mesh>
      
      <Vector3D start={[0, 0, 0]} end={[1.3, 0, 0]} color="#ef4444" label="X" />
      <Vector3D start={[0, 0, 0]} end={[0, 1.3, 0]} color="#22c55e" label="Y" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, 1.3]} color="#3b82f6" label="Z |0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 0, -1.3]} color="#3b82f6" label="|1⟩" />
      
      <group ref={stateRef}>
        <Vector3D 
          start={[0, 0, 0]} 
          end={stateVector as number[]} 
          color="#f59e0b" 
          label="|ψ⟩" 
        />
        <Sphere args={[0.08, 16, 16]} position={stateVector as [number, number, number]}>
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </Sphere>
      </group>
      
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [Math.cos(angle), Math.sin(angle), 0]
        })}
        color="#475569"
        lineWidth={1}
      />
    </group>
  )
}

// Vector Addition Visualization
function VectorAddition({ v1 = [1, 0, 0], v2 = [0, 1, 0] }: { v1?: number[], v2?: number[] }) {
  const sum = [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]
  
  return (
    <group>
      <Vector3D start={[0, 0, 0]} end={v1} color="#6366f1" label="v" />
      <Vector3D start={v1 as number[]} end={sum} color="#22c55e" label="w" />
      <Vector3D start={[0, 0, 0]} end={sum} color="#f59e0b" label="v+w" />
      <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
      <Vector3D start={[-2, 0, 0]} end={[2, 0, 0]} color="#475569" />
      <Vector3D start={[0, -2, 0]} end={[0, 2, 0]} color="#475569" />
    </group>
  )
}

// Basis Vectors Visualization
function BasisVectors() {
  return (
    <group>
      <Vector3D start={[0, 0, 0]} end={[1, 0, 0]} color="#6366f1" label="|0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 1, 0]} color="#22c55e" label="|1⟩" />
      <Vector3D start={[0, 0, 0]} end={[0.707, 0.707, 0]} color="#f59e0b" label="|+⟩" />
      <gridHelper args={[3, 6, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

// Quantum Gate Transformation
function QuantumGate({ gateType = 'H' }: { gateType?: string }) {
  const [animProgress, setAnimProgress] = useState(0)
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    const t = (Math.sin(state.clock.elapsedTime) + 1) / 2
    setAnimProgress(t)
  })

  const startState = [0, 0, 1]
  const endState = gateType === 'H' ? [1, 0, 0] : [0, 1, 0]
  
  const currentState = [
    startState[0] + (endState[0] - startState[0]) * animProgress,
    startState[1] + (endState[1] - startState[1]) * animProgress,
    startState[2] + (endState[2] - startState[2]) * animProgress,
  ]

  return (
    <group ref={groupRef}>
      <BlochSphere theta={Math.acos(currentState[2])} phi={Math.atan2(currentState[1], currentState[0])} />
      <Html position={[1.5, 1.5, 0]}>
        <div className="bg-slate-800 px-3 py-1 rounded text-sm text-white">
          {gateType} Gate
        </div>
      </Html>
    </group>
  )
}

// Inner Product Visualization
function InnerProduct({ v1 = [1, 0.5, 0], v2 = [0.5, 1, 0] }: { v1?: number[], v2?: number[] }) {
  const dotProduct = v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]
  const angle = Math.acos(dotProduct / (Math.sqrt(v1[0]**2 + v1[1]**2 + v1[2]**2) * Math.sqrt(v2[0]**2 + v2[1]**2 + v2[2]**2)))
  
  return (
    <group>
      <Vector3D start={[0, 0, 0]} end={v1} color="#6366f1" label="v" />
      <Vector3D start={[0, 0, 0]} end={v2} color="#22c55e" label="w" />
      <Line
        points={Array.from({ length: 21 }, (_, i) => {
          const t = (i / 20) * angle
          const r = 0.3
          return [r * Math.cos(t), r * Math.sin(t), 0]
        })}
        color="#f59e0b"
        lineWidth={2}
      />
      <Html position={[0.5, 0.5, 0]}>
        <div className="bg-slate-800 px-2 py-1 rounded text-xs text-white">
          ⟨v|w⟩ = {dotProduct.toFixed(2)}
        </div>
      </Html>
      <gridHelper args={[3, 6, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

// Multi-Qubit System Visualization
function MultiQubitSystem() {
  const [entangled] = useState(true)
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current && entangled) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <group position={[-1, 0, 0]}>
        <Sphere args={[0.3, 16, 16]}>
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.3} />
        </Sphere>
        <Text position={[0, 0.5, 0]} fontSize={0.2} color="#6366f1">Q1</Text>
      </group>
      <group position={[1, 0, 0]}>
        <Sphere args={[0.3, 16, 16]}>
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
        </Sphere>
        <Text position={[0, 0.5, 0]} fontSize={0.2} color="#22c55e">Q2</Text>
      </group>
      {entangled && (
        <Line
          points={[[-0.7, 0, 0], [0.7, 0, 0]]}
          color="#f59e0b"
          lineWidth={3}
          dashed
          dashSize={0.1}
          gapSize={0.05}
        />
      )}
      <Html position={[0, -1, 0]}>
        <div className="bg-slate-800 px-3 py-1 rounded text-sm text-white">
          Bell State |Φ⁺⟩ = (|00⟩ + |11⟩)/√2
        </div>
      </Html>
    </group>
  )
}

// Density Matrix Visualization
function DensityMatrix() {
  const matrixRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (matrixRef.current) {
      matrixRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      matrixRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const matrixValues = [[0.5, 0.5], [0.5, 0.5]]

  return (
    <group ref={matrixRef}>
      {matrixValues.map((row, i) =>
        row.map((val, j) => (
          <group key={`${i}-${j}`} position={[(j - 0.5) * 0.8, (0.5 - i) * 0.8, 0]}>
            <mesh>
              <boxGeometry args={[0.6, 0.6, val * 0.5 + 0.1]} />
              <meshStandardMaterial color={val > 0.3 ? '#6366f1' : '#475569'} transparent opacity={0.8} />
            </mesh>
            <Text position={[0, 0, 0.4]} fontSize={0.15} color="white">{val.toFixed(1)}</Text>
          </group>
        ))
      )}
      <Html position={[0, -1.2, 0]}>
        <div className="bg-slate-800 px-3 py-1 rounded text-sm text-white">
          ρ = |+⟩⟨+| = ½[1 1; 1 1]
        </div>
      </Html>
    </group>
  )
}

// Norm Visualization
function NormVisualization({ vector = [3, 4, 0] }: { vector?: number[] }) {
  const norm = Math.sqrt(vector[0]**2 + vector[1]**2 + vector[2]**2)
  const normalized = vector.map(v => v / norm)
  
  return (
    <group>
      <Vector3D start={[0, 0, 0]} end={vector} color="#6366f1" label={`v (|v|=${norm.toFixed(1)})`} />
      <Vector3D start={[0, 0, 0]} end={normalized} color="#22c55e" label="v̂ (unit)" />
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2
          return [Math.cos(angle), Math.sin(angle), 0]
        })}
        color="#f59e0b"
        lineWidth={1}
      />
      <gridHelper args={[10, 10, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

// Orthogonality Visualization
function OrthogonalityVisualization() {
  return (
    <group>
      <Vector3D start={[0, 0, 0]} end={[1, 0, 0]} color="#6366f1" label="|0⟩" />
      <Vector3D start={[0, 0, 0]} end={[0, 1, 0]} color="#22c55e" label="|1⟩" />
      <Line points={[[0.2, 0, 0], [0.2, 0.2, 0], [0, 0.2, 0]]} color="#f59e0b" lineWidth={2} />
      <Html position={[0.5, 0.5, 0]}>
        <div className="bg-slate-800 px-2 py-1 rounded text-xs text-white">
          ⟨0|1⟩ = 0 (orthogonal)
        </div>
      </Html>
      <gridHelper args={[3, 6, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

// Scalar Multiplication Visualization
function ScalarMultiplication({ scalar = 2 }: { scalar?: number }) {
  const originalVector = [1, 0.5, 0]
  const scaledVector = originalVector.map(v => v * scalar)
  
  return (
    <group>
      <Vector3D start={[0, 0, 0]} end={originalVector} color="#6366f1" label="v" />
      <Vector3D start={[0, 0, 0]} end={scaledVector} color="#f59e0b" label={`${scalar}v`} />
      <gridHelper args={[6, 12, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

// Code Block Component
function CodeBlock({ code, language = 'python' }: { code: string, language?: string }) {
  return (
    <div className="code-block">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 uppercase">{language}</span>
        <Button variant="ghost" size="sm" className="h-6 text-xs">
          <Code className="w-3 h-3 mr-1" /> Copy
        </Button>
      </div>
      <pre className="text-green-400">{code}</pre>
    </div>
  )
}

// Concept sections data
const concepts = [
  { id: 'intro', title: '1. Introduction', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'definition', title: '2. Vector Definition', icon: <Target className="w-4 h-4" /> },
  { id: 'addition', title: '3. Vector Addition', icon: <Zap className="w-4 h-4" /> },
  { id: 'scalar', title: '4. Scalar Multiplication', icon: <Layers className="w-4 h-4" /> },
  { id: 'inner', title: '5. Inner Product', icon: <GitBranch className="w-4 h-4" /> },
  { id: 'norm', title: '6. Norm (Magnitude)', icon: <Target className="w-4 h-4" /> },
  { id: 'basis', title: '7. Basis Vectors', icon: <Grid3X3 className="w-4 h-4" /> },
  { id: 'orthogonal', title: '8. Orthogonality', icon: <Box className="w-4 h-4" /> },
  { id: 'linear', title: '9. Linear Independence', icon: <GitBranch className="w-4 h-4" /> },
  { id: 'multiqubit', title: '10. Multi-Qubit Systems', icon: <Layers className="w-4 h-4" /> },
  { id: 'gates', title: '11. Quantum Gates', icon: <RotateCcw className="w-4 h-4" /> },
  { id: 'outer', title: '12. Outer Product', icon: <Grid3X3 className="w-4 h-4" /> },
  { id: 'bloch', title: '13. Bloch Sphere', icon: <Circle className="w-4 h-4" /> },
]

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('intro')
  const [theta, setTheta] = useState([Math.PI / 4])
  const [phi, setPhi] = useState([Math.PI / 4])
  const [scalar, setScalar] = useState([2])
  const [v1x, setV1x] = useState([1])
  const [v1y, setV1y] = useState([0.5])
  const [v2x, setV2x] = useState([0.5])
  const [v2y, setV2y] = useState([1])

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg quantum-gradient flex items-center justify-center">
              <Atom className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Quantum Vectors</h1>
              <p className="text-xs text-slate-400">Interactive Tutorial</p>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-1">
            {concepts.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setActiveSection(concept.id)}
                className={`nav-item w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                  activeSection === concept.id ? 'active text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {concept.icon}
                {concept.title}
              </button>
            ))}
          </nav>
        </ScrollArea>
        
        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">Built for Quantum Computing Education</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          
          {/* Introduction Section */}
          {activeSection === 'intro' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Introduction to Vectors</h2>
                  <p className="text-slate-400">The backbone of quantum computing</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    Vectors are the backbone of both classical physics and quantum mechanics. In classical contexts, 
                    vectors represent quantities with <span className="text-indigo-400 font-semibold">magnitude and direction</span> (like force or velocity).
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    In quantum computing, vectors represent <span className="text-indigo-400 font-semibold">quantum states</span>, 
                    existing in an abstract complex vector space called a <span className="text-amber-400 font-semibold">Hilbert space</span>.
                  </p>
                  <div className="math-formula">
                    A quantum state is represented by a column vector whose elements are complex probability amplitudes.
                    The square of each amplitude's magnitude gives the probability of observing the corresponding state.
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Target className="w-4 h-4 text-indigo-400" />
                      </div>
                      Classical Vector
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="visualization-container h-64">
                      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Vector3D start={[0, 0, 0]} end={[1.5, 1, 0]} color="#6366f1" label="Force" />
                        <gridHelper args={[4, 8, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
                        <OrbitControls enableZoom={false} />
                      </Canvas>
                    </div>
                    <p className="text-sm text-slate-400 mt-3">Classical vectors have magnitude and direction in physical space.</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Atom className="w-4 h-4 text-amber-400" />
                      </div>
                      Quantum State Vector
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="visualization-container h-64">
                      <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <BlochSphere theta={Math.PI / 3} phi={Math.PI / 4} />
                        <OrbitControls enableZoom={false} />
                      </Canvas>
                    </div>
                    <p className="text-sm text-slate-400 mt-3">Quantum states exist on the Bloch sphere in Hilbert space.</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Classical vector
classical_vector = np.array([3, 4])
print(f"Classical vector: {classical_vector}")
print(f"Magnitude: {np.linalg.norm(classical_vector)}")

# Quantum state vector (qubit in superposition)
# |ψ⟩ = α|0⟩ + β|1⟩
alpha = 1/np.sqrt(2)
beta = 1/np.sqrt(2)
quantum_state = np.array([alpha, beta], dtype=complex)

print(f"\\nQuantum state |+⟩: {quantum_state}")
print(f"Probability of |0⟩: {np.abs(alpha)**2}")
print(f"Probability of |1⟩: {np.abs(beta)**2}")
print(f"Total probability: {np.abs(alpha)**2 + np.abs(beta)**2}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Vector Definition Section */}
          {activeSection === 'definition' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Mathematical Definition</h2>
                  <p className="text-slate-400">Understanding vector structure</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <p className="text-slate-300 leading-relaxed mb-4">A vector is an ordered collection of real or complex numbers:</p>
                  <div className="math-formula text-center text-xl">v⃗ = [v₁, v₂, ..., vₙ]ᵀ ∈ ℝⁿ or ℂⁿ</div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-indigo-400 mb-2">Dimension</h4>
                      <p className="text-sm text-slate-300">Number of components (n)</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-amber-400 mb-2">Components</h4>
                      <p className="text-sm text-slate-300">v₁, v₂, ..., vₙ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader><CardTitle>2D Vector Visualization</CardTitle></CardHeader>
                  <CardContent>
                    <div className="visualization-container h-72">
                      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <Vector3D start={[0, 0, 0]} end={[1.5, 2, 0]} color="#6366f1" label="v=[3,4]" />
                        <Vector3D start={[-2, 0, 0]} end={[2, 0, 0]} color="#475569" />
                        <Vector3D start={[0, -2, 0]} end={[0, 2.5, 0]} color="#475569" />
                        <gridHelper args={[5, 10, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
                        <OrbitControls enableZoom={false} />
                      </Canvas>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader><CardTitle>Quantum Interpretation</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-slate-300 mb-4">Each element in a quantum vector corresponds to the <span className="text-indigo-400">amplitude</span> of a basis state.</p>
                    <div className="math-formula">|ψ⟩ = α|0⟩ + β|1⟩ = [α, β]ᵀ</div>
                    <p className="text-slate-300 mt-4">The squared magnitude gives the <span className="text-amber-400">probability</span> of observing that state:</p>
                    <div className="math-formula">P(0) = |α|², P(1) = |β|²</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Define vectors
v = np.array([[3], [4]], dtype=float)
w = np.array([[1], [-2]], dtype=float)

print("Vector v:")
print(v)
print("\\nVector w:")
print(w)

# Quantum state vector
psi = np.array([[1/np.sqrt(2)], [1/np.sqrt(2)]], dtype=complex)
print("\\nQuantum state |ψ⟩:")
print(psi)

# Calculate probabilities
prob_0 = np.abs(psi[0, 0])**2
prob_1 = np.abs(psi[1, 0])**2
print(f"\\nP(|0⟩) = {prob_0:.4f}")
print(f"P(|1⟩) = {prob_1:.4f}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Vector Addition Section */}
          {activeSection === 'addition' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Vector Addition & Subtraction</h2>
                  <p className="text-slate-400">Superposition in quantum computing</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="math-formula text-center text-xl mb-4">v⃗ + w⃗ = [v₁ + w₁, v₂ + w₂, ..., vₙ + wₙ]ᵀ</div>
                  <p className="text-slate-300 leading-relaxed">
                    Vector addition represents <span className="text-indigo-400 font-semibold">superposition</span> in quantum computing.
                    For a qubit, the superposition of |0⟩ and |1⟩ creates a state that exists partly in both.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Interactive Vector Addition</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-80">
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <VectorAddition v1={[v1x[0], v1y[0], 0]} v2={[v2x[0], v2y[0], 0]} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-sm text-slate-400">Vector v (x, y)</label>
                      <div className="flex gap-2 mt-2">
                        <Slider value={v1x} onValueChange={setV1x} min={-2} max={2} step={0.1} className="flex-1" />
                        <Slider value={v1y} onValueChange={setV1y} min={-2} max={2} step={0.1} className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">Vector w (x, y)</label>
                      <div className="flex gap-2 mt-2">
                        <Slider value={v2x} onValueChange={setV2x} min={-2} max={2} step={0.1} className="flex-1" />
                        <Slider value={v2y} onValueChange={setV2y} min={-2} max={2} step={0.1} className="flex-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Quantum Example: The |+⟩ State</CardTitle></CardHeader>
                <CardContent>
                  <div className="math-formula text-center text-xl">|+⟩ = (1/√2)(|0⟩ + |1⟩) = (1/√2)[1, 1]ᵀ</div>
                  <p className="text-slate-300 mt-4">This superposition state has equal probability of being measured as |0⟩ or |1⟩.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Classical vector addition
v = np.array([3, 4])
w = np.array([1, -2])
result = v + w
print(f"v + w = {result}")

# Quantum superposition
zero = np.array([[1], [0]], dtype=complex)  # |0⟩
one = np.array([[0], [1]], dtype=complex)   # |1⟩

# Create |+⟩ state (superposition)
plus = (1/np.sqrt(2)) * (zero + one)
print(f"\\n|+⟩ state:\\n{plus}")

# Verify normalization
norm = np.linalg.norm(plus)
print(f"\\nNorm of |+⟩: {norm:.4f}")

# Probabilities
prob_0 = np.abs(plus[0, 0])**2
prob_1 = np.abs(plus[1, 0])**2
print(f"P(|0⟩) = {prob_0:.4f}")
print(f"P(|1⟩) = {prob_1:.4f}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Scalar Multiplication Section */}
          {activeSection === 'scalar' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Scalar Multiplication</h2>
                  <p className="text-slate-400">Phase and amplitude in quantum states</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="math-formula text-center text-xl mb-4">c · v⃗ = [c·v₁, c·v₂, ..., c·vₙ]ᵀ</div>
                  <p className="text-slate-300 leading-relaxed">
                    In quantum computing, multiplying by a <span className="text-indigo-400 font-semibold">complex phase</span> (e.g., e^(iφ)) 
                    changes the phase but not the physical measurement outcome. However, <span className="text-amber-400 font-semibold">relative phases</span> between 
                    components affect interference.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Interactive Scalar Multiplication</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-72">
                    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <ScalarMultiplication scalar={scalar[0]} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <div className="mt-4">
                    <label className="text-sm text-slate-400">Scalar value: {scalar[0].toFixed(1)}</label>
                    <Slider value={scalar} onValueChange={setScalar} min={0.5} max={3} step={0.1} className="mt-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Classical scalar multiplication
v = np.array([3, 4])
scaled = 2 * v
print(f"2 * v = {scaled}")

# Quantum phase multiplication
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)

# Phase shift of 180 degrees (π radians)
phase = np.exp(1j * np.pi)  # e^(iπ) = -1
print(f"\\nPhase e^(iπ) = {phase:.4f}")

# Create |−⟩ state with phase
psi = (1/np.sqrt(2)) * (zero + phase * one)
print(f"\\n|−⟩ state:\\n{np.round(psi, 3)}")

# Different phase angles
for angle in [0, np.pi/4, np.pi/2, np.pi]:
    phase = np.exp(1j * angle)
    state = (1/np.sqrt(2)) * (zero + phase * one)
    print(f"\\nPhase {angle:.2f} rad: {np.round(state.flatten(), 3)}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Inner Product Section */}
          {activeSection === 'inner' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <GitBranch className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Inner Product (Dot Product)</h2>
                  <p className="text-slate-400">Measuring overlap and probability amplitudes</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="math-formula text-center text-xl mb-4">⟨v|w⟩ = v₁*w₁ + v₂*w₂ + ... + vₙ*wₙ</div>
                  <p className="text-slate-300 leading-relaxed">
                    The inner product measures <span className="text-indigo-400 font-semibold">overlap</span> between vectors.
                    In quantum mechanics, it gives the <span className="text-amber-400 font-semibold">probability amplitude</span> of finding one state in another.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Interactive Inner Product</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-72">
                    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <InnerProduct v1={[v1x[0], v1y[0], 0]} v2={[v2x[0], v2y[0], 0]} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Classical inner product
v = np.array([3, 4])
w = np.array([1, -2])
inner = np.dot(v, w)
print(f"⟨v|w⟩ = {inner}")

# Quantum inner products
zero = np.array([1, 0], dtype=complex)
one = np.array([0, 1], dtype=complex)
plus = (1/np.sqrt(2)) * np.array([1, 1], dtype=complex)
minus = (1/np.sqrt(2)) * np.array([1, -1], dtype=complex)

# ⟨0|1⟩ = 0 (orthogonal)
print(f"\\n⟨0|1⟩ = {np.vdot(zero, one)}")

# ⟨+|+⟩ = 1 (normalized)
print(f"⟨+|+⟩ = {np.vdot(plus, plus):.4f}")

# ⟨+|−⟩ = 0 (orthogonal)
print(f"⟨+|−⟩ = {np.vdot(plus, minus):.4f}")

# Probability amplitude
amplitude = np.vdot(zero, plus)
probability = np.abs(amplitude)**2
print(f"\\n⟨0|+⟩ = {amplitude:.4f}")
print(f"|⟨0|+⟩|² = {probability:.4f}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Norm Section */}
          {activeSection === 'norm' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Norm (Magnitude)</h2>
                  <p className="text-slate-400">Normalization and probability conservation</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="math-formula text-center text-xl mb-4">||v⃗|| = √(v₁² + v₂² + ... + vₙ²)</div>
                  <p className="text-slate-300 leading-relaxed">In quantum mechanics, every valid state vector must satisfy:</p>
                  <div className="math-formula text-center text-xl mt-4">|||ψ⟩|| = 1 ⇒ |α|² + |β|² = 1</div>
                  <p className="text-slate-300 mt-4">This ensures <span className="text-amber-400 font-semibold">total probability = 1</span>.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Norm Visualization</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-72">
                    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <NormVisualization vector={[3, 4, 0]} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">The blue vector has magnitude 5. The green unit vector points in the same direction with magnitude 1.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Classical norm
v = np.array([3, 4])
norm = np.linalg.norm(v)
print(f"||v|| = {norm}")

# Normalize the vector
v_normalized = v / norm
print(f"Normalized: {v_normalized}")
print(f"||v_normalized|| = {np.linalg.norm(v_normalized):.4f}")

# Quantum state normalization
psi = np.array([1/np.sqrt(2), 1/np.sqrt(2)], dtype=complex)
print(f"\\n|ψ⟩ = {psi}")
print(f"|||ψ⟩|| = {np.linalg.norm(psi):.4f}")

# Verify probability conservation
prob_sum = np.sum(np.abs(psi)**2)
print(f"Sum of probabilities = {prob_sum:.4f}")

# Normalize an unnormalized state
unnormalized = np.array([3, 4], dtype=complex)
normalized = unnormalized / np.linalg.norm(unnormalized)
print(f"\\nUnnormalized: {unnormalized}")
print(f"Normalized: {normalized}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Basis Vectors Section */}
          {activeSection === 'basis' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Grid3X3 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Basis Vectors</h2>
                  <p className="text-slate-400">The computational basis</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-indigo-400 mb-2">Classical Basis</h4>
                      <div className="math-formula">î = [1, 0], ĵ = [0, 1]</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-400 mb-2">Quantum Basis</h4>
                      <div className="math-formula">|0⟩ = [1, 0], |1⟩ = [0, 1]</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Basis Vectors Visualization</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-72">
                    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <BasisVectors />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">|0⟩ and |1⟩ form the computational basis. The |+⟩ state is a superposition of both.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Define basis vectors
zero = np.array([[1], [0]], dtype=complex)  # |0⟩
one = np.array([[0], [1]], dtype=complex)   # |1⟩

print("Basis vectors:")
print(f"|0⟩ = {zero.flatten()}")
print(f"|1⟩ = {one.flatten()}")

# Create a quantum state
# |ψ⟩ = (1/2)|0⟩ + (√3/2)|1⟩
psi = np.array([[0.5], [np.sqrt(3)/2]], dtype=complex)
print(f"\\n|ψ⟩ = {psi.flatten()}")

# Calculate probabilities
probs = np.abs(psi)**2
print(f"\\nProbabilities:")
print(f"P(|0⟩) = {probs[0, 0]:.4f}")
print(f"P(|1⟩) = {probs[1, 0]:.4f}")

# Verify normalization
print(f"\\nTotal probability = {np.sum(probs):.4f}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orthogonality Section */}
          {activeSection === 'orthogonal' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Box className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Orthogonality & Orthonormality</h2>
                  <p className="text-slate-400">Mutually exclusive quantum states</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <p className="text-slate-300 leading-relaxed mb-4">Vectors are <span className="text-indigo-400 font-semibold">orthogonal</span> if their inner product is zero.</p>
                  <div className="math-formula text-center text-xl">⟨0|1⟩ = 0, ⟨0|0⟩ = 1</div>
                  <p className="text-slate-300 mt-4">Orthogonal quantum states represent <span className="text-amber-400 font-semibold">mutually exclusive outcomes</span>.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Orthogonality Visualization</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-72">
                    <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <OrthogonalityVisualization />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">|0⟩ and |1⟩ are perpendicular (orthogonal), indicated by the right angle.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Define basis states
zero = np.array([1, 0], dtype=complex)
one = np.array([0, 1], dtype=complex)
plus = (1/np.sqrt(2)) * np.array([1, 1], dtype=complex)
minus = (1/np.sqrt(2)) * np.array([1, -1], dtype=complex)

# Check orthogonality
print("Orthogonality checks:")
print(f"⟨0|1⟩ = {np.vdot(zero, one):.4f}")
print(f"⟨0|0⟩ = {np.vdot(zero, zero):.4f}")
print(f"⟨+|−⟩ = {np.vdot(plus, minus):.4f}")
print(f"⟨+|+⟩ = {np.vdot(plus, plus):.4f}")

# Function to check orthonormality
def check_orthonormal(basis):
    n = len(basis)
    print("\\nOrthonormality matrix:")
    for i in range(n):
        row = []
        for j in range(n):
            row.append(f"{np.vdot(basis[i], basis[j]):.2f}")
        print(f"  {row}")

check_orthonormal([zero, one])`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Linear Independence Section */}
          {activeSection === 'linear' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <GitBranch className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Linear Independence & Span</h2>
                  <p className="text-slate-400">Building the Hilbert space</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <p className="text-slate-300 leading-relaxed mb-4">A set of vectors is <span className="text-indigo-400 font-semibold">linearly independent</span> if no vector can be written as a linear combination of others.</p>
                  <p className="text-slate-300 leading-relaxed">In quantum mechanics, |0⟩ and |1⟩ are independent and form a <span className="text-amber-400 font-semibold">basis</span> for the 2D Hilbert space.</p>
                  <div className="math-formula text-center text-xl mt-4">|ψ⟩ = α|0⟩ + β|1⟩</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Span Visualization</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-72">
                    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <group>
                        <Vector3D start={[0, 0, 0]} end={[1, 0, 0]} color="#6366f1" label="|0⟩" />
                        <Vector3D start={[0, 0, 0]} end={[0, 1, 0]} color="#22c55e" label="|1⟩" />
                        <Vector3D start={[0, 0, 0]} end={[0.6, 0.8, 0]} color="#f59e0b" label="|ψ⟩" />
                        <gridHelper args={[3, 6, '#1e293b', '#1e293b']} rotation={[Math.PI / 2, 0, 0]} />
                      </group>
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">Any state |ψ⟩ in the 2D Hilbert space can be expressed as a combination of |0⟩ and |1⟩.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Define basis vectors
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)

# Check linear independence using determinant
basis_matrix = np.hstack([zero, one])
det = np.linalg.det(basis_matrix)
print(f"Basis matrix:\\n{basis_matrix}")
print(f"Determinant: {det:.4f}")
print(f"Linearly independent: {abs(det) > 1e-10}")

# Express arbitrary state in basis
alpha = 0.6
beta = 0.8
psi = alpha * zero + beta * one
print(f"\\n|ψ⟩ = {alpha}|0⟩ + {beta}|1⟩")
print(f"|ψ⟩ = {psi.flatten()}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Multi-Qubit Systems Section */}
          {activeSection === 'multiqubit' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Multi-Qubit Systems</h2>
                  <p className="text-slate-400">Tensor products and entanglement</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <p className="text-slate-300 leading-relaxed mb-4">A system of n qubits exists in a <span className="text-indigo-400 font-semibold">2ⁿ-dimensional</span> complex vector space.</p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-800 p-4 rounded-lg"><p className="text-sm text-slate-300">|00⟩ = [1, 0, 0, 0]ᵀ</p></div>
                    <div className="bg-slate-800 p-4 rounded-lg"><p className="text-sm text-slate-300">|11⟩ = [0, 0, 0, 1]ᵀ</p></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Bell State (Entanglement)</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-72">
                    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <MultiQubitSystem />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <div className="math-formula text-center text-xl mt-4">|Φ⁺⟩ = (1/√2)(|00⟩ + |11⟩)</div>
                  <p className="text-sm text-slate-400 mt-3">The Bell state is <span className="text-amber-400">entangled</span> - it cannot be decomposed into two independent single-qubit states.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Single qubit states
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)

# Tensor product for 2-qubit states
state_00 = np.kron(zero, zero)  # |00⟩
state_01 = np.kron(zero, one)   # |01⟩
state_10 = np.kron(one, zero)   # |10⟩
state_11 = np.kron(one, one)    # |11⟩

print("2-qubit basis states:")
print(f"|00⟩ = {state_00.flatten()}")
print(f"|01⟩ = {state_01.flatten()}")
print(f"|10⟩ = {state_10.flatten()}")
print(f"|11⟩ = {state_11.flatten()}")

# Bell state |Φ⁺⟩
phi_plus = (1/np.sqrt(2)) * (state_00 + state_11)
print(f"\\nBell state |Φ⁺⟩ = {phi_plus.flatten()}")

# Verify normalization
print(f"Norm: {np.linalg.norm(phi_plus):.4f}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quantum Gates Section */}
          {activeSection === 'gates' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Vector Transformations (Quantum Gates)</h2>
                  <p className="text-slate-400">Unitary operations on the Bloch sphere</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <p className="text-slate-300 leading-relaxed mb-4">Quantum gates are <span className="text-indigo-400 font-semibold">unitary transformations</span> acting on vectors.</p>
                  <div className="math-formula text-center text-xl">H = (1/√2) [1  1; 1  -1]</div>
                  <p className="text-slate-300 mt-4">The Hadamard gate creates superposition: H|0⟩ = |+⟩</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Hadamard Gate Animation</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-80">
                    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <QuantumGate gateType="H" />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">Watch the state vector rotate on the Bloch sphere as the Hadamard gate is applied.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Define quantum gates
H = (1/np.sqrt(2)) * np.array([[1, 1], [1, -1]], dtype=complex)  # Hadamard
X = np.array([[0, 1], [1, 0]], dtype=complex)  # Pauli-X (NOT)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)  # Pauli-Y
Z = np.array([[1, 0], [0, -1]], dtype=complex)  # Pauli-Z

# Initial state |0⟩
zero = np.array([[1], [0]], dtype=complex)

# Apply Hadamard gate
result = np.dot(H, zero)
print("H|0⟩ = |+⟩:")
print(np.round(result, 3))

# Apply X gate (bit flip)
result_x = np.dot(X, zero)
print("\\nX|0⟩ = |1⟩:")
print(result_x)

# Verify unitarity: U†U = I
print("\\nVerify H is unitary:")
print(f"H†H = \\n{np.round(np.dot(H.conj().T, H), 3)}")`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Outer Product Section */}
          {activeSection === 'outer' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Grid3X3 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Outer Product & Density Matrix</h2>
                  <p className="text-slate-400">Matrix representation of quantum states</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <p className="text-slate-300 leading-relaxed mb-4">The <span className="text-indigo-400 font-semibold">outer product</span> of two vectors forms a matrix:</p>
                  <div className="math-formula text-center text-xl">|ψ⟩⟨φ| = [ψ₁, ψ₂]ᵀ [φ₁*, φ₂*]</div>
                  <p className="text-slate-300 mt-4">For a single state |ψ⟩, this becomes the <span className="text-amber-400 font-semibold">density matrix</span>: ρ = |ψ⟩⟨ψ|</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Density Matrix Visualization</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-72">
                    <Canvas camera={{ position: [2, 2, 3], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <DensityMatrix />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <p className="text-sm text-slate-400 mt-3">The density matrix for |+⟩ state. Bar heights represent matrix element magnitudes.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

# Define |+⟩ state
psi_plus = (1/np.sqrt(2)) * np.array([[1], [1]], dtype=complex)

# Compute density matrix ρ = |ψ⟩⟨ψ|
rho = np.outer(psi_plus, np.conjugate(psi_plus))
print("Density matrix for |+⟩:")
print(np.round(rho, 3))

# Properties of density matrix
print(f"\\nTrace(ρ) = {np.trace(rho):.4f}")  # Should be 1
print(f"ρ² = ρ (pure state): {np.allclose(np.dot(rho, rho), rho)}")

# Density matrix for |0⟩
zero = np.array([[1], [0]], dtype=complex)
rho_zero = np.outer(zero, np.conjugate(zero))
print("\\nDensity matrix for |0⟩:")
print(rho_zero)`} />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bloch Sphere Section */}
          {activeSection === 'bloch' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl quantum-gradient flex items-center justify-center">
                  <Circle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Bloch Sphere Representation</h2>
                  <p className="text-slate-400">Visualizing qubit states in 3D</p>
                </div>
              </div>

              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <p className="text-slate-300 leading-relaxed mb-4">A general qubit state can be written as:</p>
                  <div className="math-formula text-center text-xl">|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩</div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-indigo-400 font-semibold">θ (theta)</p>
                      <p className="text-sm text-slate-300">Polar angle → amplitude ratio</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-amber-400 font-semibold">φ (phi)</p>
                      <p className="text-sm text-slate-300">Azimuthal angle → relative phase</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader><CardTitle>Interactive Bloch Sphere</CardTitle></CardHeader>
                <CardContent>
                  <div className="visualization-container h-96">
                    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <BlochSphere theta={theta[0]} phi={phi[0]} />
                      <OrbitControls enableZoom={true} />
                    </Canvas>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-sm text-slate-400">θ (theta): {(theta[0] * 180 / Math.PI).toFixed(0)}°</label>
                      <Slider value={theta} onValueChange={setTheta} min={0} max={Math.PI} step={0.01} className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400">φ (phi): {(phi[0] * 180 / Math.PI).toFixed(0)}°</label>
                      <Slider value={phi} onValueChange={setPhi} min={0} max={2 * Math.PI} step={0.01} className="mt-2" />
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                    <p className="text-sm text-slate-300">
                      Current state: |ψ⟩ = {Math.cos(theta[0]/2).toFixed(3)}|0⟩ + 
                      ({(Math.cos(phi[0]) * Math.sin(theta[0]/2)).toFixed(3)} + {(Math.sin(phi[0]) * Math.sin(theta[0]/2)).toFixed(3)}i)|1⟩
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    Python Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code={`import numpy as np

def bloch_to_state(theta, phi):
    """Convert Bloch sphere coordinates to state vector"""
    alpha = np.cos(theta/2)
    beta = np.exp(1j * phi) * np.sin(theta/2)
    return np.array([[alpha], [beta]], dtype=complex)

# Example: θ = 60°, φ = 45°
theta = np.pi/3  # 60 degrees
phi = np.pi/4    # 45 degrees

psi = bloch_to_state(theta, phi)
print(f"θ = {np.degrees(theta):.0f}°, φ = {np.degrees(phi):.0f}°")
print(f"|ψ⟩ = {np.round(psi.flatten(), 3)}")

# Special states on Bloch sphere
states = {
    "|0⟩ (North pole)": (0, 0),
    "|1⟩ (South pole)": (np.pi, 0),
    "|+⟩ (X+ axis)": (np.pi/2, 0),
    "|−⟩ (X- axis)": (np.pi/2, np.pi),
    "|i⟩ (Y+ axis)": (np.pi/2, np.pi/2),
}

print("\\nSpecial states on Bloch sphere:")
for name, (t, p) in states.items():
    state = bloch_to_state(t, p)
    print(f"{name}: {np.round(state.flatten(), 3)}")`} />
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

export default App
