export const pythonCode = `import numpy as np

# Computational basis states
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)

# Check orthogonality: ⟨0|1⟩ = 0
inner_01 = zero.conj().T @ one
print(f"⟨0|1⟩ = {inner_01[0,0].real}")
print(f"Orthogonal: {np.isclose(inner_01[0,0], 0)}")

# Check normalization: ⟨0|0⟩ = 1
inner_00 = zero.conj().T @ zero
print(f"\\n⟨0|0⟩ = {inner_00[0,0].real}")
print(f"Normalized: {np.isclose(inner_00[0,0], 1)}")

# Hadamard basis is also orthonormal
plus = (zero + one) / np.sqrt(2)
minus = (zero - one) / np.sqrt(2)

inner_pm = plus.conj().T @ minus
print(f"\\n⟨+|-⟩ = {inner_pm[0,0].real}")
print(f"|+⟩ and |-⟩ orthogonal: {np.isclose(inner_pm[0,0], 0)}")

# Gram-Schmidt orthogonalization example
v1 = np.array([[1], [1]], dtype=complex)
v2 = np.array([[1], [0]], dtype=complex)

# Normalize v1
u1 = v1 / np.linalg.norm(v1)

# Orthogonalize v2 against u1
proj = (u1.conj().T @ v2)[0,0] * u1
v2_orth = v2 - proj
u2 = v2_orth / np.linalg.norm(v2_orth)

print(f"\\nGram-Schmidt result:")
print(f"u1 = {u1.flatten()}")
print(f"u2 = {u2.flatten()}")
print(f"⟨u1|u2⟩ = {(u1.conj().T @ u2)[0,0]:.6f}")`
