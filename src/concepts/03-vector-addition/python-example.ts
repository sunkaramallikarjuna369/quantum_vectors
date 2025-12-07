export const pythonCode = `import numpy as np

# Vector addition
v1 = np.array([[1], [0]], dtype=complex)  # |0⟩
v2 = np.array([[0], [1]], dtype=complex)  # |1⟩

# Add vectors (unnormalized)
sum_unnormalized = v1 + v2
print("Unnormalized sum:")
print(sum_unnormalized)

# Normalize to create valid quantum state
norm = np.linalg.norm(sum_unnormalized)
plus_state = sum_unnormalized / norm
print(f"\\nNormalized |+⟩ state:")
print(plus_state)

# Verify it's a valid quantum state
print(f"\\nNorm of |+⟩: {np.linalg.norm(plus_state)}")

# Vector subtraction creates |-⟩ state
minus_unnormalized = v1 - v2
minus_state = minus_unnormalized / np.linalg.norm(minus_unnormalized)
print(f"\\n|-⟩ state (|0⟩ - |1⟩)/√2:")
print(minus_state)

# Superposition with complex coefficients
alpha = (1 + 1j) / 2
beta = (1 - 1j) / 2
psi = alpha * v1 + beta * v2
psi = psi / np.linalg.norm(psi)
print(f"\\nComplex superposition:")
print(psi)`
