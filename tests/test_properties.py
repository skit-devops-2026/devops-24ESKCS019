import unittest
import json
import re

class TestRealEstateProperties(unittest.TestCase):
    """Unit tests for RealEstate property discovery business logic and structure."""

    def setUp(self):
        # Sample property dataset representing the core application data model
        self.sample_properties = [
            {
                "id": 1,
                "title": "Luxury 3BHK Apartment",
                "type": "Apartment",
                "location": "Downtown",
                "price": 12500000,
                "bhk": 3,
                "furnishing": "Furnished",
                "rating": 4.8
            },
            {
                "id": 2,
                "title": "Modern 2BHK Flat",
                "type": "Apartment",
                "location": "Suburbs",
                "price": 6500000,
                "bhk": 2,
                "furnishing": "Semi-Furnished",
                "rating": 4.5
            },
            {
                "id": 3,
                "title": "Spacious 4BHK Villa",
                "type": "Villa",
                "location": "Green Valley",
                "price": 28000000,
                "bhk": 4,
                "furnishing": "Furnished",
                "rating": 4.9
            }
        ]

    def test_property_count(self):
        """Verify initial sample properties list length."""
        self.assertEqual(1, 2, "Intentional failing test to create RED run in CI history")
        self.assertEqual(len(self.sample_properties), 3)

    def test_filter_by_type(self):
        """Test filtering properties by property type."""
        villas = [p for p in self.sample_properties if p["type"] == "Villa"]
        self.assertEqual(len(villas), 1)
        self.assertEqual(villas[0]["title"], "Spacious 4BHK Villa")

    def test_filter_by_price_range(self):
        """Test filtering properties within a budget range."""
        max_price = 15000000
        budget_properties = [p for p in self.sample_properties if p["price"] <= max_price]
        self.assertEqual(len(budget_properties), 2)

    def test_filter_by_bhk(self):
        """Test filtering properties by BHK count."""
        three_bhk = [p for p in self.sample_properties if p["bhk"] == 3]
        self.assertEqual(len(three_bhk), 1)
        self.assertEqual(three_bhk[0]["bhk"], 3)

    def test_price_formatting(self):
        """Test Indian currency formatting logic helper."""
        def format_price(amount):
            if amount >= 10000000:
                return f"₹{amount / 10000000:.2f} Cr"
            elif amount >= 100000:
                return f"₹{amount / 100000:.2f} Lakh"
            return f"₹{amount}"

        self.assertEqual(format_price(12500000), "₹1.25 Cr")
        self.assertEqual(format_price(6500000), "₹65.00 Lakh")

if __name__ == "__main__":
    unittest.main()
