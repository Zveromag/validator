import './polyfill';
import Validator from './validator';


const MESSAGES = {
  required: 'This field is required',
  minLen: 'The minimum number of characters allowed is %s%',
  maxLen: 'The maximum allowed number of characters is %s%',
  email: 'The e-mail field has the wrong format',
  phone: 'The phone number is not in the correct format',
  number: 'The entered data must be a number',
  equalTo: 'The entered data does not match',
  url: 'It is not a valid url'
}

const VERSION = 0.1;

const DEFAULTS = {
  change   : true,
  onSuccess: function () { },
  onError  : function () { },
  onChange : function () { }
};

const RULES = new RegExp(/^(minLen|maxLen|required|equalTo|email|regex|url)\((\w{1,20})\)/i);

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

    this.formSubmit  = this.validateForm.bind(this);
    this.inputChange = this.validateInput.bind(this);

    this.events();
  }

  static get version() {
    return VERSION;
  }

  check(el) {

    const val  = el.value.trim();
    const data = el.getAttribute('data-valid');

    const errors = [];
    const tmp = {
      el: el,
      i18n: this.i18n
    };

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

      if (val === '' && method !== 'required' && method !== 'equalTo') continue;

      if (Validator.hasOwnProperty(method)) {

        let state = Validator[method](tmp, this);

        if (state !== undefined && state !== true) {
          const dataMsg = el.getAttribute(`data-valid-msg-${method}`);

          state = (!dataMsg) ? state : dataMsg;
          errors.push(state);
        }
      }
    }
    return errors;
  }

  validateInput(e) {

    const target = e.target.closest('[data-valid]:not(:disabled)');
    if (!target) return;

    let tmp = {
      el: target
    };

    const err = this.check(target);
    if (err.length > 0) {
      tmp.errors = err;
    }

    return this.options.onChange(tmp);
  }

  validateForm(e) {
    const errors = [];
    const fields = Array.prototype.slice.call(this.form.querySelectorAll('[data-valid]:not(:disabled):not([hidden])'));

    for (let i = 0, inputsLen = fields.length; i < inputsLen; i++) {
      const err = this.check(fields[i]);

      if (err.length === 0) continue;

      errors.push({
        el: fields[i],
        errors: err
      });
    }

    if (errors.length === 0) return this.options.onSuccess(e);

    e.preventDefault();
    return this.options.onError(errors);
  }

  events() {

    this.form.addEventListener('submit', this.formSubmit);

    if (this.options.change) {
      this.form.addEventListener('change', this.inputChange);
    }

  }

  static destroy(elements) {
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
      if ('Validate' in element) {
        const self = element.Validate;

        self.form.removeEventListener('submit', self.formSubmit);

        if (self.options.change) {
          self.form.removeEventListener('change', self.inputChange);
        }

        self.form.Validate = null;
        delete self.form.Validate;
        self.form = null;
      }
    });
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
