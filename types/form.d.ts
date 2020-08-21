interface FormErrors {
  [key: string]: string[]
}

export declare class Form {
  rules: {};

  errors: FormErrors;

  constructor(errors: {}): void;

  setErrors(errors: FormErrors): void;

  error(field: string): string;
}
