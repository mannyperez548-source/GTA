# Harborlight — online open-world sandbox

A compact, playable Three.js browser-game starter project with a stylized procedural coastal city. Desktop controls are recommended.

## Run locally

1. Install Node.js 18 or newer.
2. In this folder run `npm install`, then `npm start`.
3. Open `http://localhost:3000` and allow a short download of Three.js from jsDelivr.

The Three.js engine is intentionally loaded from a CDN so the project ZIP stays below 1 MB. After npm install, the server itself serves the game and synchronizes players over WebSockets. First-time play requires an internet connection for the engine and Google Fonts; the gameplay can run offline after the engine has loaded, but shared online play requires an internet connection.

## GitHub

Unzip the project, create a GitHub repository, and push all files. `node_modules` is excluded.

## Render deployment

The included `render.yaml` defines a Render Node web service. Create a Render Blueprint from the repository, or configure a Web Service with build command `npm install` and start command `npm start`. Render provides the listening `PORT`. `/health` is the health-check route. HTTPS WebSocket multiplayer is enabled automatically when deployed behind Render's HTTPS endpoint. The prototype keeps multiplayer positions in server memory; a server restart resets the shared session. Browser progress is saved in local storage per device.

## Controls

- Mouse: camera; click to capture the pointer; Esc releases it.
- WASD: walk / steer. Shift: sprint. Space: jump; in aircraft Space ascends. C descends in aircraft.
- E: interact / enter vehicle / begin a job. F: exit vehicle / sit on a bench.
- Q: punch; equip the fictional in-game pistol from B → Supplies to fire. R: reload.
- I: inventory. J: jobs. B: marketplace. M: enlarge the minimap. T: chat. H: toggle controls.

## What's included

- Third-person following camera, real-time sun/day-night cycle, procedural PBR architecture, soft shadow mapping, reflective stylized ocean, beach, mountain-climbing terrain, tree-lined streets, marked road network and 3D minimap.
- Walkable furnished building ground floors; solid building, furniture and vehicle collisions; sprint, jump, seating, NPC conversations, NPC combat, vehicle impact damage, health and respawn.
- Fifty-nine shop / city buildings and ten custom houses plus two apartments. Fictitious properties and homes use rendered in-game thumbnail photographs at point of purchase.
- Nine vehicle variants: three cars, camper, two boats, two planes, and a helicopter; models have 2–6 seat layouts. Shared multiplayer uses server-authoritative seat allocation. Vehicle seats can be occupied by other connected players.
- Eighty roaming pedestrians including police, military and medics; reactive police wanted levels; session-wide player chat and online player synchronization.
- Twenty-two selectable assignments including office shifts, courier, lawn care, airline pilot, helicopter rescue, restaurant, supermarket, gas, taxi, boat courier, paramedic, construction, security, DJ, mountain guide and mechanic.
- Dealership, marina, hospital, bank robbery, bar, dance club, restaurant, supermarket, gas station, police HQ, military base, clothing and supply stores.

## Scope and limitations

This is a self-contained playable starter, not an AAA game or a published commercial asset pack. To honor the 1 MB storage constraint, terrain, architecture, vehicles, people, product images, sky, and lighting are generated from code, not high-resolution image or 3D downloads. The visual direction is polished stylized realism, not photorealism. Interiors currently cover accessible ground floors; upper floors are exterior-only. There is no persistent account database, saved cloud economy, vehicle repair simulation, or hosted authoritative anti-cheat. Robbery, theft, fights and weapons are fictional game mechanics only; no real-world crime instructions. Online position/chat synchronization and controlled vehicle seating are a compact WebSocket prototype; use a persistent database, server-side economy/physics validation, moderation, and load testing before a public launch.
