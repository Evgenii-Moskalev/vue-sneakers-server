const express = require('express');
const cors = require('cors');
var bodyParser = require("body-parser");

const data = require('./data');


const app = express();
app.use(cors());

app.get('/', (req, res) => { 
    console.log(req.query);
    const {price, id} = req.query;
    console.log(price, id);
// res.send("id: " + req.query.id);
res.send({price, id});

});


app.listen(8000, () => console.log(`Server is running on port 8000`));