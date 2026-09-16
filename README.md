# Daikin Controller Card

A Home Assistant custom Lovelace card that visually emulates Daikin wired wall controllers with selectable inputs and outputs per entity.

## Supported Controllers

| Model | Type | Status |
|-------|------|--------|
| BRC1E63 | Wired, Full LCD, Backlit | ✅ Phase 1 |
| BRC1H63K | Wired, Bluetooth, Sensor | 🔜 Phase 2 |
| BRC2E61 | Wired Simplified, 85mm | 🔜 Phase 2 |
| BRC315D7 | Wired, Schedule, VRV | 🔜 Phase 2 |

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to Frontend > Custom Repositories
3. Add this repository URL
4. Install "Daikin Controller Card"
5. Refresh your browser

### Manual

1. Download `daikin-controller-card.js` from the `dist/` folder
2. Copy to your `config/www/` directory
3. Add the resource in HA: Settings > Dashboards > Resources
   - URL: `/local/daikin-controller-card.js`
   - Type: JavaScript Module

## Configuration

```yaml
type: custom:daikin-controller-card
entity: climate.living_room_ac
controller: BRC1E63
name: Living Room
```

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `entity` | string | Yes | — | Climate entity ID |
| `controller` | string | No | `BRC1E63` | Controller model to emulate |
| `name` | string | No | Entity name | Display name |

### Controller Models

- `BRC1E63` — Full-featured wired controller with LCD display
- `BRC1H63K` — Stylish controller with Bluetooth
- `BRC2E61` — Compact simplified controller
- `BRC315D7` — VRV controller with scheduling

## Features (Phase 1)

- LCD-style display with room temp, setpoint, and mode
- Mode buttons: Cool, Heat, Dry, Fan, Auto
- Temperature up/down controls
- Fan speed cycling
- Power on/off toggle
- Mode-tinted LCD display
- Visual card editor
- Controller model selector

## Development

```bash
npm install
npm run build    # Build once
npm run watch    # Watch mode
```

## License

MIT
