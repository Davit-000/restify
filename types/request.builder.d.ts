import Model from "./index";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export declare class RequestBuilder {
  private model: Model;

  private methods: string[];

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

  public headers(headers: {}): RequestBuilder;

  public query(params: {}): RequestBuilder;

  public send(): AxiosResponse;
}