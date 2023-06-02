var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});
var uploadIPFS = require('./upload-ipfs');
var app = express();

app.get('/', async(req, res) => {
    res.sendFile(__dirname + '/upload.html');
});

const PATH = 'uploads/';

app.post('/file', upload.single('doc'), async function(req, res, next){
    try{
        const file = req.file;

        if(!file){
            res.status(400).send({
                status: false,
                data: 'No file is selected.'
            })
        } else{
            try{
            var HASH = await uploadIPFS(PATH + req.file.filename);

            console.log(HASH);

        }catch (err) {
            console.log('Error en uploadIPFS:');
            console.log(err);
            return false;
          }
          
        }
    }
    catch (err){
        res.status(500).send({ status: 'error', error: err.message });
    }
})

const port = 8888;

app.listen(port, () => 
    console.log('Escuchando...')
);