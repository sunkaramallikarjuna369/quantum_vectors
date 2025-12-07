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
        <h2 className="text-3xl font-bold text-white mb-2">13. Bloch Sphere Representation</h2>
        <p className="text-slate-300 text-lg">
          The Bloch sphere is a geometric representation of a single qubit state.
          Any pure state |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩ maps to a point on the unit sphere.
        </p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Interactive Bloch Sphere</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-slate-900 rounded-lg">
            <InteractiveBlochSphere theta={theta} phi={phi} />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">θ (theta): {(theta * 180 / Math.PI).toFixed(0)}°</label>
              <Slider
                value={[theta]}
                onValueChange={(v) => setTheta(v[0])}
                min={0}
                max={Math.PI}
                step={0.05}
                className="w-full"
              />
              <p className="text-slate-500 text-xs">Controls latitude (0° = |0⟩, 180° = |1⟩)</p>
            </div>
            <div className="space-y-2">
              <label className="text-slate-300 text-sm">φ (phi): {(phi * 180 / Math.PI).toFixed(0)}°</label>
              <Slider
                value={[phi]}
                onValueChange={(v) => setPhi(v[0])}
                min={0}
                max={Math.PI * 2}
                step={0.05}
                className="w-full"
              />
              <p className="text-slate-500 text-xs">Controls longitude (relative phase)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Important States on Bloch Sphere</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <BlochSphereStatesVisualization />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-blue-400">|0⟩</span>: North pole (θ=0)
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-red-400">|1⟩</span>: South pole (θ=π)
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-green-400">|+⟩</span>: +X axis
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-purple-400">|-⟩</span>: -X axis
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-amber-400">|+i⟩</span>: +Y axis
            </div>
            <div className="bg-slate-900 p-2 rounded text-center">
              <span className="text-pink-400">|-i⟩</span>: -Y axis
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Bloch Sphere Formula</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-center space-y-2">
            <p className="text-lg">|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩</p>
            <p className="text-sm text-slate-400">where θ ∈ [0, π] and φ ∈ [0, 2π)</p>
          </div>
          <div className="mt-4 space-y-2">
            <p><strong className="text-amber-400">θ (polar angle):</strong> Determines probability amplitudes</p>
            <p><strong className="text-purple-400">φ (azimuthal angle):</strong> Determines relative phase</p>
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
