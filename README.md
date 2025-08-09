---

# TMDB Full Scraper – Teljes Telepítési és Indítási Útmutató

Ez a projekt egy **TMDB** adatletöltő és megjelenítő rendszer.
Olyan, mint egy saját mini **TMDB / IMDB / Mafab.hu**, ami a TMDB API-ból lekéri az összes adatot (filmek, sorozatok, személyek, cégek stb.), elmenti a saját adatbázisodba, és egy weboldalon meg is jeleníti.

A rendszer 3 fő részből áll:

1. **API** – Laravel 11 (kezeli az adatbázist)
2. **ETL** – Python 3.11 (letölti és feldolgozza a TMDB adatait)
3. **Web** – Next.js 14 (felhasználói felület több nyelven: HU/EN/DE)

---

## 1. Szükséges előfeltételek

* **TMDB API kulcs** (v4 token) → [igénylés itt](https://www.themoviedb.org/settings/api)
* **Docker Desktop** → [letöltés](https://www.docker.com/products/docker-desktop)

---

## 2. Projekt letöltése

```bash
git clone https://github.com/butykaidavid/tmdb-fullstack.git
cd tmdb-fullstack
```

---

## 3. Indítás egyszerűen – script segítségével

### Linux / Mac (Bash)

1. Másold be a repó gyökerébe az alábbi fájlt **`start.sh`** néven:

   * [start.sh tartalom](#linux-mac-indító-script)
2. Engedélyezd a futtatást:

```bash
chmod +x start.sh
```

3. Futtasd:

```bash
./start.sh
```

---

### Windows (PowerShell)

1. Másold be a repó gyökerébe az alábbi fájlt **`start.ps1`** néven:

   * [start.ps1 tartalom](#windows-indító-script)
2. Nyisd meg a PowerShell-t a mappában és engedélyezd a futtatást:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

3. Futtasd:

```powershell
.\start.ps1
```

---

## 4. Mi történik a script futtatásakor?

* Ellenőrzi és létrehozza a szükséges `.env` fájlokat
* Bekéri a TMDB API kulcsodat és beírja a helyére
* Elindítja a Docker konténereket
* Lefuttatja az adatbázis migrációkat
* Letölti az alapadatokat (pl. műfajok, nyelvek)
* Opcionálisan letölti a filmeket, személyeket, sorozatokat
* Opcionálisan elindítja a folyamatos frissítést (watcher)

---

## 5. Weboldal megnyitása

Ha a script lefutott és a konténerek futnak, nyisd meg a böngészőben:

```
http://localhost:3000/hu
```

---

## 6. Hibakezelés

* **401/403 hiba:** Ellenőrizd, hogy a `apps/etl/.env` fájlban helyes-e a TMDB\_BEARER kulcs.
* **Konténer nem indul:**

```bash
docker compose logs
```

* **Újrakezdés:**

```bash
docker compose down -v
./start.sh    # vagy Windows-on .\start.ps1
```

---

## Linux / Mac indító script

<details>
<summary>Kattints ide a start.sh tartalomért</summary>

```bash
[ide jön az előbb elkészített teljes start.sh tartalom]
```

</details>

---

## Windows indító script

<details>
<summary>Kattints ide a start.ps1 tartalomért</summary>

```powershell
[ide jön az előbb elkészített teljes start.ps1 tartalom]
```

</details>

---

A fenti megoldással egy kezdő is el tudja indítani a rendszert **pár kattintással**, és nem kell kézzel gépelni a parancsokat.

---
