import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VectorAdditionVisualization, SuperpositionVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function VectorAdditionConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">3. Vector Addition & Subtraction</h2>
        <p className="text-slate-300 text-lg">
          Vector addition is performed component-wise. In quantum computing, this corresponds to the superposition principle - 
          quantum states can be added together to create new valid quantum states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Parallelogram Rule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <VectorAdditionVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Vector addition follows the parallelogram rule: |v₁⟩ + |v₂⟩ gives the diagonal.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quantum Superposition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <SuperpositionVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              The |+⟩ state is a superposition: |+⟩ = (1/√2)(|0⟩ + |1⟩)
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Mathematical Formula</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-center text-lg">
            |v₁⟩ + |v₂⟩ = [a₁ + a₂, b₁ + b₂]ᵀ
          </div>
          <p className="mt-4">
            For quantum states, the result must be normalized to ensure probabilities sum to 1.
          </p>
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

export default VectorAdditionConcept
