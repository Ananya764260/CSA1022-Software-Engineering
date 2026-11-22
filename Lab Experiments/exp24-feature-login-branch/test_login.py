from login import login


def test_valid():
    assert login("admin", "admin123")


def test_wrong_password():
    assert not login("admin", "nope")


def test_unknown_user():
    assert not login("ghost", "admin123")
