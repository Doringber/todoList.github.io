var express = require('express')
const axios = require('axios');
var cors = require('cors')  //use this
var app = express()

app.use(cors()) //and this
app.use(cors({
    origin: '*'
}));

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/user/',cors(),function (req, res, next) {


    https.get('https://jsonplaceholder.typicode.com/todos/1', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

    }).on('error', (e) => {
    console.error(e);
    });

  res.json({user: res.statusCode})
})

app.listen(5001, function () {
  console.log('CORS-enabled web server listening on port 5000')
})