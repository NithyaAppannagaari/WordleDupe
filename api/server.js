
//csvtojson: comprehensive node js CSV parser to convert CSV
//to JSON or column arrays

// import csvtojson and mongodb
const csvtojson = require('csvtojson');
const mongodb = require('mongodb'); 

// define the URL of remote MongoDB instance
var url = 'mongodb://127.0.0.1:27017/SampleDb';

// establish a connection to the database
var dbConn;

var word = '';

function connectToDatabase(getWord) {
    mongodb.MongoClient.connect(url, {}).then((client) => {
        console.log('DB Connected!');
        dbConn = client.db();
        getWord();
       // console.log(getWord());
        //console.log(dbConn);
    }).catch(err => {
        console.log('DB Connection Error: ' + err.message);
    });
    
};

const express = require("express") // express.js is a package within NodeJS specializing in website applications
const app = express()
const cors = require('cors');
app.use(
    cors()
);
app.use(express.json({extended: false}));

app.get('/hello', (req,res) => {
    console.log("in here");
    getWord();
    res.send({'value':word});
})

app.get("", (req, res) => {
    res.send("404 URL NOT FOUND");
 });

/* This is an example of how to handle an HTTP POST request */
app.post('/', (req,res) =>{
    console.log(req.body);
    res.json("nithya");
})

/* This is necessary. This is basically telling your app to start listening for requests from the client on your specific address and port. */
app.listen(3001, () => {
    console.log("app listening on port 3001")
})

// we are pushing all the 5 letter words into the database so that once a word is randomly chosen one day, it will be removed from the database
// instead of editing the CSV file locally, we will be modifying the online database. the online database will contain all words that
// have not been chosen yet. 

// now, we will fetch the CSV file and insert all the rows into our database.

function uploadCSVtoDb () {
    // first clear the database
    dbConn.dropDatabase();

    const fileName = "5_letters.csv";

    var arrayToInsert = [];
    csvtojson().fromFile(fileName).then(source => {
        for (var i = 0; i < source.length; i++)
        {
            var oneRow = {
                firstLetter: source[i][1],
                secondLetter: source[i][2],
                thirdLetter: source[i][3],
                fourthLetter: source[i][4],
                fifthLetter: source[i][5]
            };
            arrayToInsert.push(oneRow);
        }
    
        //inserting all documents into the table "words" in the database
        var collectionName = 'words';
        var collection = dbConn.collection(collectionName);
        collection.insertMany(arrayToInsert, (err, result) => {
            if(err) console.log(err);
            if(result) {
                console.log("imported CSV into database successfully.");
            }
        });
    });
};        

function getWord () {
/**
 * get all the _ids, choose a random one
 * query for the object that has that objectId 
 */
    let collection =  dbConn.collection('words');
    let numWords = collection.countDocuments({});
    numWords.then(function(number) {
        let allWords = collection.find({}, {_id: 0}).toArray();
        allWords.then(function(options) {
            const index = Math.floor(Math.random()*number)
            word = options[index];
            delete word._id;
            console.log(word);
        })
    })
}

connectToDatabase(getWord); // passing in getWord as it is a callback function, and will only run once connectToDatabase is completed with its task (to prevent the method from running when database hasnt been connected yet)

//console.log(getWord());



/**
 * Next, we will create a function that handles all reading from MongoDB database and can
 * remove words from the MongoDB database
 */


/**
 * Data is shown in Mongosh --> commandline for Mongodb
 * 
 * To access the database/collection we want to use:
 * 1) show dbs
 * 2) use <db name> //(for us, it is SampleDb)
 * 3) show collections
 * 
 * afterwards, choose our collection (which is words), and type the following to see all contents of that collection
 * 4) db.<collectionName>.find() //db.words.find()
 */