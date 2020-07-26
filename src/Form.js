export class Form {
    rules = {};

    errors = {};

    constructor(errors) {
        this.errors = errors;
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
}