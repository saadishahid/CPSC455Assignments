const express = require('express');
const cors = require ('cors');


const data = require("./data");

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const mongoose = require('mongoose');
 async function connectDB () {
    try{
    await mongoose.connect('mongodb://localhost:27017/cardsDB', { useNewUrlParser: true }, {useUnifiedTopology: true });
  } catch (error) {
    handleError(error);
  }
}

connectDB();

  

const cardSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'No name is mentioned'], unique: true},
    link:{type: String, required: [true, 'No card image url is mentioned']},
    detail:{type: String, required: [true, 'No details / player name provided']}
});

const Card = mongoose.model("Card", cardSchema);

//optional///////////////
// for (item of data) {
//     const musicCard = new Card(item);
//     musicCard.save().then(()=>console.log('saved in DB'));
  
// }
/////////////////////////

//const cardDataSet = new Set();
let cardDataArray = [];





 app.get ("/cards",  async (req, res) => {
  try {
   await Card.find((err,cards) => {
        err ? console.log(err) : null;
        cards.forEach((card) => {
            const temp = {title:card.title, link: card.link, detail:card.detail};
            cardDataArray.push(temp);
        });
    });
   
    //to prevent duplication
    var arr = []
    arr =  cardDataArray.filter((cardData, index, self) =>
    index === self.findIndex((t) => (
        t.title === cardData.title && t.link === cardData.link && t.detail === cardData.detail
    ))
    ) 
 
   
    //console.log(arr);
   // console.log(cardDataArray);
   res.json(arr); 
   }
   catch (error) {
    console.log(error);
  }
    });


app.get('/download',(req,res)=> {
    res.json(data);
});

app.post("/cards", (req,res) => {
  
    let newCard = req.body;
    const musicCard = new Card(newCard);
    musicCard.save().then(()=>res.send('all good'));
   
    // data.push(newCard);
  //  res.send('all good');
});

app.post("/delete", (req,res) => {
  //console.log(Object.keys(req.body));
    let deletionItem = Object.keys(req.body)[0];
    Card.deleteOne({title:(deletionItem)}, err => err? console.log(err):console.log("Deleted Successfully"));
    // data.splice(deletionIndex,1);
   res.send('deleted successfully');
});

app.listen(5000, () => {
    console.log("server running on port 5000");
});