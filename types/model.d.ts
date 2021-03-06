import { Form } from "./form";
import { Flags } from "./flags";
import { Fields } from "./fields";
import { RequestBuilder } from "./request.builder";
import { Method } from "axios";

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

export interface ModelRequestOptions {
  uri?: string
  prefix?: string,
  suffix?: string,
}

export interface ModelOptions {
  fields: object,
  errors?: object
  request?: ModelRequestOptions
}

export declare class Model extends Form {
  public path: string = '';

  public flags: Flags;

  public fields: Fields = {};

  public formdata: boolean = false;

  public reading: boolean = false;

  private state: object = {};

  private builder: RequestBuilder;

  private events: object = {};

  public static $config: ModelConfig;

  constructor(options: ModelOptions);

  get uri(): string;

  get backendIsLaravel(): boolean;

  get file(): File|null;

  set file(): void;

  set(fields: {}): void

  on(eventName: string, callback: Function): void;

  trigger(eventName: string, payload: any = null): void;

  reset(): void;

  resetFields(fields: string|string[]): void;

  create(): RequestBuilder;

  update(): RequestBuilder;

  destroy(): RequestBuilder;

  static req(method: Method): RequestBuilder;

  static all(): RequestBuilder;

  static find(id: number|string = null): RequestBuilder;

  static destroyMany(ids: number[]|string[]): RequestBuilder;
}