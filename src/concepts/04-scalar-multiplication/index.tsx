import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ScalarMultiplicationVisualization, PhaseVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function ScalarMultiplicationConcept() {
  const [scalar, setScalar] = useState(1.5)
  const [phase, setPhase] = useState(Math.PI / 4)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">4. Scalar Multiplication</h2>
        <p className="text-slate-300 text-lg">
          Multiplying a vector by a scalar changes its magnitude (and direction if negative).
          In quantum computing, complex scalars introduce phase factors that are crucial for interference effects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Amplitude Scaling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ScalarMultiplicationVisualization scalar={scalar} />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-slate-300 text-sm">Scalar: {scalar.toFixed(2)}</label>
              <Slider
                value={[scalar]}
                onValueChange={(v) => setScalar(v[0])}
                min={0.5}
                max={2.5}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Phase Factor e^(iφ)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <PhaseVisualization phase={phase} />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-slate-300 text-sm">Phase φ: {(phase * 180 / Math.PI).toFixed(0)}°</label>
              <Slider
                value={[phase]}
                onValueChange={(v) => setPhase(v[0])}
                min={0}
                max={Math.PI * 2}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Concepts</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Real scalar:</strong> Changes magnitude, c|v⟩ scales the vector</p>
          <p><strong className="text-purple-400">Complex scalar:</strong> e^(iφ)|ψ⟩ adds a global phase</p>
          <p><strong className="text-blue-400">Global phase:</strong> Doesn't affect measurement probabilities</p>
          <p><strong className="text-green-400">Relative phase:</strong> Affects interference and is physically meaningful</p>
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

export default ScalarMultiplicationConcept
