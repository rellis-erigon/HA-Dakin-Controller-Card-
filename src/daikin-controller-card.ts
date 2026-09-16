import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DaikinCardConfig, HomeAssistant, HassEntity, ControllerModel, ControllerSkin } from "./types";
import { getController, CONTROLLER_MODELS } from "./controllers/index";

const MODE_ICONS: Record<string, string> = {
  cool: "❄",
  heat: "☀",
  dry: "💧",
  fan_only: "🌀",
  auto: "↻",
  off: "⏻",
};

const MODE_LABELS: Record<string, string> = {
  cool: "COOL",
  heat: "HEAT",
  dry: "DRY",
  fan_only: "FAN",
  auto: "AUTO",
  off: "OFF",
};

const FAN_LABELS: Record<string, string> = {
  auto: "AUTO",
  low: "LOW",
  medium: "MED",
  high: "HIGH",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
};

@customElement("daikin-controller-card")
export class DaikinControllerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: DaikinCardConfig;
  @state() private _skin!: ControllerSkin;

  static getConfigElement() {
    return document.createElement("daikin-controller-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:daikin-controller-card",
      entity: "",
      controller: "BRC1E63" as ControllerModel,
      name: "",
    };
  }

  setConfig(config: DaikinCardConfig) {
    if (!config.entity) {
      throw new Error("Please define an entity");
    }
    this._config = { ...config, controller: config.controller ?? "BRC1E63" };
    this._skin = getController(this._config.controller);
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has("_config")) return true;
    if (!this.hass || !this._config) return false;
    const oldHass = changedProps.get("hass") as HomeAssistant | undefined;
    if (!oldHass) return true;
    const oldState = oldHass.states[this._config.entity];
    const newState = this.hass.states[this._config.entity];
    return oldState !== newState;
  }

  private get _entity(): HassEntity | undefined {
    return this.hass?.states[this._config.entity];
  }

  private get _isOn(): boolean {
    return this._entity?.state !== "off" && this._entity?.state !== "unavailable";
  }

  private get _currentTemp(): string {
    const t = this._entity?.attributes.current_temperature;
    return t != null ? t.toFixed(1) : "--.-";
  }

  private get _setpoint(): string {
    const t = this._entity?.attributes.temperature;
    return t != null ? t.toFixed(1) : "--.-";
  }

  private get _unit(): string {
    return this._entity?.attributes.unit_of_measurement ?? "°C";
  }

  private get _mode(): string {
    return this._entity?.state ?? "off";
  }

  private get _fanMode(): string {
    return this._entity?.attributes.fan_mode ?? "auto";
  }

  private get _hvacAction(): string {
    return (this._entity?.attributes.hvac_action as string) ?? "idle";
  }

  private get _displayName(): string {
    return this._config.name || this._entity?.attributes.friendly_name || this._config.entity;
  }

  private async _callService(service: string, data: Record<string, unknown>) {
    await this.hass.callService("climate", service, data, {
      entity_id: this._config.entity,
    });
  }

  private _togglePower() {
    if (this._isOn) {
      this._callService("set_hvac_mode", { hvac_mode: "off" });
    } else {
      const modes = this._entity?.attributes.hvac_modes ?? this._skin.modes;
      const firstOn = modes.find((m: string) => m !== "off") ?? "auto";
      this._callService("set_hvac_mode", { hvac_mode: firstOn });
    }
  }

  private _setMode(mode: string) {
    this._callService("set_hvac_mode", { hvac_mode: mode });
  }

  private _adjustTemp(delta: number) {
    const current = this._entity?.attributes.temperature;
    if (current == null) return;
    const step = this._entity?.attributes.target_temp_step ?? 0.5;
    const min = this._entity?.attributes.min_temp ?? 16;
    const max = this._entity?.attributes.max_temp ?? 30;
    const next = Math.min(max, Math.max(min, current + delta * step));
    this._callService("set_temperature", { temperature: next });
  }

  private _cycleFan() {
    const available = this._entity?.attributes.fan_modes ?? this._skin.fanSpeeds;
    const current = this._fanMode;
    const idx = available.indexOf(current);
    const next = available[(idx + 1) % available.length];
    this._callService("set_fan_mode", { fan_mode: next });
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entity = this._entity;
    if (!entity) {
      return html`
        <ha-card>
          <div class="error">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;
    }

    const isOn = this._isOn;
    const mode = this._mode;
    const action = this._hvacAction;
    const compact = this._skin.compactLayout;

    return html`
      <ha-card>
        <div class="controller ${compact ? "compact" : ""} ${isOn ? "" : "off"}">
          <!-- Top bar with model and name -->
          <div class="top-bar">
            <span class="model-label">${this._skin.model}</span>
            <span class="name-label">${this._displayName}</span>
          </div>

          <!-- LCD Display -->
          <div class="lcd ${isOn ? `mode-${mode}` : ""}">
            <div class="lcd-inner">
              ${isOn
                ? html`
                    <div class="lcd-top-row">
                      <span class="lcd-mode-icon">${MODE_ICONS[mode] ?? ""}</span>
                      <span class="lcd-mode-text">${MODE_LABELS[mode] ?? mode.toUpperCase()}</span>
                      <span class="lcd-action ${action}">${action === "idle" ? "" : action.toUpperCase()}</span>
                    </div>
                    <div class="lcd-temp-row">
                      <div class="lcd-current">
                        <span class="lcd-temp-label">ROOM</span>
                        <span class="lcd-temp-value">${this._currentTemp}</span>
                        <span class="lcd-temp-unit">${this._unit}</span>
                      </div>
                      <div class="lcd-divider"></div>
                      <div class="lcd-setpoint">
                        <span class="lcd-temp-label">SET</span>
                        <span class="lcd-temp-value">${this._setpoint}</span>
                        <span class="lcd-temp-unit">${this._unit}</span>
                      </div>
                    </div>
                    <div class="lcd-bottom-row">
                      <span class="lcd-fan-label">FAN</span>
                      <span class="lcd-fan-value">${FAN_LABELS[this._fanMode] ?? this._fanMode.toUpperCase()}</span>
                    </div>
                  `
                : html`
                    <div class="lcd-off">
                      <span class="lcd-off-icon">⏻</span>
                      <span class="lcd-off-text">OFF</span>
                    </div>
                  `}
            </div>
          </div>

          <!-- Controls -->
          <div class="controls">
            <!-- Power -->
            <button class="btn btn-power ${isOn ? "on" : ""}" @click=${this._togglePower} title="Power">
              <span class="btn-icon">⏻</span>
              <span class="btn-label">ON/OFF</span>
            </button>

            <!-- Mode buttons -->
            <div class="mode-row">
              ${(this._entity?.attributes.hvac_modes ?? this._skin.modes)
                .filter((m: string) => m !== "off")
                .map(
                  (m: string) => html`
                    <button
                      class="btn btn-mode ${mode === m ? "active" : ""}"
                      @click=${() => this._setMode(m)}
                      ?disabled=${!isOn}
                      title=${MODE_LABELS[m] ?? m}
                    >
                      <span class="btn-icon">${MODE_ICONS[m] ?? "?"}</span>
                      <span class="btn-label">${MODE_LABELS[m] ?? m.toUpperCase()}</span>
                    </button>
                  `
                )}
            </div>

            <!-- Temp adjust -->
            <div class="temp-row">
              <button class="btn btn-temp" @click=${() => this._adjustTemp(-1)} ?disabled=${!isOn} title="Decrease temperature">
                <span class="btn-icon">▼</span>
                <span class="btn-label">TEMP</span>
              </button>
              <button class="btn btn-temp" @click=${() => this._adjustTemp(1)} ?disabled=${!isOn} title="Increase temperature">
                <span class="btn-icon">▲</span>
                <span class="btn-label">TEMP</span>
              </button>
            </div>

            <!-- Fan -->
            <button class="btn btn-fan" @click=${this._cycleFan} ?disabled=${!isOn} title="Fan speed">
              <span class="btn-icon">🌀</span>
              <span class="btn-label">FAN ${FAN_LABELS[this._fanMode] ?? ""}</span>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      --card-bg: #f0f2f5;
      --card-border: #c8ccd4;
      --lcd-bg: #c8d8c0;
      --lcd-text: #1a2e1a;
      --lcd-glow: rgba(100, 180, 100, 0.15);
      --btn-bg: #e0e3e8;
      --btn-hover: #d0d4da;
      --btn-active: #0073e6;
      --btn-active-text: #fff;
      --btn-text: #333;
      --btn-disabled: #bbb;
      --power-on: #22c55e;
      --power-off: #888;
      --mode-cool: #3b82f6;
      --mode-heat: #ef4444;
      --mode-dry: #f59e0b;
      --mode-fan: #8b5cf6;
      --mode-auto: #06b6d4;
      --top-bar-bg: #dde0e6;
      --top-bar-text: #555;
    }

    ha-card {
      overflow: hidden;
      background: none;
      border: none;
      box-shadow: none;
    }

    .controller {
      background: var(--card-bg);
      border: 2px solid var(--card-border);
      border-radius: 18px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 320px;
      margin: 0 auto;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
      transition: opacity 0.3s;
    }

    .controller.compact {
      max-width: 260px;
      padding: 12px;
      border-radius: 14px;
    }

    .controller.off {
      opacity: 0.85;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 8px;
      background: var(--top-bar-bg);
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      color: var(--top-bar-text);
      letter-spacing: 0.03em;
    }

    .model-label {
      font-family: monospace;
      font-size: 10px;
      opacity: 0.7;
    }

    .name-label {
      text-transform: uppercase;
      font-size: 11px;
    }

    /* LCD */
    .lcd {
      background: var(--lcd-bg);
      border: 2px solid #a8b8a0;
      border-radius: 10px;
      padding: 2px;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    .lcd-inner {
      background: linear-gradient(180deg, var(--lcd-bg) 0%, #b8c8b0 100%);
      border-radius: 8px;
      padding: 12px 14px;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
    }

    .lcd.mode-cool { --lcd-bg: #b8d4e8; border-color: #90b0c8; }
    .lcd.mode-cool .lcd-inner { background: linear-gradient(180deg, #b8d4e8 0%, #a0c0d4 100%); }

    .lcd.mode-heat { --lcd-bg: #e8cbb8; border-color: #c8a890; }
    .lcd.mode-heat .lcd-inner { background: linear-gradient(180deg, #e8cbb8 0%, #d4b8a0 100%); }

    .lcd.mode-dry { --lcd-bg: #e0d8b8; border-color: #c0b890; }
    .lcd.mode-dry .lcd-inner { background: linear-gradient(180deg, #e0d8b8 0%, #d0c8a0 100%); }

    .lcd.mode-fan_only { --lcd-bg: #d0c8e0; border-color: #b0a8c0; }
    .lcd.mode-fan_only .lcd-inner { background: linear-gradient(180deg, #d0c8e0 0%, #c0b8d0 100%); }

    .lcd.mode-auto { --lcd-bg: #b8d8d8; border-color: #90b8b8; }
    .lcd.mode-auto .lcd-inner { background: linear-gradient(180deg, #b8d8d8 0%, #a0c8c8 100%); }

    .lcd-top-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--lcd-text);
    }

    .lcd-mode-icon { font-size: 14px; }
    .lcd-mode-text { font-family: monospace; letter-spacing: 0.08em; }

    .lcd-action {
      margin-left: auto;
      font-size: 9px;
      font-family: monospace;
      opacity: 0.7;
      letter-spacing: 0.06em;
    }
    .lcd-action.heating { color: #b33; }
    .lcd-action.cooling { color: #338; }

    .lcd-temp-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .lcd-current,
    .lcd-setpoint {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    .lcd-temp-label {
      font-size: 9px;
      font-family: monospace;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--lcd-text);
      opacity: 0.6;
    }

    .lcd-temp-value {
      font-size: 28px;
      font-weight: 700;
      font-family: monospace;
      color: var(--lcd-text);
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .lcd-temp-unit {
      font-size: 11px;
      font-family: monospace;
      color: var(--lcd-text);
      opacity: 0.6;
    }

    .lcd-divider {
      width: 1px;
      height: 40px;
      background: var(--lcd-text);
      opacity: 0.2;
    }

    .lcd-bottom-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10px;
      font-family: monospace;
      font-weight: 600;
      color: var(--lcd-text);
      opacity: 0.7;
      letter-spacing: 0.06em;
    }

    .lcd-off {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      min-height: 80px;
      color: var(--lcd-text);
      opacity: 0.4;
    }

    .lcd-off-icon { font-size: 24px; }
    .lcd-off-text { font-size: 14px; font-family: monospace; font-weight: 700; letter-spacing: 0.15em; }

    /* Buttons */
    .controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      background: var(--btn-bg);
      color: var(--btn-text);
      font-size: 11px;
      font-weight: 600;
      padding: 8px 10px;
      cursor: pointer;
      transition: background 0.15s, transform 0.1s;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      font-family: inherit;
      line-height: 1;
    }

    .btn:hover:not(:disabled) { background: var(--btn-hover); }
    .btn:active:not(:disabled) { transform: scale(0.96); }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .btn-icon { font-size: 14px; }
    .btn-label { font-family: monospace; font-size: 10px; letter-spacing: 0.06em; }

    .btn-power {
      width: 100%;
      border-radius: 10px;
      padding: 10px;
      font-size: 12px;
    }

    .btn-power.on {
      background: var(--power-on);
      color: #fff;
      border-color: #16a34a;
    }

    .btn-power.on:hover { background: #16a34a; }

    .mode-row {
      display: flex;
      gap: 4px;
    }

    .mode-row .btn-mode {
      flex: 1;
      flex-direction: column;
      gap: 2px;
      padding: 8px 4px;
      min-width: 0;
    }

    .btn-mode.active {
      background: var(--btn-active);
      color: var(--btn-active-text);
      border-color: var(--btn-active);
    }

    .mode-row .btn-mode[title="COOL"].active { background: var(--mode-cool); border-color: var(--mode-cool); }
    .mode-row .btn-mode[title="HEAT"].active { background: var(--mode-heat); border-color: var(--mode-heat); }
    .mode-row .btn-mode[title="DRY"].active  { background: var(--mode-dry);  border-color: var(--mode-dry); }
    .mode-row .btn-mode[title="FAN"].active  { background: var(--mode-fan);  border-color: var(--mode-fan); }
    .mode-row .btn-mode[title="AUTO"].active { background: var(--mode-auto); border-color: var(--mode-auto); }

    .temp-row {
      display: flex;
      gap: 6px;
    }

    .temp-row .btn-temp {
      flex: 1;
      padding: 10px;
    }

    .btn-fan {
      width: 100%;
      padding: 10px;
    }

    .error {
      padding: 16px;
      color: #c53030;
      font-size: 13px;
      text-align: center;
    }

    .compact .lcd-temp-value { font-size: 22px; }
    .compact .btn { padding: 6px 8px; }
    .compact .mode-row .btn-mode { padding: 6px 2px; }
  `;
}

// ---- Card Editor ----
@customElement("daikin-controller-card-editor")
export class DaikinControllerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: DaikinCardConfig;

  setConfig(config: DaikinCardConfig) {
    this._config = config;
  }

  private _valueChanged(field: string, ev: Event) {
    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    const value = target.value;
    this._config = { ...this._config, [field]: value };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  protected render() {
    if (!this._config) return nothing;

    return html`
      <div class="editor">
        <div class="field">
          <label>Entity</label>
          <input
            type="text"
            .value=${this._config.entity ?? ""}
            @input=${(ev: Event) => this._valueChanged("entity", ev)}
            placeholder="climate.living_room"
          />
        </div>
        <div class="field">
          <label>Controller Model</label>
          <select @change=${(ev: Event) => this._valueChanged("controller", ev)}>
            ${CONTROLLER_MODELS.map(
              (m) =>
                html`<option value=${m} ?selected=${this._config.controller === m}>${m}</option>`
            )}
          </select>
        </div>
        <div class="field">
          <label>Name (optional)</label>
          <input
            type="text"
            .value=${this._config.name ?? ""}
            @input=${(ev: Event) => this._valueChanged("name", ev)}
            placeholder="Living Room"
          />
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
    }
    input, select {
      padding: 8px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      font-size: 14px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
    }
  `;
}

// Register with HA
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "daikin-controller-card",
  name: "Daikin Controller Card",
  description: "Emulates Daikin wired wall controllers (BRC1E63, BRC1H63K, BRC2E61, BRC315D7)",
  preview: true,
});
