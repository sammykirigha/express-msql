const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResults } = require('express-validator')
const conn = require('../db/dbConnecions')

exports.login = async (req, res, next) => {
    const errors = validationResults(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const [row] = await conn.execute(
            "SELECT * FROM 'users' WHERE 'email'=?",
            [req.body.email]
        );
        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            })
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password)
        if (!passMatch) {
            return res.status(422).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({ id: row[0].id }, 'my -super-strong-secret', { expiresIn: '1h' })
        
        return res.json({
            token: token
        })
    } catch (err) {
        next(err)
    }
}