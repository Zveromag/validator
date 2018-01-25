// import Messages from './messages';

export default {
  required(obj) {
    return obj.el.value.trim() !== '' || obj.i18n.required;
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
  phone(obj) {
    return /^\d[\d\(\)\ -]{4,14}\d$/.test(obj.el.value) || obj.i18n.phone;
  },
  equalTo(obj) {
    var equalVal = form.querySelector('[name=' + obj.el.param + ']').value;

    return equalVal === obj.el.value || obj.i18n.equalTo;
  },
  number(obj) {
    return /^(\d+|\.?\d+)$/.test(obj.el.value) || obj.i18n.number;
  },
};
