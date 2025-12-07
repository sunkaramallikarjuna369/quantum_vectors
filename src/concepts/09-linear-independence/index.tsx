import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LinearlyIndependentVisualization, LinearlyDependentVisualization, HilbertSpaceBasisVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function LinearIndependenceConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">9. Linear Independence</h2>
        <p className="text-slate-300 text-lg">
          Vectors are linearly independent if none can be written as a linear combination of the others.
          This concept is crucial for building complete bases in quantum Hilbert spaces.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Linearly Independent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <LinearlyIndependentVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Two independent vectors span a 2D plane. Any vector in the plane can be expressed as their combination.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Linearly Dependent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <LinearlyDependentVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Dependent vectors lie on the same line. One is a scalar multiple of the other.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Complete Basis for Hilbert Space</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <HilbertSpaceBasisVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            A complete orthonormal basis allows any state |ψ⟩ to be uniquely decomposed.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Properties</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Dimension:</strong> The number of linearly independent vectors in a basis equals the dimension of the space</p>
          <p><strong className="text-purple-400">Qubit:</strong> 2D Hilbert space needs 2 independent vectors (|0⟩, |1⟩)</p>
          <p><strong className="text-blue-400">n-qubit:</strong> 2ⁿ-dimensional space needs 2ⁿ basis vectors</p>
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

export default LinearIndependenceConcept
