const { getDB } = require('../config/db');

class User {
  static findByEmailAndRole(email, password, role, callback) {
    const db = getDB();
    const query = `SELECT * FROM users WHERE email=? AND password=? AND role=? AND is_deleted=0`;
    db.query(query, [email.trim(), password, role], callback);
  }
}

module.exports = User;