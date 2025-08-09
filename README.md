# TMDB Full Scraper – Egyszerű telepítési útmutató

Ez a projekt egy **TMDB** adatletöltő és megjelenítő rendszer.
Olyan, mint egy saját mini **TMDB / IMDB / Mafab.hu**, ami a TMDB API-ból lekéri az összes adatot (filmek, sorozatok, személyek, cégek, stb.), elmenti a saját adatbázisodba, és egy weboldalon meg is jeleníti.

A rendszer 3 részből áll:

1. **API** – Laravel-ben készült, az adatbázist kezeli.
2. **ETL** – Python program, ami a TMDB API-ból letölti és betölti az adatokat.
3. **Web** – Next.js alapú weboldal, ahol a felhasználók látják az adatokat.

---

## 1. Előkészületek

Szükséged lesz:

* **TMDB API kulcs** (v4 token) → [itt tudsz igényelni](https://www.themoviedb.org/settings/api)
* **Docker** telepítve a gépedre → [letöltés](https://www.docker.com/products/docker-desktop/)

---

## 2. Letöltés és beállítás

Ha még nincs meg a projekt:

```bash
git clone https://github.com/butykaidavid/tmdb-fullstack.git
cd tmdb-fullstack
```

Másold ki az `.env` példafájlokat:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/etl/.env.example apps/etl/.env
cp apps/web/.env.example apps/web/.env
```

Ezután szerkeszd az **apps/etl/.env** fájlt, és írd be a TMDB kulcsodat:

```
TMDB_BEARER=ide_írd_a_v4_tmdb_tokened
```

---

## 3. Rendszer indítása

A teljes rendszer indítása:

```bash
docker compose up -d --build
```

Ez letölti és elindítja:

* az adatbázist (PostgreSQL)
* a gyorsítótárat (Redis)
* a keresőt (OpenSearch)
* az API-t
* az ETL-t
* a weboldalt

---

## 4. Adatbázis előkészítése

Futtasd az adatbázis migrációkat:

```bash
docker compose exec api php artisan migrate
```

---

## 5. Alapadatok letöltése (nyelvek, műfajok stb.)

```bash
docker compose exec etl python -m etl.cli bootstrap
```

---

## 6. Filmlista letöltése

Példák:

```bash
# Minden film
docker compose exec etl python -m etl.cli backfill movies

# Minden személy
docker compose exec etl python -m etl.cli backfill people

# Minden sorozat
docker compose exec etl python -m etl.cli backfill tv
```

**Ez sok idő lehet**, mert rengeteg adat van a TMDB-ben.

---

## 7. Automatikus frissítés indítása

Hogy mindig naprakész legyen az adatbázis:

```bash
docker compose exec etl python -m etl.cli changes watch
```

Ez folyamatosan figyeli a TMDB változásokat.

---

## 8. Weboldal megnyitása

Ha minden elindult, nyisd meg a böngészőben:

```
http://localhost:3000/hu
```

Itt láthatod a webes felületet magyarul.

---

## 9. Hiba esetén

* **401 / 403 hiba** → Rossz a TMDB kulcsod vagy hiányzik az `.env`-ből.
* **Adatbázis hiba** → Futtasd újra:

  ```bash
  docker compose exec api php artisan migrate
  ```
* **Nem nyílik meg a weboldal** → Ellenőrizd, hogy fut-e:

  ```bash
  docker ps
  ```

---

## 10. Fontos

* Ne töltsd fel a `.env` fájljaidat GitHubra (API kulcs miatt).
* A projekt **nem hivatalos TMDB termék**, de a TMDB API-t használja.

---
