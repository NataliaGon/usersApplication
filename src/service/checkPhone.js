export default function  validPhone(myPhone) {
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;
    var valid = re.test(myPhone);
    if (valid) {
      return true;
    }
  }