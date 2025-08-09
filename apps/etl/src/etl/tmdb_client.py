import httpx, asyncio
from aiolimiter import AsyncLimiter
from tenacity import retry, wait_exponential, stop_after_delay
from .config import TMDB_BEARER, RATE_PER_10S

_limiter = AsyncLimiter(RATE_PER_10S, 10)

class TMDB:
    def __init__(self):
        self.client = httpx.AsyncClient(base_url="https://api.themoviedb.org/3",
            headers={"Authorization": f"Bearer {TMDB_BEARER}", "Accept":"application/json"}, timeout=30)

    @retry(wait=wait_exponential(multiplier=1, min=1, max=60), stop=stop_after_delay(300))
    async def get(self, path: str, params: dict | None = None):
        async with _limiter:
            r = await self.client.get(path, params=params)
            if r.status_code == 429:
                await asyncio.sleep(int(r.headers.get("Retry-After","2")))
                r.raise_for_status()
            r.raise_for_status()
            return r.json()

    async def close(self):
        await self.client.aclose()
