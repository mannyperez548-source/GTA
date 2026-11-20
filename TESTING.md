# Validation

- Node.js syntax checks passed for server.js and public/game.js.
- ZIP integrity and required deployment files verified.
- Source archive is below 1 MB (dependencies excluded).
- This environment did not have the npm dependencies installed. A live server smoke test could not start because Express was unavailable; no end-to-end browser gameplay or multiplayer validation was completed.

## Recommended manual acceptance checks
1. npm install; npm start. Enter the city in a WebGL2 desktop browser.
2. Start an office shift with J, follow the marker, press E to check in, hold E to work; verify payout.
3. Approach a car, E to steal it, verify wanted status, drive against a building to test collisions, F to exit.
4. Open two browser windows on the same server and use the same car; verify driver/passenger seating and movement.
5. Use B to preview houses and vehicles. Verify insufficient-funds restrictions.
6. Work assignments, buy a sandwich, use it in I. Buy and equip a shirt and fitted shoes.
7. Start a bank robbery at Union Bank; remain nearby 20 seconds. Verify payout and police response.
8. Try both aircraft at the airfield: W accelerate, Space ascend, C descend. Use boats at the marina.
9. Walk north to climb mountains; check Space jump and beach/ocean boundary.
10. Refresh after a purchase; verify local money, inventory and ownership persist. Shared vehicle positions intentionally reset on reconnect/restart.

Known prototype constraints: simple axis-aligned collision volumes, simplified aircraft controls, client-simulated NPCs/traffic/economy, local-only property ownership, no pathfinding/navmesh, and no persistent server account database. Moving NPCs and traffic are not authoritative shared entities. Internet-hosted Three.js and fonts are not included in the ZIP. A Render web service (not just a static site/GitHub Pages) is needed for multiplayer.
