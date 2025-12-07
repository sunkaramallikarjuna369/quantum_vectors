export const pythonCode = `import numpy as np

# Single qubit states
zero = np.array([[1], [0]], dtype=complex)
one = np.array([[0], [1]], dtype=complex)

# Tensor product: |0⟩ ⊗ |0⟩ = |00⟩
state_00 = np.kron(zero, zero)
print("|00⟩ =", state_00.flatten())

# All 2-qubit basis states
state_01 = np.kron(zero, one)
state_10 = np.kron(one, zero)
state_11 = np.kron(one, one)

print("|01⟩ =", state_01.flatten())
print("|10⟩ =", state_10.flatten())
print("|11⟩ =", state_11.flatten())

# Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2
bell_phi_plus = (state_00 + state_11) / np.sqrt(2)
print(f"\\nBell state |Φ⁺⟩:")
print(bell_phi_plus.flatten())

# Check if state is entangled (cannot be factored)
# For a separable state |ψ⟩⊗|φ⟩, the reduced density matrix is pure
def is_entangled(state_2qubit):
    """Check entanglement via partial trace"""
    rho = state_2qubit @ state_2qubit.conj().T
    # Partial trace over second qubit
    rho_A = np.array([
        [rho[0,0] + rho[1,1], rho[0,2] + rho[1,3]],
        [rho[2,0] + rho[3,1], rho[2,2] + rho[3,3]]
    ])
    purity = np.trace(rho_A @ rho_A).real
    return purity < 0.99  # Pure if purity ≈ 1

print(f"\\n|00⟩ entangled: {is_entangled(state_00)}")
print(f"|Φ⁺⟩ entangled: {is_entangled(bell_phi_plus)}")`
