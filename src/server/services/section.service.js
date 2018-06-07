const SectionModel = require('../models/section.model');

function addSectionService(app) {
  app.post('/api/section', createSection);
  app.get('/api/section/:sectionId', findSection);
  app.put('/api/section/:sectionId', updateSection);
  app.delete('/api/section/:sectionId', removeSection);
  app.get('/api/course/:courseId/sections', findCourseSections);

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
  SectionModel
    .findById(req.params.sectionId)
    .exec((err, section) => {
      if (err) {
        res.status(400).json({error: err.message});
      } else if (!section) {
        res.status(404).json({error: 'Not found'});
      } else {
        res.json(section);
      }
    });
}

function updateSection(req, res) {
  SectionModel
    .findByIdAndUpdate(req.params.sectionId, req.body, {new: true})
    .exec((err, section) => {
      if (err) {
        res.status(400).json({error: err.message});
      } else if (!section) {
        res.status(404).json({error: 'Not found'});
      } else {
        res.json(section);
      }
    });
}

function removeSection(req, res) {
  SectionModel
    .findByIdAndDelete(req.params.sectionId)
    .exec(err => {
      if (err) {
        res.status(400).json({error: err.message});
      } else {
        res.json({})
      }
    });
}

function findCourseSections(req, res) {
  SectionModel
    .find({courseId: req.params.courseId})
    .exec((err, sections) => {
      if (err) {
        res.status(400).json({error: err.message});
      } else {
        res.json(sections);
      }
    });
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
