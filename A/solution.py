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


def read_x_n(case):
    prompt = (
        f"Test case {case} — "
        f"enter x and n separated by a space (1≤x,n≤10): "
    )
    while True:
        parts = input(prompt).strip().split()
        if len(parts) != 2:
            print(
                "Please enter exactly two numbers.\n"
            )
            continue
        try:
            x, n = int(parts[0]), int(parts[1])
        except ValueError:
            print(
                "Please enter whole numbers only.\n"
            )
            continue
        if not (1 <= x <= 10 and 1 <= n <= 10):
            print(
                "x and n must each be between 1 and 10. Please try again.\n"
            )
            continue
        return x, n


print("=" * 60)
print("A. Mystic Waves")
print("=" * 60)
print(
    "In Elaria, mage Nia experiments with magical energy x.\n"
    "She casts a spell that produces n waves — alternating x and -x, starting with x.\n"
    "Find the total energy after all n waves."
)
print("-" * 60)

t = read_int(
    "How many test cases? (1≤t≤100): ",
    1,
    100,
)

for case in range(1, t + 1):
    print()
    print(f"--- Test case {case} ---")
    x, n = read_x_n(case)
    # Odd n: one unpaired +x remains; even n: all pairs cancel to 0.
    total = x if n % 2 == 1 else 0
    print()
    print(f"Total energy: {total}")

print()
print("-" * 60)
print("Done.")
