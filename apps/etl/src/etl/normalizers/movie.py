from .common import pick
def normalize_movie(raw: dict):
    return {
        "tmdb_id": raw["id"],
        "title": raw.get("title") or raw.get("name"),
        "original_title": raw.get("original_title"),
        "overview": raw.get("overview"),
        "release_date": raw.get("release_date"),
        "popularity": raw.get("popularity",0.0),
        "vote_average": raw.get("vote_average",0.0),
        "vote_count": raw.get("vote_count",0),
        "poster_path": raw.get("poster_path"),
        "backdrop_path": raw.get("backdrop_path"),
        "raw": raw,
    }
def normalize_movie_bundle(detail, credits, images, videos, translations, external_ids):
    data = normalize_movie(detail)
    data["credits"] = {
        "cast": [{"person_id": c["id"], "character": c.get("character"), "order": c.get("order")} for c in credits.get("cast", [])],
        "crew": [{"person_id": c["id"], "job": c.get("job"), "department": c.get("department")} for c in credits.get("crew", [])],
    }
    data["images"] = (
        [{"file_path": i["file_path"], "type":"poster", "vote_average": i.get("vote_average",0), "vote_count": i.get("vote_count",0), "raw": i} for i in images.get("posters", [])] +
        [{"file_path": i["file_path"], "type":"backdrop","vote_average": i.get("vote_average",0), "vote_count": i.get("vote_count",0), "raw": i} for i in images.get("backdrops", [])]
    )
    data["videos"] = [ pick(v, "site","key","type","official","name") | {"raw": v} for v in videos.get("results", []) ]
    data["translations"] = [
        {"lang": t["iso_639_1"], "title": (t.get("data") or {}).get("title"), "overview": (t.get("data") or {}).get("overview"), "raw": t}
        for t in translations.get("translations", [])
    ]
    data["external_ids"] = [{ "source": k, "value": v } for k, v in external_ids.items() if v ]
    return data
