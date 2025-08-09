from ..tmdb_client import TMDB
from ..normalizers.tv import normalize_tv
from .base import post

async def ingest_tv(tmdb: TMDB, tv_id: int):
    detail = await tmdb.get(f"/tv/{tv_id}")
    credits = await tmdb.get(f"/tv/{tv_id}/aggregate_credits")
    images = await tmdb.get(f"/tv/{tv_id}/images")
    videos = await tmdb.get(f"/tv/{tv_id}/videos")
    translations = await tmdb.get(f"/tv/{tv_id}/translations")
    external = await tmdb.get(f"/tv/{tv_id}/external_ids")
    keywords = await tmdb.get(f"/tv/{tv_id}/keywords")
    providers = await tmdb.get(f"/tv/{tv_id}/watch/providers")
    payload = normalize_tv(detail, credits, images, videos, translations, external, keywords, providers)
    await post("/api/ingest/tv", payload)
