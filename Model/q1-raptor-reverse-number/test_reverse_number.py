import unittest
from reverse_number import reverse_number, is_palindrome


class ReverseNumberTests(unittest.TestCase):
    def test_example(self):
        self.assertEqual(reverse_number(1234), 4321)

    def test_other_inputs(self):
        self.assertEqual(reverse_number(98765), 56789)
        self.assertEqual(reverse_number(7), 7)
        self.assertEqual(reverse_number(100001), 100001)

    def test_trailing_zeros_are_lost(self):
        self.assertEqual(reverse_number(1200), 21)
        self.assertEqual(reverse_number(1000), 1)

    def test_zero(self):
        self.assertEqual(reverse_number(0), 0)

    def test_negative_rejected(self):
        with self.assertRaises(ValueError):
            reverse_number(-5)

    def test_palindrome(self):
        self.assertTrue(is_palindrome(12321))
        self.assertFalse(is_palindrome(1234))


if __name__ == "__main__":
    unittest.main()
