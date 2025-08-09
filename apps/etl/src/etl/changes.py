import asyncio, datetime as dt
from .tmdb_client import TMDB
from .pipelines.movies import ingest_movie
from .pipelines.people import ingest_person
from .pipelines.tv import ingest_tv

async def watch(loop_delay=300):
    tmdb = TMDB()
    since = (dt.datetime.utcnow() - dt.timedelta(days=2)).date().isoformat()
    while True:
        for entity, fn in [("movie", ingest_movie),("tv", ingest_tv),("person", ingest_person)]:
            page = 1
            while True:
                data = await tmdb.get(f"/{entity}/changes", {"page": page, "start_date": since})
                for item in data.get("results", []):
                    try:
                        if entity == "movie":
                            await ingest_movie(tmdb, item["id"])
                        elif entity == "tv":
                            await ingest_tv(tmdb, item["id"])
                        else:
                            await ingest_person(tmdb, item["id"])
                    except Exception as e:
                        print("ERR", entity, item["id"], e)
                if page >= data.get("total_pages",1):
                    break
                page += 1
        await asyncio.sleep(loop_delay)
