import { Form } from "./form";
import { Flags } from "./flags";
import { RequestBuilder } from "./request.builder";

export interface ModelConfig {
  origin: string,
  backend: string
}

export interface ModelFlags {
  changed: {
    [key: string]: {
      newValue: any,
      oldValue: any
    }
  },
  dirty: {
    [key: string]: {
      newValue: any,
      oldValue: any
    }
  }
}

export declare class Model extends Form {
  public path: string = '';

  public flags: Flags;

  public fields: object = {};

  public formdata: boolean = false;

  private state: object = {};

  private builder: RequestBuilder;

  private events: object = {};

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

  static all(): RequestBuilder;

  static find(id: number|string = null): RequestBuilder;

  static destroyMany(ids: number[]|string[]): RequestBuilder;
}