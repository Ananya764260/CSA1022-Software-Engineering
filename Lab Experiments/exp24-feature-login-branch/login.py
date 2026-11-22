"""Simple login function for Experiment 24."""
import hashlib

_USERS = {"admin": hashlib.sha256(b"admin123").hexdigest()}


def login(username: str, password: str) -> bool:
    """Return True if the username/password pair is valid."""
    stored = _USERS.get(username)
    if stored is None:
        return False
    return hashlib.sha256(password.encode()).hexdigest() == stored


if __name__ == "__main__":
    u = input("Username: ")
    p = input("Password: ")
    print("Login successful" if login(u, p) else "Invalid credentials")
