const UserModel = require('../models/user.model');

function addUserService(app) {
  app.post('/api/user', createUser);
  app.delete('/api/user/:userId', deleteUser);
  app.post('/api/login', login);
  app.post('/api/logout', logout);

  // debug
  app.get('/api/user', findAllUsers);
}

function createUser(req, res) {
  UserModel.create(req.body, (err, user) => {
    if (err) {
      res.status(400).json({error: err.message});
    } else {
      res.json(user);
    }
  });
}

function deleteUser(req, res) {
  const userId = req.params.userId;
  if (req.session.userId === userId) {
    UserModel.deleteOne({_id: userId}, err => {
      if (err) {
        res.status(400).json({error: err.message});
      } else {
        res.json({})
      }
    });
  } else {
    res.status(401).json({error: 'Unauthorized'});
  }
}

function login(req, res) {
  if (req.body && req.body.username && req.body.password) {
    UserModel
      .findOne({
        username: req.body.username,
        password: req.body.password,
      })
      .exec((err, user) => {
        if (err) {
          res.status(400).json({error: err.message});
        } else if (!user) {
          res.status(404).json({error: 'Not found'});
        } else {
          req.session.userId = user._id;
          res.json(user);
        }
      });
  } else {
    res.status(400).json({error: 'Missing params'});
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.json({});
  });
}

function findAllUsers(req, res) {
  UserModel
    .find()
    .select({password: 0})
    .exec((err, users) => {
      if (err) {
        res.status(400).json({error: err.message});
      } else {
        res.json(users);
      }
    });
}

module.exports = addUserService;
