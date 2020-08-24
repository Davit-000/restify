interface FormErrors {
  [key: string]: string[]
}

export declare class Form {
  mode: string = Form.MODE_CREATE;

  rules: {} = {};

  errors: FormErrors = {};

  public static MODE_CREATE = 1;

  public static MODE_UPDATE = 2;

  public static MODE_DELETE = 0;

  constructor(errors: {}): void;

  setErrors(errors: FormErrors): void;

  error(field: string): string;

  setModeCreate(): void;

  setModeUpdate(): void;

  setModeDelete(): void;

  get isModeCreate(): boolean;

  get isModeUpdate(): boolean;

  get isModeDelete(): boolean;
}
