const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const dotenv = require('dotenv').config();
const PASSWORD = process.env.PASSWORD;


const encoder = async (password) => {
    let iv = crypto.randomBytes(16);
    let salt = crypto.randomBytes(16);
    let key = crypto.scryptSync(PASSWORD, salt, 32);

    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${salt.toString("hex")}:${encrypted}`;
}

const decoder = async (hashPassword) => {
    let [ivs, salts, data] = hashPassword.split(":");
    let iv = Buffer.from(ivs, "hex");
    let salt = Buffer.from(salts, "hex");
    let key = crypto.scryptSync(PASSWORD, salt, 32);

    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted.toString();
}

module.exports = { encoder,decoder };