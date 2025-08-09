# TMDB Full Scraper – monorepo (v2)

## Követelmények
- Docker + Docker Compose
- TMDB v4 Bearer Token

## Indítás (lokál)
1. Másold `.env.example` → `.env`, és töltsd ki a kulcsokat.
2. `docker compose up -d --build`
3. Laravel migrációk: `docker compose exec api php artisan migrate`
4. Hozz admin usert: `docker compose exec api php artisan make:filament-user`
5. Bootstrap (genrek, tanúsítványok, szolgáltatók): `docker compose exec etl python -m etl.cli bootstrap`
6. Backfill (film/személy): `docker compose exec etl python -m etl.cli backfill movies` és `people`
7. Változásfigyelés: `docker compose exec etl python -m etl.cli changes watch`
8. Web: http://localhost:3000/hu

> A kód oktatási és prototipizálási célú. Élesítés előtt biztonsági/ops beállításokat (rate limit, auth, backup, monitoring) finomhangold.
