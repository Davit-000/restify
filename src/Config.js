import { get, set } from "lodash";
import config from "../restify.config";


export class Config {
  static all() {
    return config;
  }

  static get(path, defaultValue) {
    return get(config, path, defaultValue);
  }

  static set(path, value) {
    set(config, path, value);
  }
}