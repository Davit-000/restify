import { get } from "lodash";
import config from "../restify.config";

export class Config {
  static get(key, defaultValue) {
    return get(config, key, defaultValue);
  }
}