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


 app.get ("/cards",  async (req, res) => {
  let cardDataArray = [];
  try {
   await Card.find((err,cards) => {
        err ? console.log(err) : null;
        cards.forEach((card) => {
            const temp = {title:card.title, link: card.link, detail:card.detail};
            cardDataArray.push(temp);
        });
    });
   
    //to prevent duplication
    let arr =[];
     arr =  cardDataArray.filter((cardData, index, self) =>
    index === self.findIndex((t) => (
        t.title === cardData.title && t.link === cardData.link && t.detail === cardData.detail
    ))
    ) 

   res.json(arr); 
   }
   catch (error) {
    console.log(error);
  }
    });


app.get('/download',async(req,res)=> {
  try {
    let downloadCardsArray = []
    //let temp = [];
    await Card.find((err,cards) => {
      err ? console.log(err) : null;
      cards.forEach((card) => {
          downloadCardsArray.push({title:card.title, link: card.link, detail:card.detail});
         // downloadCardsArray.push(temp);
      });
  });
  console.log(downloadCardsArray);
  res.json(downloadCardsArray);  
} catch (e) {
    console.log (e);
  }
  
});

app.post("/cards", (req,res) => {
  
    let newCard = req.body;
    const musicCard = new Card(newCard);
    musicCard.save().then(()=>res.send('all good'));

});

app.post("/delete", (req,res) => {   
    let deletionItem = Object.keys(req.body)[0];
    Card.deleteOne({title:(deletionItem)}, err => err? console.log(err):console.log("Deleted Successfully"));
    res.send('deleted successfully');
});

app.listen(5000, () => {
    console.log("server running on port 5000");
});