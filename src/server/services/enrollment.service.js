const SectionModel = require('../models/section.model');

function addEnrollmentService(app) {
  app.post('/api/section/:sectionId/enrollment/:studentId', enrollStudent);
  app.delete('/api/section/:sectionId/enrollment/:studentId', unenrollStudent);
  app.get('/api/student/:studentId/sections', findStudentEnrollments);
}

function enrollStudent(req, res) {
  SectionModel
    .findById(req.params.sectionId)
    .exec((err, section) => {
      if (err) {
        res.status(400).json({error: err.message});
      } else {
        const remainingSeats = section.maxSeats - section.enrollments.length;
        if (remainingSeats > 0) {
          const index = section.enrollments.indexOf(req.params.studentId);
          if (index === -1) {
            section.enrollments.push(req.params.studentId);
            section.save((err, updatedSection) => {
              if (err) {
                res.status(400).json({error: err.message});
              } else {
                res.json(updatedSection);
              }
            });
          } else {
            res.status(400).json({error: 'Cannot enroll the same student twice'});
          }
        } else {
          res.status(400).json({error: 'No seats avaialble'});
        }
      }
    });
}

function unenrollStudent(req, res) {
  SectionModel
    .findById(req.params.sectionId)
    .exec((err, section) => {
      if (err) {
        res.status(400).json({error: err.message});
      } else {
        const index = section.enrollments.indexOf(req.params.studentId);
        if (index !== -1) {
          section.enrollments.splice(index, 1);
          section.save((err, updatedSection) => {
            if (err) {
              res.status(400).json({error: err.message});
            } else {
              res.json(updatedSection);
            }
          });
        } else {
          res.json(section);
        }
      }
    });
}

function findStudentEnrollments(req, res) {
  SectionModel
    .find({enrollments: req.params.studentId})
    .exec((err, sections) => {
      if (err) {
        res.status(400).json({error: err.message});
      } else {
        res.json(sections);
      }
    });
}

module.exports = addEnrollmentService;
