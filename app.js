const express = require("express");
const Song = require("./models/song");
const User = require("./models/user");

var cors = require('cors')

const app = express();
app.use(cors());

// Middleware that parses HTTP requests with JSON body
app.use(express.json());

const router = express.Router();

const secret = "thesecret";

router.post("/user", async(req,res) =>{
   if(!req.body.username || !req.body.password){
      res.status(400).json({error: "Missing username or passwword"})
   }

   //create a hash to encrypt the password
   const hash = bcrypt.hashSync(req.body.password, 10)
   const newUser = await new User({
      username: req.body.username,
      password: hash,
      status: req.body.status
   })
   try{
      await newUser.save()
      res.sendStatus(201) //created
   }
   catch(err){
      res.status(400).send
   }
});


router.post("/auth", async(req,res) =>{
   if(!req.body.username || !req.body.password){
      res.status(401).json({error: "Missing username or password"})
      return
   }
   //find the user in the database
   try{
      const user = await User.findOne({username: req.body.username})
      if (!user){
         res.status(401).json({error: "User not found"})
     
      }
      else{
         //check the username and password to see if they match
        if(bcrypt.compareSync(req.body.password,user.password)){
            //create a token
            const token = jwt.encode({username: user.username}, secret)
            res.json({token: token, username: user.username, userID: user._id})
         }
         else{
            res.status(401).json({error: "Invalid password"})
         }
      }
   }
   catch(err){
      res.status(400).send(err.message)
   }
});


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

});

router.get("/songs/:id", async (req,res) =>{
   try{
      const song = await Song.findById(req.params.id)
      res.json(song)
   }
   catch (err){
      res.status(400).send(err)
   }
});

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

router.put("/songs/:id", async(req,res) =>{
   try{
      const song = req.body
      await Song.updateOne({_id: req.params.id},song)
      console.log(song)
      res.sendStatus(204)


   }
   catch(err){
      res.status(400).send(err)
   }
});

router.delete("/songs/:id", async(req,res) =>{
   try{
      const song = await Song.findById(req.params.id)
      console.log(song)
      await Song.deleteOne({_id: song._id})
      res.sendStatus(204) //deleted status code
   }
   catch(err){
      res.status(400).send(err)
   }
});

router.put("/playlist", async(req,res) =>{
   try{
      const user = await User.findById(req.body.userID)
      await user.updateOne({$push: {playlist: req.body.songID}})
      console.log(user)
      
      
      res.sendStatus(204)
   }
   catch(err){
      res.status(400).send(err)
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