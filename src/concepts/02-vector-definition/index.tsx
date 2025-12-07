import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VectorDefinitionVisualization, ColumnVectorVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function VectorDefinitionConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">2. Mathematical Definition of Vectors</h2>
        <p className="text-slate-300 text-lg">
          A vector is an ordered list of numbers (components) that can be represented as a column matrix.
          In quantum computing, we use Dirac notation where |ψ⟩ represents a column vector (ket) and ⟨ψ| represents a row vector (bra).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">3D Vector Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <VectorDefinitionVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              A vector |v⟩ = (v₁, v₂, v₃) shown with its components along each axis.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Column Vector Notation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ColumnVectorVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Quantum states are written as column vectors with complex amplitudes α and β.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Ket notation |ψ⟩:</strong> Column vector representing a quantum state</p>
          <p><strong className="text-purple-400">Bra notation ⟨ψ|:</strong> Row vector (conjugate transpose of ket)</p>
          <p><strong className="text-blue-400">Components:</strong> Complex numbers α, β where |α|² + |β|² = 1</p>
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

export default VectorDefinitionConcept
