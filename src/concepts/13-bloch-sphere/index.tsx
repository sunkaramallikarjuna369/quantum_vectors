import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { InteractiveBlochSphere, BlochSphereStatesVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function BlochSphereConcept() {
  const [theta, setTheta] = useState(Math.PI / 4)
  const [phi, setPhi] = useState(Math.PI / 4)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">13. The Bloch Sphere: Your Qubit's Globe</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: Every possible state of a single qubit can be shown as a point on a ball - like locations on Earth!
        </p>
        <p className="text-slate-300">
          Imagine a globe. The North Pole is |0⟩ (definitely zero), the South Pole is |1⟩ (definitely one). 
          Every other point on the surface represents a superposition - a mix of 0 and 1. 
          Points near the North Pole are "mostly 0", points near the equator are "equal mix", and points near the South Pole are "mostly 1".
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>Why a sphere?</strong> A qubit has two "knobs" you can turn: how much 0 vs 1 (latitude), 
            and the phase angle (longitude). Just like latitude and longitude can describe any point on Earth, 
            these two angles can describe any qubit state. Play with the sliders below to explore!
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Play With the Bloch Sphere!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-slate-900 rounded-lg">
            <InteractiveBlochSphere theta={theta} phi={phi} />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">
                <strong>Latitude (θ):</strong> {(theta * 180 / Math.PI).toFixed(0)}°
              </label>
              <Slider
                value={[theta]}
                onValueChange={(v) => setTheta(v[0])}
                min={0}
                max={Math.PI}
                step={0.05}
                className="w-full"
              />
              <p className="text-slate-500 text-xs">0° = North Pole (|0⟩), 180° = South Pole (|1⟩), 90° = Equator (equal mix)</p>
            </div>
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">
                <strong>Longitude (φ):</strong> {(phi * 180 / Math.PI).toFixed(0)}°
              </label>
              <Slider
                value={[phi]}
                onValueChange={(v) => setPhi(v[0])}
                min={0}
                max={Math.PI * 2}
                step={0.05}
                className="w-full"
              />
              <p className="text-slate-500 text-xs">Controls the "phase" - which direction around the equator you're pointing</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Famous Locations on the Qubit Globe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <BlochSphereStatesVisualization />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-blue-400 font-bold">|0⟩</span>: North Pole - "definitely 0"
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-red-400 font-bold">|1⟩</span>: South Pole - "definitely 1"
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-green-400 font-bold">|+⟩</span>: East - "equal mix, + phase"
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-purple-400 font-bold">|-⟩</span>: West - "equal mix, - phase"
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-amber-400 font-bold">|+i⟩</span>: Front - "equal mix, +i phase"
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-pink-400 font-bold">|-i⟩</span>: Back - "equal mix, -i phase"
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Understanding the Coordinates</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="bg-slate-900 p-4 rounded-lg text-center space-y-2">
            <p className="text-lg">Any qubit state = some |0⟩ + some |1⟩</p>
            <p className="text-sm text-slate-400">The Bloch sphere shows exactly how much of each, plus the phase relationship</p>
          </div>
          <div className="mt-4 space-y-2">
            <p><strong className="text-amber-400">θ (theta):</strong> How far from the North Pole - determines the 0 vs 1 probability</p>
            <p><strong className="text-purple-400">φ (phi):</strong> How far around the equator - determines the phase (important for interference!)</p>
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

export default BlochSphereConcept
