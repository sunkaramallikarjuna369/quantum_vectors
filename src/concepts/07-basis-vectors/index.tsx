import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ComputationalBasisVisualization, BasisExpansionVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function BasisVectorsConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">7. Basis Vectors</h2>
        <p className="text-slate-300 text-lg">
          Basis vectors form a complete set that can represent any vector in the space.
          In quantum computing, the computational basis {'{|0⟩, |1⟩}'} is the standard basis for a single qubit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Computational Basis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ComputationalBasisVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              |0⟩ and |1⟩ are the north and south poles of the Bloch sphere.
              |+⟩ and |-⟩ lie on the equator.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Basis Expansion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <BasisExpansionVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Any state |ψ⟩ = α|0⟩ + β|1⟩ is a linear combination of basis vectors.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Common Bases</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-3">
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-blue-400 font-semibold">Z-basis (Computational):</p>
            <p className="font-mono">|0⟩ = [1, 0]ᵀ, |1⟩ = [0, 1]ᵀ</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-green-400 font-semibold">X-basis (Hadamard):</p>
            <p className="font-mono">|+⟩ = (|0⟩+|1⟩)/√2, |-⟩ = (|0⟩-|1⟩)/√2</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-purple-400 font-semibold">Y-basis:</p>
            <p className="font-mono">|+i⟩ = (|0⟩+i|1⟩)/√2, |-i⟩ = (|0⟩-i|1⟩)/√2</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Python Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
            <code className="text-green-400">{pythonCode}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

export default BasisVectorsConcept
