import Messages from './messages';

export default {
  required(obj) {
    return obj.el.value.trim() !== '' || Messages[obj.lang].required;
  },
  minLen(obj) {
    return obj.el.value.length >= obj.param || Messages[obj.lang].minLen.replace('%s%', obj.param);
  },
  maxLen(obj) {
    return obj.el.value.length <= obj.param || Messages[obj.lang].maxLen.replace('%s%', obj.param);
  },
  email(obj) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(obj.el.value) || Messages[obj.lang].email;
  },
  phone(obj) {
    return /^\d[\d\(\)\ -]{4,14}\d$/.test(obj.el.value) || Messages[obj.lang].phone;
  },
  equalTo(obj) {
    var equalVal = form.querySelector('[name=' + obj.el.param + ']').value;

    return equalVal === obj.el.value || Messages[obj.lang].equalTo;
  },
  number(obj) {
    return /^(\d+|\.?\d+)$/.test(obj.el.value) || Messages[obj.lang].number;
  },
};
