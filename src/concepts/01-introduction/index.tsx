import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ClassicalVectorVisualization, QuantumStateVisualization } from './Visualization'
import { pythonCode } from './python-example'

export function IntroductionConcept() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">1. Introduction to Vectors</h2>
        <p className="text-slate-300 text-lg">
          Vectors are fundamental mathematical objects that represent quantities with both magnitude and direction.
          In quantum computing, vectors take on a special role as they represent quantum states in a complex vector space called Hilbert space.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Classical Vector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <ClassicalVectorVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              A classical vector representing a physical quantity like force or velocity in 3D space.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quantum State Vector</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-900 rounded-lg">
              <QuantumStateVisualization />
            </div>
            <p className="text-slate-400 mt-4 text-sm">
              A quantum state |ψ⟩ represented on the Bloch sphere, showing the superposition of |0⟩ and |1⟩ states.
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
