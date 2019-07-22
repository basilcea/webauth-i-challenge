const md5 = require("md5");
const uuid = require("uuid");
const crypted = {
  hashPassword(cryptMethod, password, times) {
    return cryptMethod.hashSync(password, times);
  },
  comparePassword(cryptMethod, password, hashPassword) {
    return cryptMethod.compareSync(password, hashPassword);
  },
  isUniqueEmail(columnValue, query) {
    if (query.length === 0 || query.map(a => a.username).includes(columnValue) === false) {
      return false;
    }
    else return true
  }
};

const customCrypt = {
  hashSync(password, times, salt) {
    const sauce = salt || uuid();
    let hash;
    const firstHash = md5(`${sauce}$${times}$${password}`);
    for (let i = 0; i < 2 ** times; i++) {
      hash = `$${sauce}$${times}$${md5(firstHash)}`;
    }

    return hash;
  },
  compareSync(password, hashPassword) {
    const passwordArray = hashPassword.split("$");
    const salt = passwordArray[1];
    const times = passwordArray[2];
    const encryptedPassword = customCrypt.hashSync(password, times, salt);
    return encryptedPassword === hashPassword ? true : false;
  }
};
module.exports = {
  crypted,
  customCrypt
};
