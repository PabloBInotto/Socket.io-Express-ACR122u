var express = require('express');
var router = express.Router();
var task = require('./../model/tasks');
var multer  = require('multer');
var fs = require('fs');
var db = require('./../lib/con.js');
var dados = fs.readFileSync('./data.json');
var js = JSON.parse(dados);
console.log(js);

// show json data on canvas
router.get('/all', show);
function show(req, res){
	res.send(js);
}
// pudate json data
router.get('/users/:word/:score?', addWord);
function addWord(req, res){
	var data = req.params;
	var word = data.word;
	var score = data.score;
	var reply;
	if(!score){
	reply = {
			msg : "You need fill the some value to " + word
		}
	}else{
	js[word] = score;
	var data = JSON.stringify(js);
	fs.writeFile('./data.json', data, finished);
	function finished(err){
		console.log('All set');
	}
	reply = {
			msg : "You updated the " + word + " value"
		}
	}
	res.send(reply);
}
// GET users page
router.get('/users', upWord);
function upWord(req, res){
	res.render('users', { title: 'ACR122u - NFC Presence control', status: 'Set datbase'});
}


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
var photo = '';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
      photo = file.originalname;
	  
	}
})

var upload = multer({ storage: storage })

router.post('/post', upload.any('image'), function (req, res) {
    var post = req.body;
	  db.query("INSERT INTO `names` (`nome`, `foto`, `rfid`, `dept`, `turno`, `email`, `receiver`, `tax_receiver`, `pension_receiver`, `amount`, `tax_amount`, `pension_amount`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", post.nome.toString(), photo, post.rfid, post.dept, post.turno, post.email, post.receiver, post.tax_receiver, post.pension_receiver, post.amount, post.tax_amount, post.pension_amount, function(err, result){
            if(err) throw err;
                console.log("1 record inserted");
                res.redirect('/');
            });
})
module.exports = router;
