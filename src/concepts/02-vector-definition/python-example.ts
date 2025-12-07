export const pythonCode = `import numpy as np

# Column vector (ket) representation
# |ψ⟩ = [α, β]ᵀ
ket_psi = np.array([[1/np.sqrt(2)], 
                    [1/np.sqrt(2)]], dtype=complex)
print("Ket |ψ⟩ (column vector):")
print(ket_psi)

# Row vector (bra) representation  
# ⟨ψ| = [α*, β*]
bra_psi = ket_psi.conj().T
print("\\nBra ⟨ψ| (row vector):")
print(bra_psi)

# Verify normalization: ⟨ψ|ψ⟩ = 1
inner_product = bra_psi @ ket_psi
print(f"\\n⟨ψ|ψ⟩ = {inner_product[0,0].real}")

# General qubit state with complex amplitudes
theta = np.pi/4
phi = np.pi/6
alpha = np.cos(theta/2)
beta = np.exp(1j*phi) * np.sin(theta/2)

qubit = np.array([[alpha], [beta]], dtype=complex)
print(f"\\nGeneral qubit state:")
print(f"α = {alpha:.4f}")
print(f"β = {beta:.4f}")`
