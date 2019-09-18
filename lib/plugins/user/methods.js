const config = require("../../../config");
const db = require("../../../db");
const logger = require("../../logger");
const bcrypt = require("bcryptjs");
const { isEmpty } = require("ramda");

const methods = {
  hashPassword(password) {
    try {
      return bcrypt.hashSync(password, config.password.salt);
    } catch (e) {
      logger.fatal(`failed to hash password. ${e.message}`, [password]);
      return null;
    }
  },
  async create(params) {
    const { email, name, password, role, active } = params;
    const hash = password ? hashPassword(password) : null;
    await db.knex("users").insert({
      email: email,
      name: name,
      password: hash,
      role: role,
      active: active
    });
    logger.info("user created", email);
  },
  async findOne(params) {
    const user = await db
      .knex("users")
      .where(params)
      .select()
      .limit(1)
      .first();
    return isEmpty(user) ? null : user;
  }
};

exports = module.exports = methods;
