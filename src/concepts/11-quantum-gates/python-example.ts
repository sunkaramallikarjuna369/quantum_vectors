export const pythonCode = `import numpy as np

# Define common quantum gates
I = np.array([[1, 0], [0, 1]], dtype=complex)  # Identity
X = np.array([[0, 1], [1, 0]], dtype=complex)  # Pauli-X (NOT)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)  # Pauli-Y
Z = np.array([[1, 0], [0, -1]], dtype=complex)  # Pauli-Z
H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)  # Hadamard

# Basis states
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)

# Apply Hadamard to |0⟩
plus = H @ zero
print("H|0⟩ = |+⟩:")
print(plus.flatten())

# Apply X gate (NOT) to |0⟩
flipped = X @ zero
print(f"\\nX|0⟩ = |1⟩:")
print(flipped.flatten())

# Apply Z gate to |+⟩
z_plus = Z @ plus
print(f"\\nZ|+⟩ = |-⟩:")
print(z_plus.flatten())

# CNOT gate (4x4 matrix)
CNOT = np.array([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0]
], dtype=complex)

# Apply CNOT to |10⟩ → |11⟩
state_10 = np.kron(one, zero)
result = CNOT @ state_10
print(f"\\nCNOT|10⟩:")
print(result.flatten())

# Verify unitarity: U†U = I
print(f"\\nH is unitary: {np.allclose(H.conj().T @ H, I)}")`
