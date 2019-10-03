/* Validator methods */
export default {
  required(obj, validate) {

    let isCheck = true;

    switch (obj.el.type) {
      case 'checkbox':
        isCheck = obj.el.checked;
        break;

      case 'radio':
        const radioBtns = validate.form.querySelectorAll(`[type="radio"][name="${obj.el.name}"]:checked`);
        isCheck = radioBtns.length === 1;
        break;

      case 'select':
      case 'select-one':
      case 'select-multiple':
        isCheck = obj.el.value !== '';
        break;

      default:  {
        if (obj.el.type === 'password') {
          isCheck = obj.el.value !== '';
        } else {
          isCheck = obj.el.value.trim() !== '';
        }
      }
    }

    return isCheck || obj.i18n.required;
  },
  minLen(obj) {
    return obj.el.value.length >= obj.param || obj.i18n.minLen.replace('%s%', obj.param);
  },
  maxLen(obj) {
    return obj.el.value.length <= obj.param || obj.i18n.maxLen.replace('%s%', obj.param);
  },
  email(obj) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(obj.el.value) || obj.i18n.email;
  },
  equalTo(obj, validate) {
    const equalVal = validate.form.querySelector('[name=' + obj.param + ']');
    if (!equalVal) return;

    const val = equalVal.value.trim();
    return val === obj.el.value || obj.i18n.equalTo;
  },
  url(obj) {
    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(obj.el.value) || obj.i18n.url;
  },
  number(obj) {
    return /^(\d+|\.?\d+)$/.test(obj.el.value) || obj.i18n.number;
  },
  regex(obj, validate) {
    const method = validate.options.validators.regex[obj.param];

    return new RegExp(method.pattern).test(obj.el.value) || method.error;
  }
};
