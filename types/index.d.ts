/// <reference types="typescript" />

import { Model } from "./model";
import { Config } from "./config";

// declare module 'vue-restify' {
//   import { Model } from "./model";
//   import { Config } from "./config";
//
//   export = {
//     Restify: Model,
//     RestifyConfig: Config,
//   };
// }

// declare const Restify: Model;
// declare const RestifyConfig: Config;

export {
  Model as Restify,
  Config as RestifyConfig
}
// export {
//   Restify,
//   RestifyConfig
// }