const {
    age,
    date,
    education
} = require('../../lib/utils')

const Teacher = require('../model/Teacher')

module.exports = {

    index(req, res) {

        // let teachers = data.teachers.map(function (teacher) {
        //     const newTeacher = {
        //         ...teacher,
        //         services: teacher.atuation.split(",")
        //     }
        //     return newTeacher;
        // });


        Teacher.all(function (teachers) {
            return res.render('teachers/index', {
                teachers
            })
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

        Teacher.create(req.body, function (teacher) {
            return res.redirect(`teachers/${teacher.id}`)
        })

    },
    show(req, res) {
        Teacher.find(req.params.index, function (teacher) {

            if (!teacher) {
                return res.send('Teacher not found ');
            }

            teacher.age = age(teacher.birth_date)

            teacher.subjects_taught = teacher.subjects_taught.split(',')

            teacher.education_level = education(teacher.education_level)

            teacher.created_at = date(teacher.created_at).format

            return res.render('teachers/show', {
                teacher
            })


        })
    },
    edit(req, res) {

        Teacher.find(req.params.index, function (teacher) {

            if (!teacher) {
                return res.send('Teacher not found ');
            }

            teacher.birth_date = date(teacher.birth_date).iso;

            return res.render('teachers/edit', {
                teacher
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
        Teacher.update(req.body, function(){
            return res.redirect(`/teachers/${req.body.id}`)
        })

    },
    delete(req, res) {
        Teacher.delete(req.body.id, function(){
            return res.redirect(`/teachers`)
        })
    }


}