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
    /**
     * Regex from {@link https://gist.github.com/dperini/729294}
     */
    const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    return urlRegex.test(obj.el.value) || obj.i18n.url;
  },
  number(obj) {
    return /^(\d+|\.?\d+)$/.test(obj.el.value) || obj.i18n.number;
  },
  regex(obj, validate) {
    const method = validate.options.validators.regex[obj.param];

    return new RegExp(method.pattern).test(obj.el.value) || method.error;
  }
};
