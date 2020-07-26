import {pick, omit} from "lodash";

export class Fields {
  /**
   * Fields Constructor
   *
   * @param {Object} fields
   */
  constructor(fields) {
    this.fields = Object.assign({}, this.fields, fields);
  }

  /**
   * get all fields object
   *
   * @return {Object}
   */
  get all() {
    return this.fields;
  }

  /**
   * get specified fields
   *
   * @param {string[]} fields
   * * @return {Object}
   */
  only(fields) {
    return pick(this.all, fields);
  }

  /**
   * get fields except specified
   *
   * @param {string[]} fields
   * @return {Object}
   */
  except(fields) {
    return omit(this.all, fields);
  }

  /**
   * Get specified field value
   *
   * @param {string} field
   * @return {*}
   */
  get(field) {
    return this.fields[field];
  }

  /**
   * Sets fields
   * @param {Object} fields
   */
  set(fields) {
    this.fields = Object.assign({}, this.fields, fields);
  }
}