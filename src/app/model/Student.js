const {
    age,
    date,
    education
} = require('../../lib/utils')

const db = require('../../../config/db')

module.exports = {
    all(callback) {
        db.query('SELECT * FROM students ', function (err, results) {

            if (err) {
                throw (`Database error: ${err}`)
            }

            callback(results.rows)
        });
    },
    create(data, callback) {

        const query =
            `INSERT INTO students( 
             name,
            avatar_url,
            birth_date,
            school_year,
            email,
            week_hours
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
         `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth_date).iso,
            data.school_year,
            data.email,
            data.week_hours
        ]

        db.query(query, values, function (err, results) {
            if (err) {
                throw (`Database error: ${err}`)
            }

            callback(results.rows[0])
        })

    },

    find(id, callback) {
        db.query('SELECT * FROM students WHERE id = $1', [id], function (err, results) {
            if (err) {
                throw (`Database error: ${err}`)
            }

            callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
            UPDATE students SET
            name = ($1),
            avatar_url = ($2),
            birth_date = ($3),
            school_year = ($4),
            email = ($5),
            week_hours = ($6)
        WHERE id = $7
        `

        const values = [
            data.name,
            data.avatar_url,
            data.birth_date,
            data.school_year,
            data.email,
            data.week_hours,
            data.id
        ]

        db.query(query, values, function (err, result) {
            if (err) {
                throw (`Database Error  ${err}`)
            }

            return callback()
        })
    },
    delete(id, callback) {
        db.query('DELETE FROM students WHERE id = $1', [id], function (err, result) {
            if (err) {
                throw (`Database Error  ${err}`)
            }

            return callback()
        })
    }
}