import Model from "./index";
import { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export declare class RequestBuilder {
  private model: Model;

  private methods: Method[];

  private request: AxiosRequestConfig;

  constructor(model: Model, request: AxiosRequestConfig): void;

  get origin(): string;

  private transformToFormdata(): void;

  public setMethod(method: string): void;

  public setParam(id: number| string): void;

  public setData(data: any): void;

  public only(fields: string[]): RequestBuilder;

  public except(fields: string[]): RequestBuilder;

  public prefix(prefix: string): RequestBuilder;

  public suffix(suffix: string): RequestBuilder;

  public headers(headers: object): RequestBuilder;

  public query(params: object): RequestBuilder;

  public send(): AxiosResponse;
}