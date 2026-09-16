import { ControllerModel, ControllerSkin } from "../types";
import { BRC1E63 } from "./brc1e63";
import { BRC1H63K } from "./brc1h63k";
import { BRC2E61 } from "./brc2e61";
import { BRC315D7 } from "./brc315d7";

const CONTROLLERS: Record<ControllerModel, ControllerSkin> = {
  BRC1E63,
  BRC1H63K,
  BRC2E61,
  BRC315D7,
};

export const CONTROLLER_MODELS: ControllerModel[] = Object.keys(CONTROLLERS) as ControllerModel[];

export function getController(model: ControllerModel): ControllerSkin {
  return CONTROLLERS[model] ?? BRC1E63;
}
