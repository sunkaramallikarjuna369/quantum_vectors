import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LinearlyIndependentVisualization, LinearlyDependentVisualization, HilbertSpaceBasisVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function LinearIndependenceConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">9. Are Your Arrows Truly Different?</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: Vectors are "independent" if you can't make one by stretching or combining the others.
        </p>
        <p className="text-slate-300">
          Imagine you have two arrows. If one is just a longer or shorter version of the other (pointing the same way), 
          they're "dependent" - you really only have one direction! But if they point in genuinely different directions, 
          they're "independent" - you need BOTH to describe all possible positions.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>Why this matters:</strong> To describe any quantum state, you need enough independent building blocks. 
            For one qubit, you need exactly 2 independent vectors (|0⟩ and |1⟩). 
            If your vectors aren't independent, you're missing directions you could go!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Independent: Different Directions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <LinearlyIndependentVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Two arrows pointing in genuinely different directions. 
              Together they can reach any point in the plane - like having both North and East on a compass.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Dependent: Same Direction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <LinearlyDependentVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Two arrows on the same line - one is just a stretched version of the other. 
              You can only move along that one line, not the whole plane!
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Building a Complete Set</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <HilbertSpaceBasisVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            <strong>What you're seeing:</strong> A complete set of independent vectors that can build ANY state in the space. 
            It's like having all the primary colors - you can mix them to make any color!
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">The Numbers Game</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">1 qubit:</strong> Needs 2 independent vectors (|0⟩ and |1⟩) - like having 2 directions</p>
          <p><strong className="text-purple-400">2 qubits:</strong> Needs 4 independent vectors - the possibilities multiply!</p>
          <p><strong className="text-blue-400">n qubits:</strong> Needs 2ⁿ vectors - this exponential growth is why quantum computers are powerful!</p>
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

export default LinearIndependenceConcept
