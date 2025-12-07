import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HadamardGateVisualization, PauliGatesVisualization, CNOTGateVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function QuantumGatesConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">11. Quantum Gates</h2>
        <p className="text-slate-300 text-lg">
          Quantum gates are unitary transformations that manipulate qubit states.
          They preserve the norm (probability conservation) and are reversible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Hadamard Gate Animation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <HadamardGateVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              H gate transforms |0⟩ → |+⟩, creating superposition.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pauli Gates (X, Y, Z)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <PauliGatesVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              Pauli gates rotate the state by π around X, Y, or Z axis.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">CNOT Gate (2-Qubit)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <CNOTGateVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            CNOT flips the target qubit if and only if the control qubit is |1⟩.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Common Gates</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-3">
          <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm">
            <p className="text-blue-400">Hadamard: H = (1/√2)[[1,1],[1,-1]]</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm">
            <p className="text-red-400">Pauli-X: X = [[0,1],[1,0]] (NOT gate)</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm">
            <p className="text-green-400">Pauli-Z: Z = [[1,0],[0,-1]] (Phase flip)</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg font-mono text-sm">
            <p className="text-purple-400">CNOT: Entangles two qubits</p>
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

export default QuantumGatesConcept
