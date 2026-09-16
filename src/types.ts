export type ControllerModel = "BRC1E63" | "BRC1H63K" | "BRC2E61" | "BRC315D7";

export interface DaikinCardConfig {
  type: string;
  entity: string;
  controller: ControllerModel;
  name?: string;
  show_temperature?: boolean;
  show_humidity?: boolean;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    hvac_modes?: string[];
    hvac_action?: string;
    current_temperature?: number;
    temperature?: number;
    target_temp_high?: number;
    target_temp_low?: number;
    min_temp?: number;
    max_temp?: number;
    target_temp_step?: number;
    fan_mode?: string;
    fan_modes?: string[];
    swing_mode?: string;
    swing_modes?: string[];
    unit_of_measurement?: string;
    [key: string]: unknown;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data: Record<string, unknown>,
    target?: { entity_id: string }
  ): Promise<void>;
}

export interface ControllerSkin {
  model: ControllerModel;
  modes: string[];
  fanSpeeds: string[];
  hasSwing: boolean;
  hasSchedule: boolean;
  compactLayout: boolean;
}
