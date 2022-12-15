const Course = require('../models/Course')
class CourseController {

    // [GET] /corses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug}).lean()
        .then(course => {
            res.render('courses/show', {course});
        })
        .catch(next);
    }

       // [GET] /corses/create
       create(req, res, next) {
            res.render('courses/create');
        }

       // [POST] /corses/store
       store(req, res, next) {
            // const formData = req.body;
            // formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
            const course = new Course(req.body);
            course.save()
                .then(() => res.redirect('/me/stored/courses'))
                .catch(error => {
                });
        }

        // [GET] /corses/:id/edit
       edit(req, res, next) {
            Course.findById(req.params.id).lean()
            .then(courses =>  res.render('courses/edit', {courses}))
            .catch(next);
        }

         // [PUT] /corses/:id
        update(req, res, next) {
            Course.updateOne({_id: req.params.id}, req.body)
            .then(()=>res.redirect('/me/stored/courses'))
            .catch(next)
        }

        // [DELETE] /corses/:id
        delete(req, res, next) {
            Course.delete({_id: req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
        }

          // [PATCH] /corses/:id/restore
          restore(req, res, next) {
            Course.restore({_id: req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
        }

         // [DELETE] /corses/:id/forceDelete
         forceDelete(req, res, next) {
            Course.deleteOne({_id: req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
        }
}

module.exports = new CourseController;