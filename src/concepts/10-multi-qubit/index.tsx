import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TensorProductVisualization, EntangledStateVisualization, FourDimensionalBasisVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function MultiQubitConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">10. Multiple Qubits: Where the Magic Happens</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: When you combine qubits, the possibilities multiply - and that's where quantum computing gets its power!
        </p>
        <p className="text-slate-300">
          Think of two coins. Each can be heads or tails, so together you have 4 possibilities: HH, HT, TH, TT. 
          With quantum coins (qubits), you can be in ALL four possibilities at once! 
          Add more qubits and the possibilities explode: 3 qubits = 8 states, 10 qubits = 1024 states, 50 qubits = more states than atoms in your body!
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>The quantum superpower:</strong> This is why quantum computers can solve certain problems faster. 
            While a regular computer checks possibilities one by one, a quantum computer can explore many paths simultaneously. 
            And when qubits become "entangled," measuring one instantly tells you about the other - even if they're far apart!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Combining Two Qubits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <TensorProductVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Two separate qubits being combined. 
              Each qubit has 2 states, so together they have 2×2 = 4 possible combinations!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Entanglement: Spooky Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <EntangledStateVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> Two qubits that are "entangled" - they're connected in a special way. 
              If you measure one and get 0, the other is ALWAYS 0 too. Measure 1? The other is 1. They're perfectly correlated!
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">The Four Possibilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <FourDimensionalBasisVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            <strong>What you're seeing:</strong> The 4 basic states of 2 qubits: |00⟩ (both 0), |01⟩ (first 0, second 1), 
            |10⟩ (first 1, second 0), and |11⟩ (both 1). Any 2-qubit state is a mix of these four!
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Key Ideas</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-2">
          <p><strong className="text-amber-400">Combining qubits:</strong> Each new qubit DOUBLES the number of possibilities</p>
          <p><strong className="text-purple-400">Separable states:</strong> When qubits act independently - like two separate coins</p>
          <p><strong className="text-blue-400">Entangled states:</strong> When qubits are mysteriously connected - measuring one affects the other!</p>
          <p><strong className="text-green-400">The power:</strong> 50 qubits can represent more states than any classical computer can store</p>
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

export default MultiQubitConcept
