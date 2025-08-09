import os
LANGS = os.getenv("TMDB_LANGS","hu-HU,en-US,de-DE").split(",")
REGIONS = os.getenv("TMDB_REGIONS","HU,US,DE").split(",")
TMDB_BEARER = os.environ.get("TMDB_BEARER","")
API_URL = os.getenv("API_URL","http://api")
API_TOKEN = os.getenv("API_TOKEN","devtoken")
DB_URL = os.getenv("DB_URL","postgresql://app:app@postgres:5432/tmdb")
REDIS_URL = os.getenv("REDIS_URL","redis://redis:6379/0")
RATE_PER_10S = int(os.getenv("TMDB_RATE_PER_10S","40"))
