const {
    age,
    date,
    school_year
} = require('../../lib/utils')

const Student = require('../model/Student')

module.exports = {

    index(req, res) {

        Student.all(function (students) {

            return res.render('students/index', {
                students
            })
        })
    },

    create(req, res) {
        return res.render('students/create')
    },
    post(req, res) {

        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Fill all fields")
            }
        }

        Student.create(req.body, function (student) {
            return res.redirect(`students/${student.id}`)
        })

    },
    show(req, res) {
        Student.find(req.params.index, function (student) {

            if (!student) {
                return res.send('Student not found ');
            }

            student.birth = date(student.birth_date).birthDay

            student.school_year = school_year(student.school_year)

            return res.render('students/show', {
                student
            })


        })
    },
    edit(req, res) {

        Student.find(req.params.index, function (student) {

            if (!student) {
                return res.send('Student not found ');
            }

            student.birth_date = date(student.birth_date).birthDay;

            return res.render('students/edit', {
                student
            })


        })
    },
    put(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill this fild " + key)
            }

        }
        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })

    },
    delete(req, res) {
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    }


}