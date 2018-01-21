import Validator from './validator';

const DEFAULTS = {
  lang: 'ru',
  onSuccess: function () { },
  onError: function () { }
};

const RULES = new RegExp(/^(minLen|maxLen|phone|required|password|email)\((\w{1,20})\)/i);

export default class Validate {
  constructor(selector, options) {
    this._version = 0.1;
    this.options = {
      ...DEFAULTS,
      ...options
    }
    this.form = (selector.nodeType === 1) ? selector : document.querySelector(selector);
    this.inputs = Array.prototype.slice.call(this.form.querySelectorAll('[data-valid]'));
    this.eventValid = this.valid.bind(this);

    this.init();
  }
  get version() {
    return this._version;
  }
  check() {
    const invalidFields = [];
    for (let i = 0, inputsLen = this.inputs.length; i < inputsLen; i++) {
      const el = this.inputs[i];
      // const data = el.dataset.valid;
      const data = el.getAttribute('data-valid');

      let errors = [];
      const tmp = {
        el: el,
        lang: this.options.lang
      };

      if (!data) continue;

      let rules = data.split('|');
      let rulesLen = rules.length;

      for (let j = 0; j < rulesLen; j++) {
        let rule = rules[j].match(RULES);
        let method;

        if (rule) {
          method = rule[1];
          if (rule[2] !== undefined) {
            tmp.param = rule[2];
          }
        }
        else {
          method = rules[j];
        }

        if (Validator.hasOwnProperty(method)) {

          let state = Validator[method](tmp);

          if (state !== undefined && state !== true) {
            errors.push(state);
          }
        }
      }
      if (errors.length > 0) {
        invalidFields.push({ el: el, errors: errors });
      }
    }
    return invalidFields;
  }
  valid(e) {
    const errors = this.check();

    if (errors.length === 0) return this.options.onSuccess(e);

    e.preventDefault();
    return this.options.onError(errors);
  }
  init() {
    this.form.addEventListener('submit', this.eventValid);
  }
}

// if (typeof document !== 'undefined') {
  window.Validate = Validate;
// }
