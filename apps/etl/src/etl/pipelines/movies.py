from ..tmdb_client import TMDB
from ..normalizers.movie import normalize_movie_bundle
from .base import post

async def ingest_movie(tmdb: TMDB, movie_id: int):
    detail = await tmdb.get(f"/movie/{movie_id}")
    credits = await tmdb.get(f"/movie/{movie_id}/credits")
    images = await tmdb.get(f"/movie/{movie_id}/images")
    videos = await tmdb.get(f"/movie/{movie_id}/videos")
    translations = await tmdb.get(f"/movie/{movie_id}/translations")
    external = await tmdb.get(f"/movie/{movie_id}/external_ids")
    payload = normalize_movie_bundle(detail, credits, images, videos, translations, external)
    await post("/api/ingest/movie", payload)
