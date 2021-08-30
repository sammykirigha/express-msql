const query = require('../db/dbConnecions');
const { multipleColumnset } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');

class UserModel {
    tableName = 'users';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnset(params)
        sql += `WHERE ${columnSet}`;

        return await query(sql, [...values])
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnset(params)
        
        const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;
        
        const result = await query(sql, [...values]);

        return result[0]
    }

    create = async ({ username, password, first_name, last_name, email, role = Role.SuperUser, age = 0 }) => {
        const sql = `INSERT INTO ${this.tableName}
        (username, password, first_name, last_name, email, role, age ) VALUES (?,?,?,?,?,?,?)`;

        const result = await query(sql, [username, password, first_name, last_name, email, role, age]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnset(params);

        const sql = `UPDATE users SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }
id
    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await query(sql, []);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel