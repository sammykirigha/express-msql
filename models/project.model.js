
const query = require('../db/dbConnecions');
const { multipleColumnset } = require('../utils/common.utils');

class ProjectModel {
    tableName = 'projects';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql)
        }

        const { columnSet, values } = multipleColumnset(params);
        sql += `WHERE ${columnSet}`;

        return await query(sql, [...values])
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnset(params);

        const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0]
    }

    create = async ({ project_id, project_name, proj_duration }) => {
        const sql = `INSERT INTO ${this.tableName}
        (project_id, project_name, proj_duration) VALUES (?,?,?)`;

        const result = await query(sql, [project_id, project_name, proj_duration]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnset(params);

        const sql = `UPDATE projects SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        const result = await query(sql, [id])
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new ProjectModel;