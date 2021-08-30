const jwt = require('jsonwebtoken');
const conn = require('../db/dbConnecions')

exports.getUser = async (req, res, next) => {
    try {
        if (
            !req.headers.authorizarion ||
            !req.headers.authorizarion.startsWith('Bearer') ||
            !req.headers.authorizarion.split(' ')[1]
        ) {
            return res.status(422).json({
                message: "Please provide the token"
            })
        }

        const token = req.headers.authorizarion.split(' ')[1];
        const decoded = jwt.verify(token, 'my -super-strong-secret')

        const [row] = await conn.execute(
            "SELECT 'id', 'name', 'email', FROM 'users' WHERE 'id'=?",
            [decoded.id]
        )

        if (row.length > 0) {
            return res.json({
                user: row[0]
            })
        }

        res.json({
            message: "No user found"
        })
    } catch (err) {
        next(err)
    }
}