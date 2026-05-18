import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stdin, "reconfigure"):
    sys.stdin.reconfigure(encoding="utf-8")


def read_int(prompt, low, high):
    while True:
        raw = input(prompt).strip()
        try:
            value = int(raw)
        except ValueError:
            print(
                f"Please enter a whole number.\n"
                f"Valid range: {low}–{high}\n"
            )
            continue
        if low <= value <= high:
            return value
        print(
            f"Out of range ({low}–{high}). Please try again.\n"
        )


def solve(n):
    """Return (min_crafts, max_crafts) or None if impossible."""
    # Odd n: 4a + 6b is always even, so no solution exists.
    if n % 2 == 1:
        return None

    # Scale: 4a + 6b = n  =>  2a + 3b = k; a = Type A count, b = Type B count.
    k = n // 2

    # Frobenius coin problem: k = 1 cannot be formed with 2 and 3 (i.e. n = 2).
    if k < 2:
        return None

    # Minimize fleet size: prefer Type B (6 units) over Type A (4 units).
    r = k % 3
    if r == 0:
        # All Type B: b = k/3, a = 0.
        min_crafts = k // 3
    elif r == 1:
        # k mod 3 == 1: use two Type A and the rest Type B.
        min_crafts = (k + 2) // 3
    else:
        # k mod 3 == 2: use one Type A and the rest Type B.
        min_crafts = (k + 1) // 3

    # Maximize fleet size: prefer Type A (4 units) over Type B (6 units).
    if k % 2 == 0:
        # All Type A: a = k/2, b = 0.
        max_crafts = k // 2
    else:
        # k odd: one Type B (3 units) plus Type A for the remainder.
        max_crafts = (k - 1) // 2

    return min_crafts, max_crafts


print("=" * 60)
print("B. CargoCraft Fleet")
print("=" * 60)
print(
    "Type A crafts have 4 propulsion units; Type B crafts have 6.\n"
    "Given total units n, find the minimum and maximum fleet size possible.\n"
    "If n cannot be formed, the answer is impossible."
)
print("-" * 60)

t = read_int(
    "How many test cases? (1≤t≤1000): ",
    1,
    1000,
)

for case in range(1, t + 1):
    print()
    print(f"--- Test case {case} ---")
    n = read_int(
        f"Enter total propulsion units n (1≤n≤10¹⁸): ",
        1,
        10**18,
    )
    result = solve(n)
    print()
    if result is None:
        print(
            "Result: impossible (-1)\n"
            "Cannot form this total with a fleet of Type A and Type B crafts only."
        )
    else:
        lo, hi = result
        print(
            f"Result: {lo} {hi}\n"
            f"Minimum crafts: {lo}\n"
            f"Maximum crafts: {hi}"
        )

print()
print("-" * 60)
print("Done.")
