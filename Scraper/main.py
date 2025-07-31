# ===== main.py =====
import os
from scraper import run_scraper

if __name__ == "__main__":
    print("🚀 Scraper started...\n")
    os.makedirs("pages_output", exist_ok=True)
    run_scraper()
    print("✅ Scraper completed.")
