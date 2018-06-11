const UserModel = require('../models/user.model');

function addUserService(app) {
  app.post('/api/register', createUser);
  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.get('/api/loggedIn', loggedIn);
  app.get('/api/profile', getLoggedInUser);
  app.put('/api/profile', updateLoggedInUser);
  app.delete('/api/profile', deleteUser);

  // debug
  app.get('/api/user', findAllUsers);
}

function createUser(req, res) {
  UserModel.create(req.body, (err, user) => {
    if (err) {
      res.status(400).json({error: err.message});
    } else {
      req.session.userId = user._id;
      res.json(user);
    }
  });
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

function loggedIn(req, res) {
  if (req.session.userId) {
    res.json({userId: req.session.userId});
  } else {
    res.status(401).json({error: 'Not logged in'});
  }
}

function getLoggedInUser(req, res) {
  if (req.session.userId) {
    UserModel
      .findById(req.session.userId)
      .exec((err, user) => {
        if (err) {
          res.status(400).json({error: err.message});
        } else if (!user) {
          res.status(404).json({error: 'Not found'});
        } else {
          res.json(user);
        }
      });

  } else {
    res.status(401).json({error: 'Not logged in'});
  }
}

function updateLoggedInUser(req, res) {
  if (req.session.userId) {
    UserModel
      .findByIdAndUpdate(req.session.userId, req.body, {new: true})
      .exec((err, user) => {
        if (err) {
          res.status(400).json({error: err.message});
        } else if (!user) {
          res.status(404).json({error: 'Not found'});
        } else {
          res.json(user);
        }
      });
  } else {
    res.status(401).json({error: 'Not logged in'});
  }
}

function deleteUser(req, res) {
  if (req.session.userId) {
    UserModel
      .findByIdAndDelete(req.session.userId)
      .exec(err => {
        if (err) {
          res.status(400).json({error: err.message});
        } else {
          res.json({})
        }
      });
  } else {
    res.status(401).json({error: 'Not logged in'});
  }
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
