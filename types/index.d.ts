import { Form } from "./form";
import { RequestBuilder } from "./request.builder";

export = {
  Restify: Model,
  RestifyConfig: Config
};

interface ModelConfig {
  origin: string,
  backend: string
}

declare class Model extends Form {
  public fields: {} = {};

  public formdata: boolean = false;

  private state: {} = {};

  private builder: RequestBuilder;

  private events: {} = {};

  public static $config: ModelConfig;

  constructor(fields: {} = {}, errors: {} = {});

  get uri(): string;

  get backendIsLaravel(): boolean;

  set(fields: {}): void

  on(eventName: string, callback: Function): void;

  trigger(eventName: string, payload: any = null): void;

  reset(): void;

  create(): RequestBuilder;

  update(): RequestBuilder;

  destroy(): RequestBuilder;

  static find(id: number|string = null): RequestBuilder;

  static destroyMany(ids: number[]|string[]): RequestBuilder;
}

declare class Config {
  static all(): ModelConfig;

  static get(path: string, defaultValue: any): any;

  static set(path: string, value: any): void;
}