import React, { useEffect, useState } from "react";
import Header from "./Header";
import Card from "./Card";
import CreateArea from "./CreateArea";
import Details from "./Details";

import axios from "axios";


function App() {

 const[cards, insertCards] = useState([]);

 const [isOpen, setIsOpen] = useState(false);


const getData = ()=> {
  axios.get('/cards').then(resp => {
   console.log(resp.data);
   insertCards(resp.data);
}) ;
}
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    getData();
  }, []);

 
  return (
    <div>
      <Header />
      <CreateArea
        onDownload = { ()=> {
          axios.get('/download').then(res => {
            console.log(res.data);
          const blob = new Blob([JSON.stringify(res.data)], {type:"text/plain"});
          const url = URL.createObjectURL(blob);
          const dlLink = document.createElement('a');
          dlLink.download = 'cardDataFile.json';
          dlLink.href = url;
          dlLink.click();
          });
        }}

      //adding a card
      addEvent={(card) => {
        axios.post('/cards',card).then((res) => console.log(res))
        .then(getData())
        .catch(error=>console.log(error)) ;
        //getData();
      }}
      />

      {cards.map((singleCardItem, index) => {
        return isOpen ?
        
        <Details 
        key={index}
        id={index}
        title={singleCardItem.title}
        detail={singleCardItem.detail}
                
        />
        :<Card
        key={index}
        id={index}
        title={singleCardItem.title}
        link={singleCardItem.link}
        detail={singleCardItem.detail}

        // deleting function
        onDelete={title => {
          axios.post('/delete',title)
        .then(getData())
        .catch(error=>console.log(error)) ;
        }
        }
        // detail function
        onDetail={(id)=> {
            togglePopup();
           insertCards(existingCards => {          
                return existingCards.filter((card, index) => {
                 return index ===id;
               });
              });          
        }}
      />;
      })}
     
    </div>
  );
}

export  default App;