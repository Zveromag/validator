const Validator = {
  required(obj) {
    return obj.el.value.trim() !== '' || ERRORS[obj.lang].required;
  },
  minLen(obj) {
    return obj.el.value.length >= obj.param || ERRORS[obj.lang].minLen.replace('%s%', obj.param);
  },
  maxLen(obj) {
    return obj.el.value.length <= obj.param || ERRORS[obj.lang].maxLen.replace('%s%', obj.param);
  },
  email(obj) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(obj.el.value) || ERRORS[obj.lang].email;
  },
  phone(obj) {
    return /^\d[\d\(\)\ -]{4,14}\d$/.test(obj.el.value) || ERRORS[obj.lang].phone;
  },
  equalTo(obj) {
    var equalVal = form.querySelector('[name=' + obj.el.param + ']').value;

    return equalVal === obj.el.value || ERRORS[obj.lang].equalTo;
  },
  number(obj) {
    return /^(\d+|\.?\d+)$/.test(obj.el.value) || ERRORS[obj.lang].number;
  },
};

const ERRORS = {
  ru: {
    required: 'Данное поле обязательно для заполнения',
    minLen: 'Минимально допустимое количество символов равно %s%',
    maxLen: 'Максимально допустимое количество символов равно %s%',
    email: 'Поле e-mail имеет неверный формат',
    phone: 'Телефонный номер имеет неверный формат',
    number: 'Введенные данные должны быть числом',
    equalTo: 'Введенные данные не совпадают'
  },
  en: {
    required: 'This field is required',
    minLen: 'The minimum number of characters allowed is %s%',
    maxLen: 'The maximum allowed number of characters is %s%',
    email: 'The e-mail field has the wrong format',
    phone: 'The phone number is not in the correct format',
    number: 'The entered data must be a number',
    equalTo: 'The entered data does not match'
  }
};

const DEFAULTS = {
  lang: 'ru',
  onSuccess: function () { },
  onError: function () { }
};

const RULES = new RegExp(/^(minLen|maxLen|phone|required|password|email)\((\w{1,20})\)/i);

class Validate {
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
      const data = el.dataset.valid;
      let errors = '';
      const tmp = {
        el: el,
        lang: this.options.lang,
        error: errors
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
            errors += `${state}<br>`;
          }
        }
      }
      if (errors !== '') {
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

window.Validate = Validate;
