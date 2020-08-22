export declare class Flags {
  changed: object = {};

  dirty: object = {};

  isChanged(field: string) :boolean;

  getChanged(filed: string): any|null;

  setChanged(field: string, value: any): void;

  unsetChanged(field: string): void

  isDirty(field: string): boolean;

  getDirty(filed: string): any|null;

  setDirty(field: string, value: any): void;

  unsetDirty(field: string): void;

  reset(): void;
}