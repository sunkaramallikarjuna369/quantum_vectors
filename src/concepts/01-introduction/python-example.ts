export const pythonCode = `import numpy as np

# Classical vector in 3D
classical_vector = np.array([3, 4, 0])
print(f"Classical vector: {classical_vector}")
print(f"Magnitude: {np.linalg.norm(classical_vector)}")

# Quantum state vector (qubit)
# |ψ⟩ = α|0⟩ + β|1⟩
zero = np.array([[1], [0]], dtype=complex)  # |0⟩
one = np.array([[0], [1]], dtype=complex)   # |1⟩

# Create superposition state |+⟩ = (1/√2)(|0⟩ + |1⟩)
alpha = 1/np.sqrt(2)
beta = 1/np.sqrt(2)
psi = alpha * zero + beta * one

print(f"\\nQuantum state |ψ⟩:")
print(psi)
print(f"Probability of |0⟩: {np.abs(alpha)**2}")
print(f"Probability of |1⟩: {np.abs(beta)**2}")`
