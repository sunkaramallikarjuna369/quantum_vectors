import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { InnerProductVisualization, BraKetVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function InnerProductConcept() {
  const [angle, setAngle] = useState(Math.PI / 4)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">5. Inner Product (Dot Product)</h2>
        <p className="text-slate-300 text-lg">
          The inner product ⟨u|v⟩ measures the "overlap" between two vectors. In quantum computing,
          it gives the probability amplitude for transitioning from one state to another.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Geometric Interpretation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <InnerProductVisualization angle={angle} />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-slate-300 text-sm">Angle θ: {(angle * 180 / Math.PI).toFixed(0)}°</label>
              <Slider
                value={[angle]}
                onValueChange={(v) => setAngle(v[0])}
                min={0}
                max={Math.PI}
                step={0.05}
                className="w-full"
              />
            </div>
            <p className="text-slate-400 mt-2 text-sm">
              ⟨u|v⟩ = |u||v|cos(θ) = {Math.cos(angle).toFixed(3)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quantum State Overlap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <BraKetVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              The inner product ⟨ψ|φ⟩ gives the probability amplitude for measuring |ψ⟩ when in state |φ⟩.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Properties</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">⟨ψ|ψ⟩ = 1:</strong> Normalized states have unit inner product with themselves</p>
          <p><strong className="text-purple-400">⟨ψ|φ⟩ = ⟨φ|ψ⟩*:</strong> Conjugate symmetry (swap and conjugate)</p>
          <p><strong className="text-blue-400">|⟨ψ|φ⟩|²:</strong> Probability of measuring |ψ⟩ given state |φ⟩</p>
          <p><strong className="text-green-400">⟨0|1⟩ = 0:</strong> Orthogonal states have zero overlap</p>
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

export default InnerProductConcept
