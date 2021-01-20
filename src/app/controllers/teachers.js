const {
    age,
    date,
    education
} = require('../utils')

module.exports = {

    index(req, res) {

        let teachers = data.teachers.map(function (teacher) {
            const newTeacher = {
                ...teacher,
                services: teacher.atuation.split(",")
            }
            return newTeacher;
        });


        return res.render('teachers/index', {
            teachers
        })
    },

    create(req, res) {
        return res.render('teachers/create')
    },
    post(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Fill all fields")
            }
        }

    },
    show(req, res) {
        return
    },
    edit(req, res) {

        return
    },
    put(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Fill all fields")
            }
        }

    },
    delete(req, res) {
        return
    }


}


