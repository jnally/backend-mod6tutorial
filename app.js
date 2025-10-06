const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const Song = require("./models/songs");

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
