import Validator from './validator';

const MESSAGES = {
  required: 'This field is required',
  minLen: 'The minimum number of characters allowed is %s%',
  maxLen: 'The maximum allowed number of characters is %s%',
  email: 'The e-mail field has the wrong format',
  phone: 'The phone number is not in the correct format',
  number: 'The entered data must be a number',
  equalTo: 'The entered data does not match'
}

const VERSION = 0.1;

const DEFAULTS = {
  lang: 'ru',
  onSuccess: function () { },
  onError: function () { }
};

const RULES = new RegExp(/^(minLen|maxLen|phone|required|password|email)\((\w{1,20})\)/i);

export default class Validate {
  constructor(selector, options) {
    this.options = {
      ...DEFAULTS,
      ...options
    };

    this.i18n = {
      ...MESSAGES,
      ...Validate.i18n
    };

    this.form = selector;
    this.inputs = Array.prototype.slice.call(this.form.querySelectorAll('[data-valid]:not(:disabled)'));
    this.eventValid = this.valid.bind(this);

    this.init();
  }
  static get version() {
    return VERSION;
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
        lang: this.i18n
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

  static run(elements, settings) {
    if (elements instanceof Node) {
      elements = [elements];
    }

    if (elements instanceof NodeList) {
      elements = [].slice.call(elements);
    }

    if (typeof elements === 'string') {
      elements = [].slice.call(document.querySelectorAll(elements));
    }

    if (!(elements instanceof Array)) {
      return;
    }

    elements.forEach((element) => {
      if (!('Validate' in element)) {
        element.Validate = new Validate(element, settings);
      }
    });
  }
}

if (typeof document !== 'undefined') {
  window.Validate = Validate;
}
