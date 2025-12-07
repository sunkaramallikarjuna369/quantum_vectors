import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BookOpen, Target, Zap, Layers, GitBranch, Grid3X3, Box, RotateCcw, Atom, Circle, Cpu, Square } from 'lucide-react'

// Import all concept components from their folders
import { IntroductionConcept } from './concepts/01-introduction'
import { VectorDefinitionConcept } from './concepts/02-vector-definition'
import { VectorAdditionConcept } from './concepts/03-vector-addition'
import { ScalarMultiplicationConcept } from './concepts/04-scalar-multiplication'
import { InnerProductConcept } from './concepts/05-inner-product'
import { NormConcept } from './concepts/06-norm'
import { BasisVectorsConcept } from './concepts/07-basis-vectors'
import { OrthogonalityConcept } from './concepts/08-orthogonality'
import { LinearIndependenceConcept } from './concepts/09-linear-independence'
import { MultiQubitConcept } from './concepts/10-multi-qubit'
import { QuantumGatesConcept } from './concepts/11-quantum-gates'
import { OuterProductConcept } from './concepts/12-outer-product'
import { BlochSphereConcept } from './concepts/13-bloch-sphere'

// Concept navigation data
const concepts = [
  { id: 'intro', title: '1. Introduction', icon: <BookOpen className="w-4 h-4" />, component: IntroductionConcept },
  { id: 'definition', title: '2. Vector Definition', icon: <Target className="w-4 h-4" />, component: VectorDefinitionConcept },
  { id: 'addition', title: '3. Vector Addition', icon: <Zap className="w-4 h-4" />, component: VectorAdditionConcept },
  { id: 'scalar', title: '4. Scalar Multiplication', icon: <Layers className="w-4 h-4" />, component: ScalarMultiplicationConcept },
  { id: 'inner', title: '5. Inner Product', icon: <GitBranch className="w-4 h-4" />, component: InnerProductConcept },
  { id: 'norm', title: '6. Norm (Magnitude)', icon: <Target className="w-4 h-4" />, component: NormConcept },
  { id: 'basis', title: '7. Basis Vectors', icon: <Grid3X3 className="w-4 h-4" />, component: BasisVectorsConcept },
  { id: 'orthogonal', title: '8. Orthogonality', icon: <Box className="w-4 h-4" />, component: OrthogonalityConcept },
  { id: 'independence', title: '9. Linear Independence', icon: <RotateCcw className="w-4 h-4" />, component: LinearIndependenceConcept },
  { id: 'multiqubit', title: '10. Multi-Qubit Systems', icon: <Atom className="w-4 h-4" />, component: MultiQubitConcept },
  { id: 'gates', title: '11. Quantum Gates', icon: <Cpu className="w-4 h-4" />, component: QuantumGatesConcept },
  { id: 'outer', title: '12. Outer Product', icon: <Square className="w-4 h-4" />, component: OuterProductConcept },
  { id: 'bloch', title: '13. Bloch Sphere', icon: <Circle className="w-4 h-4" />, component: BlochSphereConcept },
]

function App() {
  const [activeConcept, setActiveConcept] = useState('intro')

  const ActiveComponent = concepts.find(c => c.id === activeConcept)?.component || IntroductionConcept

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Atom className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Quantum Vectors Tutorial
              </h1>
              <p className="text-xs text-slate-400">Interactive 3D Visualizations</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-72 border-r border-slate-700 bg-slate-900/30 min-h-screen sticky top-16 h-screen">
          <ScrollArea className="h-full py-4">
            <div className="px-3 space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
                Concepts
              </p>
              {concepts.map((concept) => (
                <Button
                  key={concept.id}
                  variant={activeConcept === concept.id ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-2 text-left h-auto py-2 px-3 ${
                    activeConcept === concept.id 
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  onClick={() => setActiveConcept(concept.id)}
                >
                  {concept.icon}
                  <span className="text-sm">{concept.title}</span>
                </Button>
              ))}
            </div>
            
            {/* Folder Structure Info */}
            <div className="px-3 mt-6">
              <div className="bg-indigo-900/30 rounded-lg p-3 border border-indigo-700/50">
                <p className="text-xs font-semibold text-indigo-300 mb-2">Code Organization</p>
                <p className="text-xs text-slate-400 mb-2">
                  Each concept has its own folder with 3 files:
                </p>
                <div className="text-xs text-slate-300 font-mono bg-slate-900/50 p-2 rounded space-y-1">
                  <p className="text-indigo-400">src/concepts/</p>
                  <p className="pl-2">01-introduction/</p>
                  <p className="pl-2">02-vector-definition/</p>
                  <p className="pl-2">03-vector-addition/</p>
                  <p className="pl-2">04-scalar-multiplication/</p>
                  <p className="pl-2">05-inner-product/</p>
                  <p className="pl-2">06-norm/</p>
                  <p className="pl-2">07-basis-vectors/</p>
                  <p className="pl-2">08-orthogonality/</p>
                  <p className="pl-2">09-linear-independence/</p>
                  <p className="pl-2">10-multi-qubit/</p>
                  <p className="pl-2">11-quantum-gates/</p>
                  <p className="pl-2">12-outer-product/</p>
                  <p className="pl-2">13-bloch-sphere/</p>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  <p className="font-semibold text-slate-300 mb-1">Inside each folder:</p>
                  <p><span className="text-green-400">Visualization.tsx</span> - 3D graphics</p>
                  <p><span className="text-blue-400">index.tsx</span> - Educational content</p>
                  <p><span className="text-amber-400">python-example.ts</span> - Code examples</p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
