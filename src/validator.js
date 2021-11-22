import './polyfill';
import Rules from './rules';

const MESSAGES = {
  required: 'This field is required',
  minLen: 'The minimum number of characters allowed is %s%',
  maxLen: 'The maximum allowed number of characters is %s%',
  email: 'The e-mail field has the wrong format',
  phone: 'The phone number is not in the correct format',
  number: 'The entered data must be a number',
  equalTo: 'The entered data does not match',
  url: 'It is not a valid url'
};

const DEFAULTS = {
  showErrors: true,

  checkChange: true,
  checkInput: false,
  checkBlur: false,

  containerSelector: '.form-group',
  errorClass: 'has-error',
  errorHintClass: 'error-hint',

  onSuccess() { },
  onError() { },
  onChange() { },
  onReset() { }
};

const RULES = new RegExp(
  /^(minLen|maxLen|required|equalTo|email|regex|url)\((\w.*)\)/i
);

export default class Validator {
  constructor(selector, options) {
    this.options = {
      ...DEFAULTS,
      ...options
    };

    this.i18n = {
      ...MESSAGES,
      ...Validator.i18n
    };

    this.form = selector;

    this.formSubmit = this.validateForm.bind(this);
    this.formReset = this.reset.bind(this);
    this.inputChange = this.validateInput.bind(this);

    this.bindEvents();
  }

  check(el) {
    const val = el.value.trim();
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
      } else {
        method = rules[j];
      }

      if (val === '' && method !== 'required' && method !== 'equalTo') continue;

      if (Rules.hasOwnProperty(method)) {
        let state = Rules[method](tmp, this);

        if (state !== undefined && state !== true) {
          const dataMsg = el.getAttribute(`data-valid-msg-${method}`);

          state = !dataMsg ? state : dataMsg;
          errors.push(state);
        }
      }
    }
    return errors;
  }

  validateInput(e) {
    const target = e.target.closest('[data-valid]');
    if (!target) return;

    let tmp = {
      el: target
    };

    const err = this.check(target);
    if (err.length > 0) {
      tmp.errors = err;
    }

    // if show errors
    if (this.options.showErrors) {
      this.toggleError(tmp);
    }

    return this.options.onChange(tmp);
  }

  validateForm(e) {
    const errors = [];
    const fields = Array.prototype.slice.call(
      this.form.querySelectorAll(
        '[data-valid]:not(:disabled)'
      )
    );

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

    // if show errors
    if (this.options.showErrors) {
      this.showErrors(errors);
    }

    return this.options.onError(errors);
  }

  reset(e) {
    // if show errors
    if (this.options.showErrors) {
      this.resetErrors(e.target);
    }

    this.options.onReset(e);
  }

  showErrors(errs) {
    //  Simple Show all errors in the form
    errs.forEach(err => {
      this.toggleError(err);
    });
  }

  toggleError(field) {
    const parent = field.el.closest(this.options.containerSelector);
    const notice = parent.querySelector(`.${this.options.errorHintClass}`);

    // if notice exist remove him
    if (notice) {
      notice.parentNode.removeChild(notice);
    }

    if (!field.errors) {
      // if the field is validated, delete the class error from the parent wrapper
      parent.classList.remove(this.options.errorClass);
    } else {
      // or added error class and show notice
      parent.classList.add(this.options.errorClass);
      parent.insertAdjacentHTML(
        'beforeend',
        `<div class="${this.options.errorHintClass}"> ${field.errors.join('<br>')}</div>`
      );
    }
  }

  resetErrors(form) {
    var fieldsWrap = [].slice.call(form.querySelectorAll(`.${this.options.errorClass}`));

    fieldsWrap.forEach(item => {
      item.classList.remove(this.options.errorClass);

      var hint = item.querySelector(`.${this.options.errorHintClass}`);
      if (hint) item.removeChild(hint);
    });
  }

  bindEvents() {
    this.form.addEventListener('submit', this.formSubmit);
    this.form.addEventListener('reset', this.formReset);

    if (this.options.checkChange) {
      this.form.addEventListener('change', this.inputChange);
    }

    if (this.options.checkInput) {
      this.form.addEventListener('input', this.inputChange);
    }

    if (this.options.checkBlur) {
      const fields = Array.prototype.slice.call(
        this.form.querySelectorAll(
          '[data-valid]:not(:disabled):not([type="hidden"])'
        )
      );

      fields.forEach(field => {
        field.addEventListener('blur', this.inputChange);
      });
    }
  }

  unbindEvents() {
    this.form.removeEventListener('submit', this.formSubmit);
    this.form.removeEventListener('reset', this.formReset);

    if (this.options.checkChange) {
      this.form.removeEventListener('change', this.inputChange);
    }

    if (this.options.checkInput) {
      this.form.removeEventListener('input', this.inputChange);
    }

    if (this.options.checkBlur) {
      const fields = Array.prototype.slice.call(
        this.form.querySelectorAll(
          '[data-valid]:not(:disabled):not([type="hidden"])'
        )
      );

      fields.forEach(field => {
        field.removeEventListener('blur', this.inputChange);
      });
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

    elements.forEach(element => {
      if ('Validator' in element) {
        const self = element.Validator;

        self.unbindEvents.call(self);

        self.form.Validator = null;
        delete self.form.Validator;
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

    elements.forEach(element => {
      if (!('Validator' in element)) {
        element.Validator = new Validator(element, settings);
      }
    });
  }
}
