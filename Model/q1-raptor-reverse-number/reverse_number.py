"""Reverse the digits of a positive integer using the same logic as the RAPTOR flowchart.

    rev <- 0
    while n > 0:
        digit <- n mod 10
        rev   <- rev * 10 + digit
        n     <- floor(n / 10)
"""
import sys


def reverse_number(n: int, trace: bool = False) -> int:
    if n < 0:
        raise ValueError("n must be a non-negative integer")
    rev = 0
    step = 0
    if trace:
        print(f"{'iter':>4} | {'n (before)':>10} | {'digit':>5} | {'rev':>8} | {'n (after)':>9}")
        print("-" * 52)
    while n > 0:
        step += 1
        before = n
        digit = n % 10          # RAPTOR: n mod 10
        rev = rev * 10 + digit
        n = n // 10             # RAPTOR: floor(n / 10)
        if trace:
            print(f"{step:>4} | {before:>10} | {digit:>5} | {rev:>8} | {n:>9}")
    return rev


def is_palindrome(n: int) -> bool:
    """A number is a numeric palindrome if it equals its reverse."""
    return n == reverse_number(n)


if __name__ == "__main__":
    value = int(sys.argv[1]) if len(sys.argv) > 1 else int(input("Enter a positive integer: "))
    print(f"\nInput : {value}")
    result = reverse_number(value, trace=True)
    print(f"Output: {result}")
    print(f"Palindrome? {'Yes' if value == result else 'No'}")
