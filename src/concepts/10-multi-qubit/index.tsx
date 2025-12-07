import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TensorProductVisualization, EntangledStateVisualization, FourDimensionalBasisVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function MultiQubitConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">10. Multi-Qubit Systems</h2>
        <p className="text-slate-300 text-lg">
          Multi-qubit systems are described using tensor products. The combined state space has dimension 2ⁿ for n qubits.
          This exponential growth enables quantum parallelism and entanglement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Tensor Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <TensorProductVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Two qubits combine via tensor product: |ψ⟩ ⊗ |φ⟩ creates a 4-dimensional space.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Entangled State (Bell State)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <EntangledStateVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 shows quantum correlation.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">2-Qubit Basis States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <FourDimensionalBasisVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            The 4 computational basis states: |00⟩, |01⟩, |10⟩, |11⟩
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Tensor Product:</strong> |ψ⟩ ⊗ |φ⟩ combines individual qubit states</p>
          <p><strong className="text-purple-400">Separable:</strong> States that can be written as tensor products of individual qubits</p>
          <p><strong className="text-blue-400">Entangled:</strong> States that cannot be factored into individual qubit states</p>
          <p><strong className="text-green-400">Dimension:</strong> n qubits → 2ⁿ dimensional Hilbert space</p>
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

export default MultiQubitConcept
