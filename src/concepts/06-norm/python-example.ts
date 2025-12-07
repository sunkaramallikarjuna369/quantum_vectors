export const pythonCode = `import numpy as np

# Unnormalized state
psi_unnorm = np.array([[3], [4]], dtype=complex)
print("Unnormalized state:")
print(psi_unnorm)

# Calculate norm
norm = np.linalg.norm(psi_unnorm)
print(f"\\nNorm ‖ψ‖ = {norm}")

# Normalize the state
psi_norm = psi_unnorm / norm
print(f"\\nNormalized state:")
print(psi_norm)

# Verify normalization
norm_check = np.linalg.norm(psi_norm)
print(f"\\nNorm of normalized state: {norm_check}")

# Probability interpretation
alpha, beta = psi_norm.flatten()
prob_0 = np.abs(alpha)**2
prob_1 = np.abs(beta)**2
print(f"\\nProbability of |0⟩: {prob_0:.4f}")
print(f"Probability of |1⟩: {prob_1:.4f}")
print(f"Sum of probabilities: {prob_0 + prob_1:.4f}")

# Complex amplitudes example
psi_complex = np.array([[1 + 1j], [1 - 1j]], dtype=complex)
norm_complex = np.linalg.norm(psi_complex)
psi_complex_norm = psi_complex / norm_complex
print(f"\\nComplex state normalized:")
print(psi_complex_norm)
print(f"Norm: {np.linalg.norm(psi_complex_norm):.4f}")`
