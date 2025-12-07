import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { NormVisualization, ProbabilityNormVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function NormConcept() {
  const [magnitude, setMagnitude] = useState(1.5)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">6. Norm (Magnitude)</h2>
        <p className="text-slate-300 text-lg">
          The norm ‖v‖ = √⟨v|v⟩ measures the "length" of a vector. In quantum computing,
          valid quantum states must have norm 1 (normalization condition) to ensure probabilities sum to 1.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Vector Normalization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <NormVisualization magnitude={magnitude} />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-slate-300 text-sm">Magnitude: {magnitude.toFixed(2)}</label>
              <Slider
                value={[magnitude]}
                onValueChange={(v) => setMagnitude(v[0])}
                min={0.5}
                max={2.5}
                step={0.1}
                className="w-full"
              />
            </div>
            <p className="text-slate-400 mt-2 text-sm">
              Normalized: v̂ = v / ‖v‖
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Probability Conservation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ProbabilityNormVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Quantum states must lie on the unit sphere: |α|² + |β|² = 1
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Mathematical Formula</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-center space-y-2">
            <p>‖ψ‖ = √(|α|² + |β|²)</p>
            <p className="text-amber-400">For valid quantum states: ‖ψ‖ = 1</p>
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

export default NormConcept
