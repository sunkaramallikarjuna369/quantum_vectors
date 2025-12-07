import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HadamardGateVisualization, PauliGatesVisualization, CNOTGateVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function QuantumGatesConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">11. Quantum Gates: The Operations</h2>
        <p className="text-lg text-indigo-300 mb-4">
          In simple words: Quantum gates are like instructions that rotate or flip your qubit's arrow to a new position.
        </p>
        <p className="text-slate-300">
          Think of a quantum gate like a dance move for your qubit. Each gate tells the qubit to spin, flip, or rotate 
          in a specific way. The cool part? Every move can be undone - quantum gates are always reversible, 
          like a dance you can play backwards!
        </p>
      </div>

      <Card className="bg-indigo-900/30 border-indigo-700 mb-4">
        <CardContent className="pt-4">
          <p className="text-indigo-200">
            <strong>Why gates matter:</strong> Quantum algorithms are just sequences of gates - like a choreographed dance. 
            By applying the right gates in the right order, we can solve problems that would take regular computers forever. 
            The Hadamard gate creates superposition, and CNOT creates entanglement - the two key ingredients of quantum computing!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Hadamard: The Superposition Maker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <HadamardGateVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> The H gate takes a qubit from "definitely 0" to "equal mix of 0 and 1". 
              It's like taking a coin from lying flat to spinning in the air!
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pauli Gates: The Flippers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <PauliGatesVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              <strong>What you're seeing:</strong> X flips the qubit (like NOT in regular computers), 
              Z flips the phase, and Y does both. Think of them as 180° rotations around different axes.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">CNOT: The Entangler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-900 rounded-lg">
            <CNOTGateVisualization />
          </div>
          <p className="text-slate-400 mt-4 text-sm">
            <strong>What you're seeing:</strong> CNOT works on TWO qubits. If the first qubit (control) is 1, 
            it flips the second qubit (target). If control is 0, nothing happens. 
            This creates entanglement - the qubits become mysteriously connected!
          </p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">The Essential Gates</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300 space-y-3">
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-blue-400 font-semibold">Hadamard (H)</p>
            <p className="text-sm">Creates superposition - the starting point for most quantum algorithms</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-red-400 font-semibold">Pauli-X (NOT gate)</p>
            <p className="text-sm">Flips 0 to 1 and 1 to 0 - just like a classical NOT</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-green-400 font-semibold">Pauli-Z (Phase flip)</p>
            <p className="text-sm">Leaves |0⟩ alone but adds a minus sign to |1⟩ - changes the phase</p>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <p className="text-purple-400 font-semibold">CNOT (Controlled-NOT)</p>
            <p className="text-sm">The key to entanglement - makes two qubits work together</p>
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
