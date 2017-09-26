var express = require('express');
var router = express.Router();
var task = require('./../model/tasks');
var multer  = require('multer')
var db = require('./../lib/con.js');
/* GET home page. */

router.get('/', function(req, res) {
		task.getAllTasks(function(err, rows, fields){
			if(err){res.json(err);}
			else{
			res.render('index', { title: 'ACR122u - NFC Presence control', task: rows});
			}
		});
});

/* delet. */
router.get('/:id', function(req, res) {
	task.deletTasks(req.params.id, function(err, count){
		if(err){
			res.json(err);
		}else{
			res.redirect('/');
	}
  });
});

/* upload and post users. */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
	  cb(null, file.originalname)
	  var post = req.body;
	  db.query('INSERT INTO workers SET ?',{rfid: post.rfid,nome: post.nome, dept: post.depto, turno: post.turno, email: post.email, foto: file.originalname});
	}
})

var upload = multer({ storage: storage })

router.post('/post', upload.any('image'), function (req, res) {
		  res.redirect('/');
})

module.exports = router;
