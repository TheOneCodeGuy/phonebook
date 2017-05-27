var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname));

var Schema = mongoose.Schema;
var contactSchema = new Schema({
	name : {required : true, type : String},
	phno : {required : true, type : Number, unique : true},
	email : {type : String, required : true, unique :true}
});
var contactModel = mongoose.model('contactModel', contactSchema);

mongoose.connect('mongodb://localhost/contactList');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/contactList', function(req, res){
	contactModel.find(function(err, contacts){
		res.json(contacts);
	});
});

app.post('/contactList', function(req, res){
	contactModel.create(req.body, function(err, contact){
		res.json(contact);
	});
});

app.put('/contactList/:id', function(req, res){
	contactModel.findByIdAndUpdate(req.params.id, req.body , function(err, contact){
		res.json(contact);
	});
});

app.delete('/contactList/:id', function(req, res){
	contactModel.remove({_id : req.params.id}, function(err, contact){
		res.json(contact);
	});
});

app.listen(8080);
console.log("Listening at Port : 8080");
