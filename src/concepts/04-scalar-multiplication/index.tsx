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
        <h2 className="text-3xl font-bold text-white mb-2">4. Stretching and Rotating Vectors</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: Multiplying a vector by a number makes it longer or shorter, like zooming in or out.
        </p>
        <p className="text-slate-300">
          Think of it like adjusting the volume on your phone. The sound wave (vector) stays the same shape, 
          but gets louder (bigger) or quieter (smaller). Multiply by 2? The arrow becomes twice as long. 
          Multiply by 0.5? It shrinks to half size.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>The quantum twist:</strong> In quantum computing, we can also "rotate" the arrow without changing its length. 
            This is called adding a "phase" - imagine spinning the arrow around like a clock hand. 
            This rotation affects how quantum states interfere with each other, which is key to quantum computing's power!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Stretching the Arrow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ScalarMultiplicationVisualization scalar={scalar} />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-slate-300 text-sm">
                <strong>Try it!</strong> Multiplier: {scalar.toFixed(2)}x
              </label>
              <Slider
                value={[scalar]}
                onValueChange={(v) => setScalar(v[0])}
                min={0.5}
                max={2.5}
                step={0.1}
                className="w-full"
              />
              <p className="text-slate-500 text-xs">Move the slider to make the orange arrow longer or shorter</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Rotating the Arrow (Phase)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <PhaseVisualization phase={phase} />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-slate-300 text-sm">
                <strong>Try it!</strong> Rotation: {(phase * 180 / Math.PI).toFixed(0)}°
              </label>
              <Slider
                value={[phase]}
                onValueChange={(v) => setPhase(v[0])}
                min={0}
                max={Math.PI * 2}
                step={0.1}
                className="w-full"
              />
              <p className="text-slate-500 text-xs">Move the slider to spin the arrow around (this is "phase")</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Stretching (real number):</strong> Makes the arrow longer or shorter - like turning up the volume</p>
          <p><strong className="text-purple-400">Rotating (phase):</strong> Spins the arrow around without changing its length - like moving clock hands</p>
          <p><strong className="text-blue-400">Fun fact:</strong> A full 360° rotation brings you back to the same state!</p>
          <p><strong className="text-green-400">Why it matters:</strong> Phase differences between qubits create interference - the secret sauce of quantum computing</p>
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
