import asyncio, sys
from .tmdb_client import TMDB
from .pipelines.movies import ingest_movie
from .pipelines.people import ingest_person
from .pipelines.tv import ingest_tv
from .changes import watch
from .bootstrap import bootstrap_globals

async def backfill_movies(start=1, end=200):
    tmdb = TMDB()
    for i in range(start, end+1):
        try:
            await ingest_movie(tmdb, i)
            print("ok movie", i)
        except Exception as e:
            print("skip movie", i, e)

async def backfill_people(start=1, end=200):
    tmdb = TMDB()
    for i in range(start, end+1):
        try:
            await ingest_person(tmdb, i)
            print("ok person", i)
        except Exception as e:
            print("skip person", i, e)

async def backfill_tv(start=1, end=200):
    tmdb = TMDB()
    for i in range(start, end+1):
        try:
            await ingest_tv(tmdb, i)
            print("ok tv", i)
        except Exception as e:
            print("skip tv", i, e)

def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "help"
    if cmd == "backfill":
        what = sys.argv[2]
        if what == "movies":
            asyncio.run(backfill_movies())
        elif what == "people":
            asyncio.run(backfill_people())
        elif what == "tv":
            asyncio.run(backfill_tv())
    elif cmd == "changes":
        sub = sys.argv[2]
        if sub == "watch":
            asyncio.run(watch())
    elif cmd == "bootstrap":
        asyncio.run(bootstrap_globals())
    else:
        print("Commands: backfill movies|people|tv | changes watch | bootstrap")

if __name__ == "__main__":
    main()
