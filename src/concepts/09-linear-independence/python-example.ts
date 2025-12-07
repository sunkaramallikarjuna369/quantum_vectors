export const pythonCode = `import numpy as np

# Check linear independence using matrix rank
def check_independence(vectors):
    """Check if vectors are linearly independent"""
    matrix = np.column_stack(vectors)
    rank = np.linalg.matrix_rank(matrix)
    return rank == len(vectors)

# Linearly independent vectors
v1 = np.array([1, 0])
v2 = np.array([0, 1])
print(f"v1 = {v1}, v2 = {v2}")
print(f"Independent: {check_independence([v1, v2])}")

# Linearly dependent vectors
v3 = np.array([1, 0])
v4 = np.array([2, 0])  # v4 = 2*v3
print(f"\\nv3 = {v3}, v4 = {v4}")
print(f"Independent: {check_independence([v3, v4])}")

# Quantum basis states are linearly independent
zero = np.array([1, 0], dtype=complex)
one = np.array([0, 1], dtype=complex)
print(f"\\n|0⟩ and |1⟩ independent: {check_independence([zero, one])}")

# 2-qubit basis (4 independent vectors)
basis_2qubit = [
    np.array([1, 0, 0, 0]),  # |00⟩
    np.array([0, 1, 0, 0]),  # |01⟩
    np.array([0, 0, 1, 0]),  # |10⟩
    np.array([0, 0, 0, 1])   # |11⟩
]
print(f"\\n2-qubit basis independent: {check_independence(basis_2qubit)}")
print(f"Dimension of 2-qubit space: {len(basis_2qubit)}")`
