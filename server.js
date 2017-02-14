var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

  var cors = require('cors');

  app.use(cors());
    // mongoose = require('mongoose'),

// mongoose.connect('mongodb://localhost:27017/products');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.get( '/users', function ( req, res ) {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.set("Access-Control-Allow-Origin", "*");
  res.sendFile( __dirname + '/server/user.json');
} );


app.get('/usercount', function (req,res){
  res.send({count:10});
});



//Rest API's
// app.get('/api/product', productController.query);
// app.post( '/api/product', productController.create );
// app.use('/scripts', express.static( __dirname + '/client/scripts'));

app.listen( 3000, function () {
  console.log('Node app listening on port 3000');
});
