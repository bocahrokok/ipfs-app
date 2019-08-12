const ipfsClient = require('ipfs-http-client');
cont express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const ipfs = new ipfsClient({host: 'localhost', port: '5001', protocol: 'http'});
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

app.get('/', (req, res)=> {
    res.render('home');

});

app.post('/upload', (req,res)=> {

});


const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({path:fileName, content: file});
    const fileHash = fileAdded[0].hash;

    return fileHash;
}
