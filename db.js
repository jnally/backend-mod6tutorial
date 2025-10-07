const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://jnally:lampcupdoor@songdb.zlm1mv2.mongodb.net/?retryWrites=true&w=majority",
    {useNewUrlParser: true});

module.exports = mongoose;

