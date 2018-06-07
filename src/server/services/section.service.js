const SectionModel = require('../models/section.model');

function addSectionService(app) {
  app.post('/api/section', createSection);
  app.get('/api/section/:sectionId', findSection);
  app.put('/api/section/:sectionId', updateSection);
  app.delete('/api/section/:sectionId', removeSection);
  app.get('/api/course/:courseId/section', findCourseSections);

  // debug
  app.get('/api/section', findAllSections);
}

function createSection(req, res) {
  SectionModel.create(req.body, (err, section) => {
    if (err) {
      res.status(400).json({error: err.message});
    } else {
      res.json(section);
    }
  });
}

function findSection(req, res) {
}

function updateSection(req, res) {
}

function removeSection(req, res) {
}

function findCourseSections(req, res) {
}

function findAllSections(req, res) {
  SectionModel
    .find()
    .exec((err, sections) => {
      if (err) {
        res.status(400).json({error: err.message});
      } else {
        res.json(sections);
      }
    });
}

module.exports = addSectionService;
