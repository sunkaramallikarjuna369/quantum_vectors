export const pythonCode = `import numpy as np

def bloch_to_state(theta, phi):
    """Convert Bloch sphere coordinates to quantum state"""
    alpha = np.cos(theta / 2)
    beta = np.exp(1j * phi) * np.sin(theta / 2)
    return np.array([[alpha], [beta]], dtype=complex)

def state_to_bloch(state):
    """Convert quantum state to Bloch sphere coordinates"""
    alpha, beta = state.flatten()
    # Handle global phase
    if np.abs(alpha) > 1e-10:
        phase = np.angle(alpha)
        alpha = np.abs(alpha)
        beta = beta * np.exp(-1j * phase)
    
    theta = 2 * np.arccos(np.abs(alpha))
    phi = np.angle(beta) if np.abs(beta) > 1e-10 else 0
    return theta, phi

# Create state from Bloch coordinates
theta, phi = np.pi/4, np.pi/3  # 45° latitude, 60° longitude
psi = bloch_to_state(theta, phi)
print(f"State at θ={np.degrees(theta):.0f}°, φ={np.degrees(phi):.0f}°:")
print(psi.flatten())

# Important states
print("\\nImportant Bloch sphere states:")
states = {
    "|0⟩": (0, 0),
    "|1⟩": (np.pi, 0),
    "|+⟩": (np.pi/2, 0),
    "|-⟩": (np.pi/2, np.pi),
    "|+i⟩": (np.pi/2, np.pi/2),
    "|-i⟩": (np.pi/2, 3*np.pi/2)
}

for name, (t, p) in states.items():
    state = bloch_to_state(t, p)
    print(f"{name}: {state.flatten()}")

# Bloch vector components (x, y, z)
def bloch_vector(theta, phi):
    x = np.sin(theta) * np.cos(phi)
    y = np.sin(theta) * np.sin(phi)
    z = np.cos(theta)
    return np.array([x, y, z])

print(f"\\nBloch vector for θ=45°, φ=60°:")
print(bloch_vector(np.pi/4, np.pi/3))`
