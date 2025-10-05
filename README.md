# Token Legends — Full Character Sheet (GitHub/Netlify)

A **complete, multi-tab** Token Legends character sheet:
- Overview, Attributes, Combat Skills (single-pick Accuracy), Magic Skills (auto Circle), Civil Skills
- Abilities & Spells (Circle Requirement + Casting Time fields, Token cost, cooldown, description)
- Equipment (no duplicates), Perks, Feats
- Resources (Tokens / PA / MS), Notes
- Save/Load to localStorage + JSON Import/Export

## Run locally
Open `index.html` directly, or:
```bash
python -m http.server 5500
# visit http://localhost:5500
```

## Deploy (GitHub → Netlify)
1. Push all files to a GitHub repo.
2. In Netlify: **Add new site → Import from Git** → select repo.
3. Build: none. Publish dir: `.`

## Notes
- Accuracy: select exactly one Combat line via checkbox; Base Accuracy mirrors that line’s modifier `floor(points/2)`.
- Movement: +5 ft per 5 DEX. Crit Multiplier: +5% per 1 SMA. Ability Slots: +1 per 2 MND. Initiative: CHA modifier.
- Magic Circles: 1 point = Circle 1; +1 Circle per +2 points; cap 10. (Focus caps can be enforced later if desired.)
- PA/MS follow TL mitigation rules; values tracked on Resources tab.
- You can extend this with your ability databases by seeding `TL.state.abilities` with your entries.
