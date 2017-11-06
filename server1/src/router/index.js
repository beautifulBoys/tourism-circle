var User = require('../model/user.js');
var Id = require('../model/id.js');

var router = (app) => {
  app.post('/register', function (req, res) {
    new User({
      username: req.body.username,
      password: req.body.password
    }).save(function () {
        res.send({code: 200, message: 'ok', data: {}});
    });
  });
}

module.exports = router;
