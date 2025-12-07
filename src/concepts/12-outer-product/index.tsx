import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OuterProductVisualization, DensityMatrixVisualization, ProjectorVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function OuterProductConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">12. Outer Product & Density Matrices</h2>
        <p className="text-slate-300 text-lg">
          The outer product |ψ⟩⟨φ| creates a matrix from two vectors. When |ψ⟩ = |φ⟩, this gives the density matrix ρ = |ψ⟩⟨ψ|,
          which describes quantum states including mixed states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Outer Product Formula</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <OuterProductVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              |ψ⟩⟨φ| produces a matrix by multiplying column by row vector.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Density Matrix (3D)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <DensityMatrixVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Density matrix elements visualized as 3D bars. Diagonal = populations, off-diagonal = coherences.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Projection Operators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <ProjectorVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            |0⟩⟨0| and |1⟩⟨1| are projectors onto the computational basis states.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Properties</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Pure state:</strong> ρ = |ψ⟩⟨ψ| with Tr(ρ²) = 1</p>
          <p><strong className="text-purple-400">Mixed state:</strong> ρ = Σᵢ pᵢ|ψᵢ⟩⟨ψᵢ| with Tr(ρ²) &lt; 1</p>
          <p><strong className="text-blue-400">Projector:</strong> P² = P (idempotent)</p>
          <p><strong className="text-green-400">Completeness:</strong> |0⟩⟨0| + |1⟩⟨1| = I</p>
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

export default OuterProductConcept
