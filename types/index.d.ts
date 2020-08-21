/// <reference types="typescript" />

declare module 'vue-restify' {
  import { Model } from "./model";
  import { Config } from "./config";

  export = {
    Restify: Model,
    RestifyConfig: Config,
  };
}