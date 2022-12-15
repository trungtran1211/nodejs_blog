const Course =  require('../models/Course');

class MeController {

    // [GET] /stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}).lean(), Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    courses
                    })
                )
            .catch (next);
    }
      // [GET] /me/trash/courses
      trashCourses(req, res, next) {
        Course.findDeleted().lean()
        .then(courses => res.render('me/trash-courses', {courses}))
        .catch (next);
       
    }
}

module.exports = new MeController;