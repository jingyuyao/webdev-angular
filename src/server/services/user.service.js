const UserModel = require('../models/user.model');

function addUserService(app) {
  app.post('/api/user', createUser);
  app.get('/api/user', findAllUsers);
}

function createUser(req, res) {
  const user = new UserModel(req.body);
  user.save(err => {
    if (err) {
      res.status(400).json({error: err.message});
    } else {
      res.json(user);
    }
  });
}

function findAllUsers(req, res) {
  UserModel
    .find()
    .select({password: 0})
    .exec((err, users) => {
      if (err) {
        res.status(400).json({error: errmessage});
      } else {
        res.json(users);
      }
    });
}

module.exports = addUserService;
