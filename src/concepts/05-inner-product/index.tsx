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
        <h2 className="text-3xl font-bold text-white mb-2">5. How Similar Are Two Vectors?</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: The inner product tells you how much two arrows point in the same direction.
        </p>
        <p className="text-slate-300">
          Imagine two flashlights. If they point the same way, their beams overlap completely (inner product = 1). 
          If they point in opposite directions, there's no overlap (inner product = -1). 
          If they're perpendicular (at 90°), the overlap is zero.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>Why this matters in quantum:</strong> The inner product tells us the probability of one quantum state 
            "becoming" another when measured. If two states have zero inner product, measuring one will NEVER give you the other - 
            they're completely different possibilities, like heads and tails on a coin.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Angle Between Arrows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <InnerProductVisualization angle={angle} />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-slate-300 text-sm">
                <strong>Try it!</strong> Angle: {(angle * 180 / Math.PI).toFixed(0)}°
              </label>
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
              <strong>Overlap value:</strong> {Math.cos(angle).toFixed(3)} 
              {Math.abs(Math.cos(angle)) > 0.9 ? " (very similar!)" : Math.abs(Math.cos(angle)) < 0.1 ? " (almost perpendicular)" : ""}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quantum State Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <BraKetVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Two quantum states being compared. 
              The inner product tells us: "If I have state A, what's the chance I measure state B?"
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Same direction (0°):</strong> Inner product = 1 (identical states)</p>
          <p><strong className="text-purple-400">Perpendicular (90°):</strong> Inner product = 0 (completely different, like |0⟩ and |1⟩)</p>
          <p><strong className="text-blue-400">Opposite (180°):</strong> Inner product = -1 (opposite states)</p>
          <p><strong className="text-green-400">The probability rule:</strong> Square the inner product to get the actual probability!</p>
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
