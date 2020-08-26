interface FormErrors {
  [key: string]: string[]
}

interface FormRules {
  [key: string]: object
}

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

  get isModeCreate(): boolean;

  get isModeUpdate(): boolean;

  get isModeDelete(): boolean;
}
