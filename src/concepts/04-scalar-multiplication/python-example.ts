export const pythonCode = `import numpy as np

# Original quantum state
psi = np.array([[1], [0]], dtype=complex)  # |0⟩

# Real scalar multiplication
c = 2.0
scaled = c * psi
print(f"2|0⟩ (unnormalized):")
print(scaled)

# Complex scalar (phase factor)
phi = np.pi / 4  # 45 degrees
phase_factor = np.exp(1j * phi)
print(f"\\nPhase factor e^(iπ/4) = {phase_factor:.4f}")

# Apply phase to state
psi_phased = phase_factor * psi
print(f"\\ne^(iπ/4)|0⟩:")
print(psi_phased)

# Global phase doesn't change probabilities
prob_original = np.abs(psi[0])**2
prob_phased = np.abs(psi_phased[0])**2
print(f"\\nProbability |0⟩ (original): {prob_original}")
print(f"Probability |0⟩ (with phase): {prob_phased}")

# Relative phase example
plus = np.array([[1], [1]], dtype=complex) / np.sqrt(2)
# Apply phase only to |1⟩ component
relative_phase = np.array([[1, 0], [0, np.exp(1j * np.pi)]], dtype=complex)
minus = relative_phase @ plus
print(f"\\n|+⟩ with relative phase π on |1⟩:")
print(minus)  # This is |-⟩`
