import { get, set } from "lodash";
import { Model } from "./Model";


export class Config {
  static all() {
    return Model.$config;
  }

  static get(path, defaultValue) {
    return get(Model.$config, path, defaultValue);
  }

  static set(path, value) {
    set(Model.$config, path, value);
  }
}