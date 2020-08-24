export class Flags {
  changed = {};

  dirty = {};

  isChanged(field) {
    return this.changed.hasOwnProperty(field);
  }

  getChanged(filed) {
    return this.hasChanged(filed) ? this.changed[filed] : null;
  }

  setChanged(field, value) {
    this.changed[field] = value;
  }

  unsetChanged(field) {
    delete this.changed[field];
  }

  isDirty(field) {
    return this.dirty.hasOwnProperty(field);
  }

  getDirty(filed) {
    return this.hasDirty(filed) ? this.dirty[filed] : null;
  }

  setDirty(field, value) {
    this.dirty[field] = value;
  }

  unsetDirty(field) {
    delete this.dirty[field];
  }

  reset() {
    this.changed = {};
    this.dirty = {};
  }
}