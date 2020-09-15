import { pick, omit } from "lodash";

export class Fields {
  /**
   * Fields Constructor
   *
   * @param {Object} fields
   */
  constructor(fields) {
    this.data = Object.assign({}, this.data, fields);
  }

  /**
   * get all fields object
   *
   * @return {Object}
   */
  get all() {
    return this.data;
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
    return this.data[field];
  }

  /**
   * Sets fields
   * @param {Object} fields
   */
  set(fields) {
    Object.assign(this.data, fields);
  }
}