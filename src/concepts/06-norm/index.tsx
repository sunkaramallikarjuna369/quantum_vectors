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
        <h2 className="text-3xl font-bold text-white mb-2">6. How Long Is the Arrow?</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: The norm is just the length of your arrow - how far it reaches from start to tip.
        </p>
        <p className="text-slate-300">
          Think of measuring a stick with a ruler. That measurement is the "norm" or "magnitude" of the stick. 
          For a vector, we measure from where it starts (the origin) to where it points.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>The golden rule of quantum:</strong> All valid quantum states must have length exactly 1. 
            Why? Because the length squared represents total probability, and probabilities must add up to 100%! 
            This is called "normalization" - we scale the arrow so its length is exactly 1.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Measuring Arrow Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <NormVisualization magnitude={magnitude} />
            </div>
            <div className="mt-4 space-y-2">
              <label className="text-slate-300 text-sm">
                <strong>Try it!</strong> Arrow length: {magnitude.toFixed(2)}
              </label>
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
              <strong>To normalize:</strong> Divide by the length to make it exactly 1
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Why Length = 1 Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ProbabilityNormVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Valid quantum states live on the surface of a sphere with radius 1. 
              This ensures all probabilities add up to exactly 100%.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">The Math (Don't Worry, It's Simple!)</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="bg-slate-900 p-4 rounded-lg text-center space-y-2">
            <p className="font-mono">Length = √(first² + second²)</p>
            <p className="text-sm text-slate-400">Just like finding the diagonal of a rectangle using the Pythagorean theorem!</p>
            <p className="text-amber-400 mt-2">For quantum states, this length MUST equal 1</p>
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
