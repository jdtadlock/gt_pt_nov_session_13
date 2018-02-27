var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 5000;
var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gt_pt_13'
});

db.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();

// console.log(path.join(__dirname, 'views/index.html'));

var app = express(); // self instantiating constructor

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});


// Get all the notes from the database and send them to the front
app.get('/api/notes', function(request, response) {
  db.query('SELECT * FROM notes', function(err, results) {
    if ( err ) return console.log(err);

    response.send(results);
  });
});

app.post('/api/notes', function(request, response) {
  db.query('INSERT INTO notes SET ?', request.body, function(err, result) {
    if ( err ) return console.log(err);

    response.send(result);
  })
});


app.listen(port, function() {
  console.log('Listening on ' + port);
});



var test = false;

// if ( test ) {
//   console.log('yep');
//   console.log('something else');
// } else console.log('nope');

















// 0, null, '', NaN, undefined, false
// var test = 'something' || '' || null || 55;

// console.log(test);



// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// var jd = new Person('JD', 38);
// console.log(jd);