from .tmdb_client import TMDB
from .pipelines.base import post

async def bootstrap_globals():
    tmdb = TMDB()
    # genres
    for media_type in ("movie","tv"):
        data = await tmdb.get(f"/genre/{media_type}/list")
        for g in data.get("genres", []):
            await post("/api/ingest/genre", {"tmdb_id": g["id"], "name": g["name"], "media_type": media_type})
    # providers
    plist = await tmdb.get("/watch/providers/movie")
    for it in plist.get("results", []):
        await post("/api/ingest/providers", {"provider": {"tmdb_id": it.get("provider_id"), "provider_name": it.get("provider_name"), "logo_path": it.get("logo_path")}})
    # certifications
    for media_type in ("movie","tv"):
        c = await tmdb.get(f"/certification/{media_type}/list")
        for country, arr in (c.get("certifications", {})).items():
            for it in arr:
                await post("/api/ingest/certifications", {"media_type": media_type, "country": country, "cert": it.get("certification"), "meaning": it.get("meaning"), "order": it.get("order",0)})
