const bcrypt = require('bcrypt');

const saltRounds = 10;

//Encrypts passwords
const encryptPassword = (password) => {
    return bcrypt.hashSync(password, saltRounds);
};

//Checks passwords
const checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
    encryptPassword,
    checkPassword
};
