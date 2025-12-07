import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrthogonalVectorsVisualization, OrthonormalBasisVisualization, MutuallyExclusiveVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function OrthogonalityConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">8. Orthogonality</h2>
        <p className="text-slate-300 text-lg">
          Two vectors are orthogonal if their inner product is zero: ⟨u|v⟩ = 0.
          In quantum computing, orthogonal states represent mutually exclusive measurement outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Perpendicular Vectors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <OrthogonalVectorsVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Orthogonal vectors meet at 90°. Their inner product equals zero.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Orthonormal Basis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <OrthonormalBasisVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              |0⟩ and |1⟩ are orthonormal: orthogonal and normalized.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">3D Orthogonal Axes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <MutuallyExclusiveVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            The X, Y, Z axes form a mutually orthogonal set - each pair is perpendicular.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Physical Meaning</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Mutually exclusive:</strong> If ⟨ψ|φ⟩ = 0, measuring |ψ⟩ when in state |φ⟩ has probability 0</p>
          <p><strong className="text-purple-400">Distinguishable:</strong> Orthogonal states can be perfectly distinguished by measurement</p>
          <p><strong className="text-blue-400">Complete basis:</strong> An orthonormal basis allows unique decomposition of any state</p>
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

export default OrthogonalityConcept
