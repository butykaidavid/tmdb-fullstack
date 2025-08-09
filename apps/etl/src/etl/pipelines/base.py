import os, httpx

async def post(api_path: str, payload: dict):
    token = os.getenv("API_TOKEN","devtoken")
    url = os.getenv("API_URL","http://api") + api_path
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.post(url, json=payload, headers={"Authorization": f"Bearer {token}"})
        r.raise_for_status()
        return r.json()
