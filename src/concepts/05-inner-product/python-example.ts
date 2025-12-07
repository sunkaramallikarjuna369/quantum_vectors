export const pythonCode = `import numpy as np

# Define basis states
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)

# Inner product ⟨0|0⟩ = 1
inner_00 = zero.conj().T @ zero
print(f"⟨0|0⟩ = {inner_00[0,0].real}")

# Inner product ⟨0|1⟩ = 0 (orthogonal)
inner_01 = zero.conj().T @ one
print(f"⟨0|1⟩ = {inner_01[0,0].real}")

# Create superposition states
plus = (zero + one) / np.sqrt(2)
minus = (zero - one) / np.sqrt(2)

# Inner product of |+⟩ with itself
inner_plus_plus = plus.conj().T @ plus
print(f"\\n⟨+|+⟩ = {inner_plus_plus[0,0].real}")

# Inner product of |+⟩ with |-⟩ (orthogonal!)
inner_plus_minus = plus.conj().T @ minus
print(f"⟨+|-⟩ = {inner_plus_minus[0,0].real}")

# Probability amplitude
# |⟨0|+⟩|² = probability of measuring |0⟩ in state |+⟩
amplitude = zero.conj().T @ plus
probability = np.abs(amplitude[0,0])**2
print(f"\\n⟨0|+⟩ = {amplitude[0,0]:.4f}")
print(f"|⟨0|+⟩|² = {probability:.4f} (50% probability)")`
