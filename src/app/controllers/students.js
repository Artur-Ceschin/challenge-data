const {
    age,
    date,
    school_year
} = require('../../lib/utils')

const Student = require('../model/Student')

module.exports = {

    index(req, res) {

        let {
            filter,
            page,
            limit
        } = req.query

        page = page || 1
        limit = limit || 3

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }

                return res.render('students/index', {
                    students,
                    pagination,
                    filter
                })
            }
        }

        Student.paginate(params)
    },

    create(req, res) {
        Student.studentSelectOPtions(function (option) {
            return res.render('students/create', {teacherSelectOPtions: option})
        })
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

            student.birth_date = date(student.birth_date).iso;

            Student.teacherSelectOPtions(function (option) {
                return res.render('students/edit', {student, teacherSelectOPtions: option})
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