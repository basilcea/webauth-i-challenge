const md5 = require("md5");
const uuid = require("uuid");
const crypted = {
  hashPassword(cryptMethod, password, times) {
    return cryptMethod.hashsync(password, times);
  },
  comparePassword(cryptMethod, password, hashPassword) {
    return cryptMethod.compareSync(password, hashPassword);
  },
  isUniqueEmail(columnValue, query) {
    const allValues = query.rows.map(a => a.username);
    console.log('here')
    if (query.length === 0 || allValues.includes(columnValue) === false) {
      return 0;
    }
  }
};

const customCrypt = {
  hashsync(password, times, salt) {
    const sauce = salt || uuid();
    let hash;
    const firstHash = md5(`${sauce}$${times}$${password}`);
    for (let i = 0; i < 2 ** times; i++) {
      hash = md5(firstHash);
      console.log(hash)
    }

    return hash;
  },
  compareSync(password, hashPassword) {
    const passwordArray = hashPassword.split("$");
    const salt = passwordArray[0];
    const times = passwordArray[1];
    const encryptedPassword = customCrypt.hashsync(password, times, salt);
    return encryptedPassword === hashPassword ? true : false;
  }
};
module.exports = {
  crypted,
  customCrypt
};
