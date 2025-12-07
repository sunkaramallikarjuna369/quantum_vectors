import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VectorDefinitionVisualization, ColumnVectorVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function VectorDefinitionConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">2. How We Write Vectors</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: A vector is just a list of numbers stacked on top of each other, like a grocery list but with numbers.
        </p>
        <p className="text-slate-300">
          Imagine you're describing where a treasure is buried: "Go 3 steps right, 4 steps forward, and 2 steps up." 
          We can write this as a neat stack of numbers: [3, 4, 2]. That's a vector! 
          Each number tells you how far to go in one direction.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>The funny symbols:</strong> In quantum physics, we write vectors with special brackets. 
            |ψ⟩ (called a "ket") is like writing the vector standing up. 
            ⟨ψ| (called a "bra") is the same vector lying on its side. 
            Don't worry about memorizing this - just know that |0⟩ means "the state zero" and |1⟩ means "the state one."
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Breaking Down an Arrow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <VectorDefinitionVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> An arrow broken into its parts - how far it goes in the X direction (red), 
              Y direction (green), and Z direction (blue). These three numbers ARE the vector.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quantum State as Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ColumnVectorVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> A qubit written as two numbers stacked: the top number (α) says 
              "how much |0⟩" and the bottom number (β) says "how much |1⟩". Together they must add up to 100% probability.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">|ψ⟩ (ket):</strong> The quantum state written as a vertical list of numbers</p>
          <p><strong className="text-purple-400">⟨ψ| (bra):</strong> The same state written horizontally (used for calculations)</p>
          <p><strong className="text-blue-400">The rule:</strong> The probabilities must add up to 1 (100%) - this keeps things physical!</p>
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

export default VectorDefinitionConcept
