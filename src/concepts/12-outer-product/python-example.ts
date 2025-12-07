export const pythonCode = `import numpy as np

# Basis states
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)

# Outer product |0⟩⟨0|
proj_0 = zero @ zero.conj().T
print("|0⟩⟨0| =")
print(proj_0)

# Outer product |1⟩⟨1|
proj_1 = one @ one.conj().T
print("\\n|1⟩⟨1| =")
print(proj_1)

# Verify completeness: |0⟩⟨0| + |1⟩⟨1| = I
identity = proj_0 + proj_1
print("\\n|0⟩⟨0| + |1⟩⟨1| =")
print(identity)

# Density matrix for pure state |+⟩
plus = (zero + one) / np.sqrt(2)
rho_pure = plus @ plus.conj().T
print("\\nDensity matrix for |+⟩:")
print(rho_pure)
print(f"Tr(ρ²) = {np.trace(rho_pure @ rho_pure).real:.4f} (pure)")

# Mixed state: 50% |0⟩ + 50% |1⟩
rho_mixed = 0.5 * proj_0 + 0.5 * proj_1
print("\\nMixed state (50% |0⟩, 50% |1⟩):")
print(rho_mixed)
print(f"Tr(ρ²) = {np.trace(rho_mixed @ rho_mixed).real:.4f} (mixed)")

# Projector property: P² = P
print(f"\\n|0⟩⟨0| is projector: {np.allclose(proj_0 @ proj_0, proj_0)}")`
