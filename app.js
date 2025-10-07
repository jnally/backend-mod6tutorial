const express = require("express");
const Song = require("./models/song");
var cors = require('cors')

const app = express();
app.use(cors());

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

// Get list of all songs in the database
router.get("/songs", async(req,res) =>{
   try{
      const songs = await Song.find({});
      res.send(songs);
      console.log(songs);
   }
   catch (err){
      console.log(err);
   }

})

router.post("/songs", async(req,res) =>{
   try{
      const song = await new Song(req.body);
      await song.save();
      res.status(201).json(song);
      console.log(song);
   }
   catch(err){
      res.status(400).send(err);
   }
});


app.use("/api", router);

app.listen(3000);


/* const express = require("express");
const app = express();

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const Song = require("./models/song");
const router = require("express").Router();

// Get list of all songs in the database
router.get("/", async function(req, res) {
   try {
      const songs = await Song.find();
      res.json(songs);
   }
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

// Add a new song to the database
router.post("/", async function(req, res) {
   try {
      const song = new Song(req.body);
      await song.save();
      res.status(201).json(song);
   }
   catch (ex) {
      res.status(400).send(ex.message);
   }
});

app.listen(3000);*/




/* const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const Song = require("./models/song");

const app = express();
app.use(cors());

app.unsubscribe(bodyParser.json());
const router = express.Router();

// grab all the songs in a database
router.get("/songs", function(req,res){
    let query = {};
    if(req.query.genre){
        query = {genre : req.query.genre};
    }

    // to find all songs in a database you just use the find() method that is built into mongodb
    Song.find(query,function(err,songs){
        if(err){
            res.status(400).send(err);
        }
        else{
            res.json(songs);
        }
    });
});



app.use("/api", router);
app.listen(3000);
*/