
# Bar Chart — PIB des États-Unis (1947–2015)

![Graphique d'exemple](./screenshot.png)

Visualisation interactive du Produit Intérieur Brut (PIB) trimestriel des États-Unis (1947–2015), réalisée avec D3.js.

---

##  Aperçu

- **Fichier principal**: `TP/TP.html`
- **Source des données**: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json
- **But**: afficher un graphique à barres réactif montrant le PIB par trimestre, avec tooltip et métadonnées pour tests/accessibilité.

## Technologies

- **HTML5**
- **Tailwind CSS** (CDN) — styles responsives
- **JavaScript (ES6+)**
- **D3.js v7** — échelles, axes, et rendu SVG

##  Exécution (local)

### Option A — Ouvrir directement

Double-cliquez sur `TP/TP.html` ou faites clic droit → "Ouvrir avec" → votre navigateur (Chrome / Edge / Firefox).

> Note: le fichier charge les bibliothèques et les données depuis Internet. Assurez-vous d'une connexion active.

### Option B — Servir via Python (recommandé si des problèmes de `fetch` avec `file://`)

```powershell
cd 'c:\2025\dataVis\TP'
python -m http.server 8000

# puis ouvrir dans le navigateur:
http://localhost:8000/TP.html
```

### Option C — Servir via Node (si Node.js installé)

```powershell
cd 'c:\2025\dataVis\TP'
npx http-server -p 8000

# puis ouvrir:
http://localhost:8000/TP.html
```

## 🧭 Utilisation

- Survolez une barre pour afficher le tooltip qui montre le trimestre et la valeur du PIB.
- Les barres contiennent les attributs `data-date` (format `YYYY-MM-DD`) et `data-gdp`, utiles pour tests automatisés.

##  Points d'implémentation clés

- `#title` — titre H1
- `#x-axis` & `#y-axis` — axes générés par D3
- `.bar` — barres SVG avec `data-date` & `data-gdp`
- `#tooltip` — info-bulle affichée au survol

##  Données

Le JSON public renvoie un tableau de paires `[date, valeur]`. Le script convertit `date` en `Date` JS et `valeur` en nombre.

##  Accessibilité & Tests

- Les barres ont `tabindex="0"` pour navigation clavier.
- Les attributs `data-date` permettent d'écrire des tests unitaires/automatisés (format attendu: `YYYY-MM-DD`).
