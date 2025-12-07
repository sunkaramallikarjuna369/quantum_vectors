import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OuterProductVisualization, DensityMatrixVisualization, ProjectorVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function OuterProductConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">12. Storing State Info in a Table</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: Instead of just storing the arrow, we can store all the probabilities in a neat table called a "density matrix."
        </p>
        <p className="text-slate-300">
          Sometimes we don't know exactly which quantum state we have - maybe it's state A with 50% chance, or state B with 50% chance. 
          The density matrix is like a spreadsheet that keeps track of all these possibilities at once. 
          It's a more complete way to describe quantum systems, especially when there's uncertainty.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>When do we need this?</strong> When qubits interact with their environment (like heat or noise), 
            they can become "mixed" - we lose some information about their exact state. 
            The density matrix captures this uncertainty. It's essential for understanding real quantum computers, 
            which always have some noise!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Building the Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <OuterProductVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> We create the density matrix by multiplying a vector by itself (sort of). 
              The result is a 2×2 table that contains all the probability information.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">The Probability Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <DensityMatrixVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> The density matrix as 3D bars. 
              The diagonal bars show "how much |0⟩" and "how much |1⟩". 
              The off-diagonal bars show quantum "coherence" - the superposition quality.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Measurement Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <ProjectorVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            <strong>What you're seeing:</strong> "Projectors" are like filters that ask "are you |0⟩?" or "are you |1⟩?". 
            When you measure a qubit, you're essentially applying one of these filters.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Ideas</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Pure state:</strong> We know exactly what state we have - the density matrix is "clean"</p>
          <p><strong className="text-purple-400">Mixed state:</strong> There's classical uncertainty - like a coin we haven't looked at yet</p>
          <p><strong className="text-blue-400">Diagonal entries:</strong> Tell you the probability of measuring 0 or 1</p>
          <p><strong className="text-green-400">Off-diagonal entries:</strong> Tell you about quantum superposition (coherence)</p>
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

export default OuterProductConcept
