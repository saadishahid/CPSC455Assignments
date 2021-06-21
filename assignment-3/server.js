const express = require('express');
const cors = require ('cors');


const data = require("./data");

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


app.get ("/cards", (req, res) => {
    res.json(data);
});


app.get('/download',(req,res)=> {
    res.json(data);
});

app.post("/cards", (req,res) => {
    let newCard = req.body;
    
    data.push(newCard);
    console.log(data);

    res.send('all good');
});

app.post("/delete", (req,res) => {
    let deletionIndex = Object.keys(req.body)[0];
    console.log(deletionIndex);
    data.splice(deletionIndex,1);
   res.send('deleted successfully');
});



app.listen(5000, () => {
    console.log("server running on port 5000");
});