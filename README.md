# Quantum Vectors Interactive Tutorial

An interactive educational tutorial for learning vectors in quantum computing, featuring 3D visualizations and Python code examples.

**Live Demo:** [https://quantum-vectors-visualizer-907bolb6.devinapps.com](https://quantum-vectors-visualizer-907bolb6.devinapps.com)

## Features

- **13 Interactive Concepts** covering all aspects of vectors in quantum computing
- **3D Visualizations** using Three.js and React Three Fiber
- **Interactive Bloch Sphere** with adjustable theta and phi angles
- **Python Code Examples** for each concept
- **Modern Dark Theme UI** optimized for learning

## Concepts Covered

1. **Introduction** - Classical vs Quantum vectors
2. **Mathematical Definition** - Vector structure and components
3. **Vector Addition** - Superposition in quantum computing
4. **Scalar Multiplication** - Phase and amplitude
5. **Inner Product** - Overlap and probability amplitudes
6. **Norm (Magnitude)** - Normalization and probability conservation
7. **Basis Vectors** - Computational basis |0⟩ and |1⟩
8. **Orthogonality** - Mutually exclusive quantum states
9. **Linear Independence** - Building the Hilbert space
10. **Multi-Qubit Systems** - Tensor products and entanglement
11. **Quantum Gates** - Unitary transformations (Hadamard, Pauli gates)
12. **Outer Product** - Density matrices
13. **Bloch Sphere** - 3D representation of qubit states

## Tech Stack

- React 18 + TypeScript
- Vite
- Three.js / React Three Fiber
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sunkaramallikarjuna369/quantum_vectors.git
cd quantum_vectors

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Python Examples

Each concept includes runnable Python code examples using NumPy. To run the examples:

```bash
pip install numpy
```

Example - Creating a superposition state:

```python
import numpy as np

# Quantum state |+⟩ = (1/√2)(|0⟩ + |1⟩)
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)
plus = (1/np.sqrt(2)) * (zero + one)

print(f"|+⟩ state: {plus.flatten()}")
# Output: |+⟩ state: [0.70710678+0.j 0.70710678+0.j]
```

## License

MIT License

## Author

Created for quantum computing education.
