const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const data = require("./client/data");

const app = express();



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const mongoose = require('mongoose');
// async function connectDB() {
//   try {
//     await mongoose.connect('mongodb+srv://saadishahid:cardsdb@instrumentcards.skvq3.mongodb.net/instrumentCards?retryWrites=true&w=majority', {
//       useNewUrlParser: true
//     }, {
//       useUnifiedTopology: true
//     });
//   } catch (error) {
//     handleError(error);
//   }
// }

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true
    }, {
      useUnifiedTopology: true
    });
  } catch (error) {
    handleError(error);
  }
}
connectDB();

// nothing

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'No name is mentioned'],
    unique: true
  },
  link: {
    type: String,
    required: [true, 'No card image url is mentioned']
  },
  detail: {
    type: String,
    required: [true, 'No details / player name provided']
  }
});

const Card = mongoose.model("Card", cardSchema);


app.get("/cards", async (req, res) => {
  try {
    await Card.find((err, cards) => {
      let cardDataArray = [];
      err ? console.log(err) : null;
      cards.forEach((card) => {
        const temp = {
          title: card.title,
          link: card.link,
          detail: card.detail
        };
        cardDataArray.push(temp);
        cardDataArray.filter((cardData, index, self) =>
          index === self.findIndex((t) => {
            t.title === cardData.title && t.link === cardData.link && t.detail === cardData.detail
          })
        )
      });
      return res.json(cardDataArray);
    });

  } catch (error) {
    console.log(error);
  }
});


app.get('/download', async (req, res) => {
  try {
    await Card.find((err, cards) => {
      let downloadArray = [];
      err ? console.log(err) : null;
      cards.forEach((card) => {
        const temp = {
          title: card.title,
          link: card.link,
          detail: card.detail
        };
        downloadArray.push(temp);

      });
      res.json(downloadArray);
    });

  } catch (error) {
    res.send(error);
  }
});


app.post("/cards", (req, res) => {

  let newCard = req.body;
  const musicCard = new Card(newCard);
  musicCard.save().then(() => res.send('all good'));

});

app.post("/delete", (req, res) => {
  let deletionItem = Object.keys(req.body)[0];
  Card.deleteOne({
    title: (deletionItem)
  }, err => err ? console.log(err) : console.log("Deleted Successfully"));
  res.send('deleted successfully');
});


//Serve static assets in production

if (process.env.NODE_ENV === 'production') {
  //setting up static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}


app.listen(port, () => {
  console.log("server running");
});