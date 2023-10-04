// Create web server
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, '..', 'data', 'comments.json');

// GET /comments
router.get('/', function(req, res, next) {
  fs.readFile(commentsPath, 'utf8', function(err, data) {
    if (err) {
      return next(err);
    }
    res.json(JSON.parse(data));
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  fs.readFile(commentsPath, 'utf8', function(err, data) {
    if (err) {
      return next(err);
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments), function(err) {
      if (err) {
        return next(err);
      }
      res.sendStatus(200);
    });
  });
});

module.exports = router;