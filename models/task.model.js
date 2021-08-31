const { param } = require('express-validator');
const query = require('../db/dbConnecions');
const { multipleColumnset } = require('../utils/common.utils');

class TaskModel {
    tableName = 'tasks';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(parama).length) {
            return await query(sql)
        }

        const { columnSet, values } = multipleColumnset(params);
        sql += `WHERE ${columnSet}`;

        return await query(sql, [...values])
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnset(params);

        const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;

        const result = await query(sql, [...values])

        return result[0]
    }

    create = async ({ task_id, task_name, project_id, user_id }) => {
        const sql = `INSERT INTO ${this.tableName}
        (task_id, task_name, project_id, user_id) VALUES (?,?,?,?)`;

        const result = await query(sql, [task_id, task_name, project_id, user_id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnset(params);

        const sql = `UPDATE tasks SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id])

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new TaskModel;