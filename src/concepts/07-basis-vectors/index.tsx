import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ComputationalBasisVisualization, BasisExpansionVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function BasisVectorsConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">7. Building Blocks: Basis Vectors</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: Basis vectors are like LEGO bricks - you can build any vector by combining them!
        </p>
        <p className="text-slate-300">
          Think of directions: "North" and "East" are basis directions. Any direction you want to go 
          (like "northeast") can be described as a mix of these two. In quantum computing, |0⟩ and |1⟩ 
          are our basic building blocks - every qubit state is some combination of these two.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>Why this matters:</strong> Just like you can describe any location on a map using 
            latitude and longitude, you can describe any quantum state using |0⟩ and |1⟩. 
            These are the "coordinates" of the quantum world!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">The Two Basic States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ComputationalBasisVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> |0⟩ points up (north pole), |1⟩ points down (south pole). 
              These are the two "pure" states - like a coin showing definitely heads or definitely tails.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Mixing the Basics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <BasisExpansionVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Any quantum state (orange arrow) is made by mixing 
              some amount of |0⟩ with some amount of |1⟩. The recipe: "α parts of |0⟩ plus β parts of |1⟩"
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Different Ways to Measure</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-3">
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-blue-400 font-semibold">Standard basis (up/down):</p>
            <p>|0⟩ = "definitely up" and |1⟩ = "definitely down" - like asking "is the coin heads or tails?"</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-green-400 font-semibold">Plus/minus basis (sideways):</p>
            <p>|+⟩ = "equal mix pointing right" and |-⟩ = "equal mix pointing left" - a different way to look at the same qubit!</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-purple-400 font-semibold">The cool part:</p>
            <p>You can choose WHICH basis to measure in - and you'll get different answers depending on your choice!</p>
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

export default BasisVectorsConcept
