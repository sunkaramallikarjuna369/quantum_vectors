export const pythonCode = `import numpy as np

# Computational basis (Z-basis)
zero = np.array([[1], [0]], dtype=complex)  # |0⟩
one = np.array([[0], [1]], dtype=complex)   # |1⟩

print("Computational Basis:")
print(f"|0⟩ = {zero.flatten()}")
print(f"|1⟩ = {one.flatten()}")

# Hadamard basis (X-basis)
plus = (zero + one) / np.sqrt(2)   # |+⟩
minus = (zero - one) / np.sqrt(2)  # |-⟩

print(f"\\nHadamard Basis:")
print(f"|+⟩ = {plus.flatten()}")
print(f"|-⟩ = {minus.flatten()}")

# Y-basis
plus_i = (zero + 1j * one) / np.sqrt(2)   # |+i⟩
minus_i = (zero - 1j * one) / np.sqrt(2)  # |-i⟩

print(f"\\nY-Basis:")
print(f"|+i⟩ = {plus_i.flatten()}")
print(f"|-i⟩ = {minus_i.flatten()}")

# Express arbitrary state in computational basis
theta = np.pi / 3
phi = np.pi / 4
alpha = np.cos(theta / 2)
beta = np.exp(1j * phi) * np.sin(theta / 2)

psi = alpha * zero + beta * one
print(f"\\nArbitrary state |ψ⟩:")
print(f"α = {alpha:.4f}")
print(f"β = {beta:.4f}")
print(f"|ψ⟩ = {psi.flatten()}")`
