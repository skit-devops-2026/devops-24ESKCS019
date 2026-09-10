import unittest
import os

class TestHTMLStructure(unittest.TestCase):
    """Unit tests to validate index.html page integrity and required elements."""

    def setUp(self):
        self.html_path = os.path.join(os.path.dirname(__file__), "..", "index.html")
        self.assertTrue(os.path.exists(self.html_path), "index.html file must exist")
        with open(self.html_path, "r", encoding="utf-8") as f:
            self.content = f.read()

    def test_html_doctype_and_title(self):
        """Verify HTML5 doctype and title tag existence."""
        self.assertIn("<!DOCTYPE html>", self.content)
        self.assertIn("<title>", self.content)

    def test_css_and_javascript_linked(self):
        """Verify style.css and script.js are correctly linked in HTML."""
        self.assertIn('href="style.css"', self.content)
        self.assertIn('src="script.js"', self.content)

    def test_required_sections_exist(self):
        """Verify presence of key structural elements."""
        self.assertIn("<nav", self.content)
        self.assertIn("<footer", self.content)

if __name__ == "__main__":
    unittest.main()
