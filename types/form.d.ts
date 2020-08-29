export interface FormErrors {
  [key: string]: string[]
}

export interface FormRules {
  [key: string]: object
}

export type Mode = Form.MODE_CREATE | Form.MODE_UPDATE | Form.MODE_DELETE;

export declare class Form {
  mode?: number = null;

  loading: boolean|string = false;

  rules: object = {};

  errors: FormErrors = {};

  public static MODE_CREATE: number = 1;

  public static MODE_UPDATE: number = 2;

  public static MODE_DELETE: number = 0;

  constructor(errors: {}): void;

  setErrors(errors: FormErrors): void;

  error(field: string): string;

  setRules(rules: FormRules): void;

  setRulesBy(key: string, rules: object): void;

  setModeCreate(): void;

  setModeUpdate(): void;

  setModeDelete(): void;

  setMode(mode: Mode): void;

  unsetMode(): void;

  get isModeCreate(): boolean;

  get isModeUpdate(): boolean;

  get isModeDelete(): boolean;
}
