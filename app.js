//if app is not in production mode
if(process.env.NODE_ENV!=='production'){
  require('dotenv').config()
}
//packages
const express = require('express')
const PORT = 4000
const cors = require('cors')
const multer = require('multer');
const fileUpload = require('express-fileupload');

var intformat = require('biguint-format')
    , FlakeId = require('flake-idgen')

   


var __dirname='E://Work/TextBraille/textbraille/src/components/'
//set up app
var app = express()
app.use(cors())
var allowlist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(express.static('public'));
app.use(fileUpload());

app.listen((4000),()=>console.log(`TextBraille File Uploader Handler started at ${PORT}`))

app.get('/',function (req, res) {
  console.log(`TextBraille File Uploader Handler ${'get /'}  accessed`)
 })


app.post('/PostFile',cors(corsOptionsDelegate),function(req,res){
  
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
}
    // accessing the file
const myFile = req.files.file;
if(myFile){
  console.log('File has been read')
}
else{
  console.log("File hasn't been read")
}
var ext = (myFile.name).substring((myFile.name).lastIndexOf(".") + 1);
var flakeIdGen1 = new FlakeId();
    var filename =intformat(flakeIdGen1.next(), 'dec');
        filename=filename + '.'+ext

//  mv() method places the file inside public directory
myFile.mv(`${__dirname}/files/${filename}`, function (err) {
    if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
    }
    
    // returing the response with file path and name
    return res.send({name: filename, path: `/${filename}`});
});
})
 
