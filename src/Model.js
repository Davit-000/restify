import pluralize from "pluralize"
import { trim, assign, cloneDeep } from "lodash";
import { Form } from "./Form";
import { Flags } from "./Flags";
import { Fields } from "./Fields";
import { Config } from "./Config";
import { RequestBuilder } from "./RequestBuilder";
import config from "../restify.config";

export class Model extends Form {
  /**
   * @type {RequestBuilder}
   */
  #builder;

  /**
   * @type {Object}
   */
  #state = {};

  #file = null;

  /**
   * @type {Object}
   */
  #events = {};

  /**
   * @type {Object}
   */
  fields = {};

  /**
   * Model fields flags
   *
   * @type {Flags}
   */
  #flags;

  /**
   * Converts data to formdata
   *
   * @type {boolean}
   */
  formdata = false;

  /**
   * File reader state
   *
   * @type {boolean}
   */
  reading = false;

  /**
   * @type {string}
   */
  origin = Config.get('origin');

  /**
   * @type {{origin: string|string, backend: string}}
   */
  static $config = config;

  /**
   * Model Constructor
   *
   * @param {{fields: Object, errors?: Object, request?: Object}} options
   */
  constructor(options) {
    const { fields, errors = {}, request = {} } = options;

    super(errors);

    const url = request.uri ? `/${trim(request.uri, '/')}` : `/${trim(this.uri, '/')}`;

    this.#state = cloneDeep(fields);
    this.#flags = new Flags();
    this.fields = new Fields(fields);
    this.#builder = new RequestBuilder({
      model: this,
      configs: request,
      request: {
        url,
        baseURL: Config.get('origin', window.location.origin),
        headers: Config.get('headers', {})
      }
    });

    Object.keys(this.fields.all).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.fields.get(key);
        },
        set(v) {
          this.fields.set({[key]: v});

          if (this.#state[key] !== this.fields.get(key)) {
            this.#flags.setChanged(key, v);
            this.#flags.unsetDirty(key);
          } else if (this.#state[key] !== this.fields.get(key) && this.#flags.isChanged(key)) {
            this.#flags.unsetChanged(key);
            this.#flags.setDirty(key, v);
          }

          this.trigger('change', {key, v});
        }
      });
    });
  }

  get file() {
    return this.#file;
  }

  set file(v) {
    this.#file = v;

    let reader = new FileReader();

    if (v instanceof File || v instanceof FileList) {
      this.trigger('reading');
      this.reading = true;

      reader.readAsDataURL(v);
      reader.onload = e => {
        this.trigger('readied', e.target.result);
        this.reading = false;
      }
    }
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
   * Check if backend option is laravel
   *
   * @return {boolean}
   */
  get backendIsLaravel() {
    return Config.get('backend', 'laravel') === 'laravel';
  }

  /**
   * Setting fields
   *
   * @param {Object} fields
   */
  set(fields) {
    this.fields.set(fields);
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
    this.file = null;
    this.errors = {};
    this.#flags.reset();
    this.fields.set(this.#state);
    this.trigger('reset');
  }

  resetFields(...args) {
    if (Array.isArray(args[0])) {
      this.resetFields(...args[0]);
    } else {
      args.forEach(field => this.fields.set({[field]: this.#state[field]}));
    }
  }

  /**
   * Set's request method
   *
   * @return {RequestBuilder}
   */
  create() {
    this.#builder.setMethod('post');
    this.#builder.setData(this.fields.all);

    return this.#builder;
  }

  /**
   * Set's request method
   *
   * @return {RequestBuilder}
   */
  update() {
    const data = this.backendIsLaravel
      ? assign({}, this.fields.all, {_method: 'patch'})
      : this.fields.all;

    const method = this.backendIsLaravel ? 'post' : 'patch';

    this.#builder.setData(data);
    this.#builder.setMethod(method);
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
   * Restores soft deleted resource
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
   * Makes dry request
   *
   * @param {String} method
   * @return {RequestBuilder}
   */
  static req(method) {
    const model = new this();

    model.#builder.setMethod(method);

    return model.#builder;
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

  /**
   * Sends request to delete multiple resources
   *
   * @param {number[]} ids
   * @return {RequestBuilder}
   */
  static destroyMany(ids) {
    const model = new this();

    model.#builder.setMethod('delete');
    model.#builder.query({ ids });

    return model.#builder;
  }
}