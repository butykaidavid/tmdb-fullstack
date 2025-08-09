def _providers(raw):
    out = []
    results = (raw or {}).get("results", {})
    for region, data in results.items():
        for typ in ("flatrate","rent","buy"):
            for it in data.get(typ, []) or []:
                out.append({"provider_tmdb_id": it.get("provider_id"), "region": region, "offer_type": typ})
    return out

def normalize_tv(detail, credits, images, videos, translations, external_ids, keywords, providers):
    data = {
        "tmdb_id": detail["id"],
        "name": detail.get("name"),
        "original_name": detail.get("original_name"),
        "overview": detail.get("overview"),
        "first_air_date": detail.get("first_air_date"),
        "last_air_date": detail.get("last_air_date"),
        "status": detail.get("status"),
        "number_of_seasons": detail.get("number_of_seasons",0),
        "number_of_episodes": detail.get("number_of_episodes",0),
        "popularity": detail.get("popularity",0.0),
        "vote_average": detail.get("vote_average",0.0),
        "vote_count": detail.get("vote_count",0),
        "poster_path": detail.get("poster_path"),
        "backdrop_path": detail.get("backdrop_path"),
        "raw": detail,
    }
    data["images"] = (
        [{"file_path": i["file_path"], "type":"poster", "vote_average": i.get("vote_average",0), "vote_count": i.get("vote_count",0), "raw": i} for i in images.get("posters", [])] +
        [{"file_path": i["file_path"], "type":"backdrop","vote_average": i.get("vote_average",0), "vote_count": i.get("vote_count",0), "raw": i} for i in images.get("backdrops", [])]
    )
    data["videos"] = [{k: v for k, v in v.items() if k in ("site","key","type","official","name")} | {"raw": v} for v in videos.get("results", [])]
    data["translations"] = [{"lang": t["iso_639_1"], "title": (t.get("data") or {}).get("name"), "overview": (t.get("data") or {}).get("overview"), "raw": t} for t in translations.get("translations", [])]
    data["external_ids"] = [{ "source": k, "value": v } for k, v in external_ids.items() if v ]
    data["keywords"] = [k["id"] for k in (keywords.get("results", []) if isinstance(keywords, dict) else (keywords or []))]
    data["providers"] = _providers(providers)
    return data
