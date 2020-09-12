const crypto = require('crypto');

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash('sha256');

    // получение hash
    hash.update(inputs.sort().join(' '));

    // 16-ричная система
    return hash.digest('hex');
};


module.exports = {cryptoHash};