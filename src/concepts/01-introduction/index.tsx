import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ClassicalVectorVisualization, QuantumStateVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function IntroductionConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">1. Introduction to Vectors</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: A vector is just an arrow that points somewhere and has a certain length.
        </p>
        <p className="text-slate-300">
          Think of giving someone directions: "Walk 3 blocks north, then 2 blocks east." That's essentially a vector - 
          it tells you both HOW FAR to go (the length) and WHICH WAY to go (the direction). 
          In quantum computing, we use these arrows to describe the "state" of a quantum bit (qubit) - 
          like describing which way a tiny compass needle is pointing.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>Why does this matter?</strong> In regular computers, a bit is either 0 or 1 - like a light switch that's either off or on. 
            In quantum computers, a qubit can be in a "superposition" - imagine a spinning coin that's both heads AND tails at the same time until you look at it. 
            We use vectors (arrows) to describe exactly how much "heads" and how much "tails" is in that spin.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Everyday Vector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ClassicalVectorVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> An arrow in 3D space - just like pointing your finger in a direction. 
              The arrow's length shows "how much" and its direction shows "which way." 
              Drag to rotate the view!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quantum State (Bloch Sphere)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <QuantumStateVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> A qubit's state shown as an arrow on a sphere. 
              The top means "definitely 0", the bottom means "definitely 1", and anywhere in between means "a mix of both." 
              The orange arrow shows one possible quantum state.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            Python Example
          </CardTitle>
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

export default IntroductionConcept
