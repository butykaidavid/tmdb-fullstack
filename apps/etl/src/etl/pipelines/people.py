from ..tmdb_client import TMDB
from ..normalizers.person import normalize_person
from .base import post

async def ingest_person(tmdb: TMDB, person_id: int):
    detail = await tmdb.get(f"/person/{person_id}")
    images = await tmdb.get(f"/person/{person_id}/images")
    external = await tmdb.get(f"/person/{person_id}/external_ids")
    payload = normalize_person(detail, images, external)
    await post("/api/ingest/person", payload)
