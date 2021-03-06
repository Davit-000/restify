import { trim, omit, pick, cloneDeep, startsWith, endsWith } from "lodash";
import { serialize } from "object-to-formdata";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export class RequestBuilder {
  #model;
  #methods = ['get', 'head', 'post', 'patch', 'put', 'delete'];
  #configs = {
    uri: '',
    prefix: '',
    suffix: ''
  };
  /**
   *
   * @type {AxiosRequestConfig}
   */
  #request = {
    url: '',
    method: '',
    baseURL: '',
    headers: {},
    params: {},
    data: {}
  };

  /**
   * Request builder constructor
   *
   * @param {Model} model
   * @param {AxiosRequestConfig} request
   * @param {Object} configs
   */
  constructor({model, request, configs}) {
    this.#model = model;
    this.#configs = configs;
    this.#request = Object.assign({}, this.#request, request);
  }

  /**
   * Transforms request data object to formdata object
   */
  #transformToFormdata() {
    this.#request.data = serialize(Object.assign(this.#request.data, {file: this.#model.file}), {
      /**
       * include array indices in FormData keys
       * defaults to false
       */
      indices: true,

      /**
       * treat null values like undefined values and ignore them
       * defaults to false
       */
      nullsAsUndefineds: false,

      /**
       * convert true or false to 1 or 0 respectively
       * defaults to false
       */
      booleansAsIntegers: false,

      /**
       * store arrays even if they're empty
       * defaults to false
       */
      allowEmptyArrays: true,
    });
  }

  /**
   * Builds request full url
   */
  #buildUrl() {
    let { url } = this.#request;
    let { prefix, suffix } = this.#configs;

    url = trim(url, '/');
    prefix = trim(prefix, '/');
    suffix = trim(suffix, '/');

    this.#request.url =
      (prefix && !startsWith(url, prefix, 0) ? `${prefix}/` : '') +
      url +
      (suffix && !endsWith(url, suffix, url.length) ? `/${suffix}` : '');
  }

  /**
   * Reset built request url
   */
  #reBuildUrl() {
    this.#request.url = this.#configs.uri || this.#model.uri;
  }

  /**
   * Set's request method
   *
   * @param {string} method
   */
  setMethod(method) {
    if (this.#methods.includes(method))
      this.#request.method = method;
    else
      throw new Error('wrong request method provided.');
  }

  /**
   * Set's request parameter
   *
   * @param {number|string} id
   */
  setParam(id) {
    const { url } = this.#request;
    const reg = new RegExp(id, 'g');

    this.#request.url = reg.test(url)
      ? url.replace(reg, id)
      : `${url}/${id}`;
  }

  /**
   * Set's request data
   *
   * @param {Object} data
   */
  setData(data) {
    this.#request.data = cloneDeep(data);
  }

  /**
   * Only specified fields to send
   *
   * @param {string[]} fields
   * @return {RequestBuilder}
   */
  only(fields) {
    this.setData(pick(this.#request.data, [...fields, '_method']));

    return this;
  }

  /**
   * Except specified fields to send
   *
   * @param {string[]} fields
   * @return {RequestBuilder}
   */
  except(fields) {
    this.setData(omit(this.#request.data, fields));

    return this;
  }

  /**
   * Set's prefix to request uri
   *
   * @param {string} prefix
   * @return {RequestBuilder}
   */
  prefix(prefix) {
    this.#request.url = `${trim(prefix, '/')}/${trim(this.#request.url, '/')}`;

    return this;
  }

  /**
   * Set's suffix to request uri
   *
   * @param {string} suffix
   * @return {RequestBuilder}
   */
  suffix(suffix) {
    this.#request.url = `${trim(this.#request.url, '/')}/${trim(suffix, '/')}`

    return this;
  }

  /**
   * Set's request headers
   *
   * @param {Object} headers
   * @return {RequestBuilder}
   */
  headers(headers) {
    Object.assign(this.#request.headers, headers);

    return this;
  }

  /**
   * Set's request parameters
   *
   * @param {Object} params
   * @return {RequestBuilder}
   */
  query(params) {
    Object.assign(this.#request.params, params);
    return this;
  }

  /**
   * Send request
   *
   * @return {AxiosResponse}
   */
  send() {
    this.#model.trigger('sending');
    this.#model.loading = 'primary';

    if (this.#model.formdata) {
      this.#transformToFormdata();
    }

    this.#buildUrl();

    return axios
      .request(this.#request)
      .then(res => {
        this.#model.trigger('sent', this.#request);

        return res;
      })
      .catch(err => {
        this.#model.trigger('failed', this.#request);

        if (err.response && err.response.data.hasOwnProperty('errors'))
          this.#model.setErrors(err.response.data.errors);

        throw err;
      })
      .finally(() => {
        this.#model.loading = false;

        // TODO: uncomment if not need to use setParams for request url building
        this.#reBuildUrl();
      });
  }
}