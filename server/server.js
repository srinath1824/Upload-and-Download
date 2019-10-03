const express = require('express');
const Promise = require("bluebird");
const bodyParser = require("body-parser");
const FileAPI = require('file-api');
var multer = require('multer');
var path = require('path');
var Blob = require('blob');
var FileSaver = require('file-saver');
//var cors = require('cors');

// const DBConfig = {
//     workflow_test:{
//         host:"172.16.6.135",
//         port: 5432,
//         database: "datamime",
//         user: "sayint",
//         password: "sayint123"
//     }
// }

function base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    // let byteCharacters = atob(b64Data);
    //let byteCharacters = Buffer.from(b64Data).toString('base64')
    let byteCharacters = Buffer(b64Data, 'base64').toString('binary');
    // console.log("111111");
    // console.log(byteCharacters)
    // console.log("111111");
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
    byteNumbers[i] = slice.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
}
console.log("111111");
console.log(byteArrays)
console.log("111111");
// var b = new Blob(byteArrays);
return byteArrays;
}

const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended: false}));
// app.use(cors());

// const initOptions = {
//     promiseLib: Promise
// };
// const pgp = require("pg-promise")(initOptions);
// let DB;

// app.get('/connect/db/:schema', (req,res) => {
//     try {
//         let schema = req.params.schema;
//         console.log(schema);
//         console.log(DBConfig[schema]);
//         if(!DBConfig[schema]) {
//             res.end({status: 400 , message: 'Connetion Error'});
//         }
//         const db = pgp(DBConfig[schema]);
//         DB = db;
//         console.log(`select * from workflow_test.dm_get_project_wrk_item_task_details('\Speech Collection'\)`);
//         let response =   DB.any('select * from workflow_test.dm_get_project_wrk_item_task_details($1)', ['Testin Dm']);
//         console.log("22222222222")
//         //console.log("Connected to Database", obj);
//         console.log("Connected to Database", response);
//         res.send({status: 200, users: response});

//     } catch (e) {
//         res.send({status: 400 , message: 'Connetion Error'});
//     }
// });

// app.get('/getList', async (req,res) => {
//     try {
//         const result = await DB.any(
//             `with t as 
//             (select 
//             distinct k.details ->> 'email' as email,k.details ->> 'age_group' as age, k.details ->> 'gender' as gender ,k.details ->> 'City' as city ,
//             k.details ->> 'State' as state,k.details ->> 'realm' as realm ,k.details ->> 'Nativity' as Nativity ,k.details ->> 'Nationality' as Nationality 
//             from base.usermeta_validated_reporting_test k
//             )
//             select json_agg(row_to_json(t)) from t`);
//             console.log(JSON.stringify(result));
//         res.end(JSON.stringify(result));
//     } catch (e) {
//         res.end(e.message);
//     }
// });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '../public')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname )
    }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', (req,res) => {
    console.log("req");
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    return res.status(200).send(req.file)
});
});

app.post('/download', (req,res) => {
    this.loading = false;
    this.msgs = [];
    let resu = ""
    for (var key in req.body) {
        resu = key
    }
    console.log(typeof resu)
    let blob = base64ToBlob(resu, 'text/plain');
    // var blob = new Blob([this.downloadResumeDetails.resumeDoc, 'application/msword']);
    console.log(blob);
    FileSaver.saveAs(blob, "../public/demo1" + ".doc");
    // var blobURL = URL.createObjectURL(blob);
    // window.open(blobURL);
    
    res.end({status: 200 , msg: "good"}, blob)
});

app.listen(4000, () => {
    console.log("Server connected on port 4000")
})