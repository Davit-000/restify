import pluralize from "pluralize"
import { cloneDeep } from "lodash";
import { Form } from "./Form";
import { Fields } from "./Fields";
import { RequestBuilder } from "./RequestBuilder";

export class Model extends Form {
  #builder;
  #state = {};
  #events = {};

  fields = {};

  formdata = false;

  origin = window.location.origin;

  /**
   * Model Constructor
   *
   * @param {Object} fields
   * @param errors
   */
  constructor(fields = {}, errors = {}) {
    super(errors);

    this.#state = cloneDeep(fields);
    this.fields = new Fields(fields);
    this.#builder = new RequestBuilder(this,{
      url: this.uri,
      baseURL: this.origin
    });

    Object.keys(this.fields.all).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.fields.get(key);
        },
        set(v) {
          this.fields.set({[key]: v});
          this.trigger('change', {key, v});
        }
      });
    });
  }

  /**
   * Get's model rest path
   *
   * @return {string}
   */
  get uri() {
    return pluralize.plural(this.constructor.name.toLowerCase());
  }

  /**
   * Register event for model
   *
   * @param {String} eventName
   * @param {Function} callback
   * @return void
   */
  on(eventName, callback) {
    const handlers = this.#events[eventName] || [];

    handlers.push(callback);

    this.#events[eventName] = handlers;
  }

  /**
   * Triggers model event
   *
   * @param {String} eventName
   * @param {*} payload
   * @return void
   */
  trigger(eventName, payload = null) {
    const handlers = this.#events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach(callback => payload ? callback(payload) : callback());
  }

  /**
   * Reset fields
   */
  reset() {
    this.errors = {};
    this.fields.set(this.#state);
    this.trigger('reset');
  }

  /**
   * Only specified fields to send
   *
   * @param {string[]} fields
   * @return {Model}
   */
  only(fields) {
    this.#builder.setData(this.fields.only(fields));

    return this;
  }

  /**
   * Except specified fields to send
   *
   * @param {string[]} fields
   * @return {Model}
   */
  except(fields) {
    this.#builder.setData(this.fields.except(fields));

    return this;
  }

  /**
   * Set's request method
   *
   * @return {RequestBuilder}
   */
  create() {
    this.#builder.setMethod('post');

    return this.#builder;
  }

  /**
   * Set's request method
   *
   * @return {RequestBuilder}
   */
  update() {
    this.#builder.setMethod('patch');
    this.#builder.setParam(this.fields.get('id'));

    return this.#builder;
  }

  /**
   * Set's request method
   *
   * @return {RequestBuilder}
   */
  destroy() {
    this.#builder.setMethod('delete');
    this.#builder.setParam(this.fields.get('id'));

    return this.#builder;
  }

  /**
   * Restore's soft deleted resource
   *
   * @returns {RequestBuilder}
   */
  restore() {
    this.#builder.setMethod('put');
    this.#builder.setParam(this.fields.get('id'));
    this.#builder.suffix('restore');

    return this.#builder;
  }

  /**
   * Set's request method
   *
   * @returns {RequestBuilder}
   */
  static all() {
    const model = new this();

    model.#builder.setMethod('get');

    return model.#builder;
  }

  /**
   * Get single resource
   *
   * @param {number|string} id
   * @returns {*}
   */
  static find(id) {
    const model = new this();

    model.#builder.setMethod('get');
    model.#builder.setParam(id);

    return model.#builder;
  }

  static destroyMany(ids) {
    const model = new this();

    model.#builder.setMethod('get');
    model.#builder.query({ ids });

    return model.#builder;
  }
}