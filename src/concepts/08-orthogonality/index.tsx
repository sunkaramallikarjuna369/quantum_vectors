import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrthogonalVectorsVisualization, OrthonormalBasisVisualization, MutuallyExclusiveVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function OrthogonalityConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">8. Perpendicular = Completely Different</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: When two arrows are perpendicular (at 90°), they have nothing in common - they're completely independent.
        </p>
        <p className="text-slate-300">
          Think of North and East on a compass. Going North doesn't get you any closer to the East - they're 
          completely separate directions. In quantum computing, |0⟩ and |1⟩ are perpendicular, meaning 
          they're totally different outcomes - you can't be "a little bit 0 and a little bit 1" when you measure!
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>The quantum meaning:</strong> If two states are perpendicular (orthogonal), 
            you can ALWAYS tell them apart with a measurement. It's like the difference between 
            heads and tails - when you look at a coin, you know exactly which one it is!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">90° = No Overlap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <OrthogonalVectorsVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Two arrows at right angles. 
              Their inner product is zero - they share nothing in common!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">|0⟩ and |1⟩ Are Perpendicular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <OrthonormalBasisVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> The basic qubit states |0⟩ and |1⟩ are perpendicular AND 
              have length 1. This makes them perfect building blocks!
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">3D Example: X, Y, Z Axes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <MutuallyExclusiveVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            <strong>What you're seeing:</strong> The X, Y, and Z axes are all perpendicular to each other. 
            Moving along X doesn't change your Y or Z position at all - they're independent!
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Why This Matters</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Either/or:</strong> Perpendicular states are mutually exclusive - if you're in one, you're definitely NOT in the other</p>
          <p><strong className="text-purple-400">Perfect measurement:</strong> You can always tell perpendicular states apart - no confusion possible!</p>
          <p><strong className="text-blue-400">Clean building blocks:</strong> Perpendicular vectors don't "interfere" with each other, making them ideal for building any state</p>
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

export default OrthogonalityConcept
