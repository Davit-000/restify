export class Form {
  /**
   * @type {number|null}
   */
  mode = null;

  /**
   * @type {boolean|string}
   */
  loading = false;

  /**
   * @type {Object}
   */
  rules = {};

  /**
   * @type {Object}
   */
  errors = {};

  /**
   * @type {number}
   */
  static MODE_CREATE = 1;

  /**
   * @type {number}
   */
  static MODE_UPDATE = 2;

  /**
   * @type {number}
   */
  static MODE_DELETE = 0;

  /**
   * Form constructor
   *
   * @param {Object} errors
   */
  constructor(errors) {
    this.errors = errors;

    this.mode = Form.MODE_CREATE;
  }

  /**
   * Sets the errors
   *
   * @param {Object} errors
   */
  setErrors(errors) {
    Object.assign(this.errors, errors);
  }

  /**
   * Gets the error message
   *
   * @param {string} field
   * @returns {string}
   */
  error(field) {
    return this.errors[field][0];
  }

  /**
   * Set the model rules
   *
   * @param {Object} rules
   */
  setRules(rules) {
    Object.assign(this.rules, rules);
  }

  /**
   * Sets model rule by key
   * @param {String} key
   * @param {Object} rules
   */
  setRulesBy(key, rules) {
    Object.assign(this.rules[key], rules);
  }

  /**
   * Set's form mode to create
   * @return void
   */
  setModeCreate() {
    this.setMode(Form.MODE_CREATE);
  }

  /**
   * Set's form mode to update
   *
   * @return void
   */
  setModeUpdate() {
    this.setMode(Form.MODE_UPDATE);
  }

  /**
   * Set's form mode to delete
   *
   * @return void
   */
  setModeDelete() {
    this.setMode(Form.MODE_DELETE);
  }

  /**
   * unSet's from mode
   */
  unsetMode() {
    this.mode = null;
  }

  /**
   * Sets the form mode
   *
   * @param {number} mode
   */
  setMode(mode) {
    this.mode = mode;
  }

  /**
   * Check's if mode is create
   *
   * @return {boolean}
   */
  get isModeCreate() {
    return this.mode === Form.MODE_CREATE;
  }

  /**
   * Check's if mode is update
   *
   * @return {boolean}
   */
  get isModeUpdate() {
    return this.mode === Form.MODE_UPDATE;
  }

  /**
   * Check's if mode is delete
   *
   * @return {boolean}
   */
  get isModeDelete() {
    return this.mode === Form.MODE_DELETE;
  }
}