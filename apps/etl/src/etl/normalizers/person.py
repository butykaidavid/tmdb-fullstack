def normalize_person(raw: dict, images: dict, external_ids: dict):
    return {
        "tmdb_id": raw["id"],
        "name": raw.get("name"),
        "birthday": raw.get("birthday"),
        "deathday": raw.get("deathday"),
        "place_of_birth": raw.get("place_of_birth"),
        "biography": raw.get("biography"),
        "profile_path": raw.get("profile_path"),
        "popularity": raw.get("popularity",0.0),
        "images": [ {"file_path": i["file_path"], "type":"profile", "vote_average": i.get("vote_average",0), "vote_count": i.get("vote_count",0), "raw": i} for i in images.get("profiles",[]) ],
        "external_ids": [ {"source": k, "value": v} for k, v in external_ids.items() if v ],
        "raw": raw,
    }
