import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VectorAdditionVisualization, SuperpositionVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function VectorAdditionConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">3. Adding Vectors Together</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: Adding vectors is like combining two sets of directions into one.
        </p>
        <p className="text-slate-300">
          Imagine you walk 3 blocks east, then 4 blocks north. Where do you end up? 
          You could also have walked diagonally to get to the same spot! 
          That diagonal path is what you get when you "add" the two walking directions together.
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>Why this matters in quantum:</strong> When we add quantum states together, we create "superposition" - 
            the qubit is in BOTH states at once! It's like the qubit is walking east AND north at the same time, 
            not choosing one path until we measure it.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Combining Two Arrows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <VectorAdditionVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Two arrows (purple and green) being added together. 
              The orange arrow is the result - it goes from the start to where you'd end up if you followed both arrows one after another.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Superposition: Being in Two States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <SuperpositionVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> The |+⟩ state is made by adding |0⟩ and |1⟩ together. 
              The result points sideways - equally "0" and "1" at the same time!
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="bg-slate-900 p-4 rounded-lg font-mono text-center text-lg">
            [3, 4] + [1, 2] = [3+1, 4+2] = [4, 6]
          </div>
          <p className="mt-4">
            <strong>In plain English:</strong> Just add the matching numbers together! First number plus first number, second plus second, and so on. 
            For quantum states, we also need to "normalize" (scale down) so probabilities still add up to 100%.
          </p>
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

export default VectorAdditionConcept
