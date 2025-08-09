szuper — itt a kész, bővített `README.md` (másold be a repó gyökerébe a meglévő helyére):

---

# TMDB Full Scraper — monorepo

**Laravel API + Python ETL + Next.js Web** egy monorepóban. Cél: a **TMDB** teljes (film, sorozat, személy, cég, hálózat stb.) adatainak **saját adatbázisba** tükrözése, majd ezek kiszolgálása többnyelvű (HU/EN/DE) webes felületen.

Fő elvek: **inkrementális frissítés** (TMDB `/changes`), **idempotens upsert**, **hibatűrés**, **SEO‑barát frontend**.

## Tartalom

* `apps/api` – **Laravel 11** API (migrációk, modellek, ingest végpontok, admin alapok)
* `apps/etl` – **Python 3.11** ETL (TMDB kliens, normalizálók, pipeline‑ok, `/changes` watcher)
* `apps/web` – **Next.js 14** (App Router, i18n, kereső + adatlapok)
* `opensearch` – index sémák (film/személy/sorozat)
* `docker-compose.yml` – Postgres + Redis + OpenSearch + API + ETL + Web

## Követelmények

* Docker + Docker Compose
* **TMDB v4 Bearer Token** ([https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))
* Javasolt: legalább 8 GB RAM (OpenSearch memóriás)

## Gyorsindítás (lokál)

1. **Env fájlok**

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/etl/.env.example apps/etl/.env
cp apps/web/.env.example apps/web/.env
```

* Az `apps/etl/.env`‑ben töltsd ki: **TMDB\_BEARER=...**
* Portok/hostok igény szerint módosíthatók.

2. **Konténerek**

```bash
docker compose up -d --build
```

3. **Migrációk (API)**

```bash
docker compose exec api php artisan migrate
# (opcionális) Filament admin user:
docker compose exec api php artisan make:filament-user
```

4. **Szótárak és alapadatok**

```bash
docker compose exec etl python -m etl.cli bootstrap
```

5. **Backfill (első betöltés)**

```bash
docker compose exec etl python -m etl.cli backfill movies
docker compose exec etl python -m etl.cli backfill people
docker compose exec etl python -m etl.cli backfill tv
```

6. **Folyamatos frissítés**

```bash
docker compose exec etl python -m etl.cli changes watch
```

7. **Frontend**

* [http://localhost:3000/hu](http://localhost:3000/hu)
  (Alap: kereső, film/személy adatlapok. TV oldalak is előkészítve.)

## ETL parancsok

```bash
# Szótár entitások (genres, certifications, providers)
docker compose exec etl python -m etl.cli bootstrap

# Backfill (ID-tartományra bővíthető a cli-ben)
docker compose exec etl python -m etl.cli backfill movies
docker compose exec etl python -m etl.cli backfill people
docker compose exec etl python -m etl.cli backfill tv

# Inkrementális változásfigyelés (TMDB /changes)
docker compose exec etl python -m etl.cli changes watch
```

## Architektúra (röviden)

* **ETL** hívja a TMDB API-t (rate‑limit kímélet), normalizál és **idempotens upsert**-tel tölti a DB-t az **API ingest** végpontjain.
* **API** kezeli az adatmodellt, ingestet, admin alapokat (Filament).
* **Web** SSR/ISR oldalak i18n‑nel. Képek/videók **TMDB CDN**-ről (nincs lokális képtárolás).

## Konfiguráció (fő env kulcsok)

* `apps/etl/.env`

  * `TMDB_BEARER` – **kötelező**, v4 token
  * `TMDB_LANGS=hu-HU,en-US,de-DE`
  * `TMDB_REGIONS=HU,US,DE`
  * `API_URL=http://api`, `API_TOKEN=devtoken` (belső ingest híváshoz)
* `apps/api/.env`

  * Postgres/Redis beállítások, Scout/OpenSearch (ha használod a keresőt)
* `apps/web/.env`

  * `NEXT_PUBLIC_API_BASE=http://localhost:8080`

## Hasznos tippek

* **OpenSearch**: ha kevés a RAM, ideiglenesen kiveheted a Compose‑ból (kereső nélkül is fut).
* **Rate limit**: nagy backfillnél hagyd futni; az ETL backoffol és tolerálja a részleges hibákat.
* **.gitignore**: ne tölts fel `.env`, `node_modules`, `vendor` tartalmakat.

## Hibakeresés

```bash
# API logok
docker compose logs -f api

# ETL logok
docker compose logs -f etl

# Adatbázis hibák: ellenőrizd apps/api/.env és docker-compose.yml (DB_HOST=postgres, DB_USERNAME=app, DB_PASSWORD=app)
# TMDB 401/403: rossz vagy hiányzó TMDB_BEARER
```

## Biztonság

* **Tokeneket** (TMDB, GitHub PAT stb.) soha ne tedd publikussá.
* Ha véletlenül megosztottad, azonnal **Revoke** és generálj újat.

## TMDB attribúció és ToS

Ez a projekt a **TMDB API**-t használja, de **nem TMDB által támogatott vagy hitelesített**.
Kérlek, tartsd be a TMDB felhasználási feltételeit és jelenítsd meg az attribúciót a frontend láblécében:

> “This product uses the TMDB API but is not endorsed or certified by TMDB.”

## Roadmap (ötletek)

* DLQ (dead‑letter queue) + Grafana metrikák/riasztások
* Reviews + moderáció
* User funkciók (auth, kedvencek, watchlist)
* Diff‑nézet az adminban (`raw` előző vs. aktuális)
* OpenSearch‑alapú autocomplete és rangsorolás finomhangolás

## Licenc

Adj hozzá egy `LICENSE` fájlt (pl. MIT), ha nyilvánosan terjeszted.

---

