const validationResult = require('express-validator').validationResult;
const bcrypt = require('bcryptjs');
const connection = require('../db/dbConnecions')


exports.register = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
    }

    try {
        const data = await connection.query(
            `select email from users where email=?`,
            [req.body.email]
        );
        console.log(data);
            console.log("acced")
        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use"
            })
        }
        console.log("am here");
        const hashPass = await bcrypt.hash(req.body.password, 12);

        const [rows] = await connection.query(
            "INSERT INTO 'users'('name', 'email', 'password') VALUES(?,?,?)", [
            req.body.name,
            req.body.email,
            hashPass
        ]
        );

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted",
            })
        }
    } catch (err) {
        next(err)
    }
}