import { ModelConfig } from "./model";

export declare class Config {
  static all(): ModelConfig;

  static get(path: string, defaultValue: any): any;

  static set(path: string, value: any): void;
}