import React, { useState } from "react";
import Header from "./Header";
import Card from "./Card";
import CreateArea from "./CreateArea";
import Details from "./Details";

function App() {

  const[cards, insertCards] = useState([{title: "Electric Guitar",
   url:"https://images.unsplash.com/photo-1607560105214-0aaa5f8fcba4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
  detail:"Jimmy Hendrix"}]);

 const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  // function detailCard(id, existingCards) {
  //   existingCards.filter((id)=> {
  //     return id===index;
  //   })

  // }




  return (
    <div>
      <Header />
      <CreateArea

      //adding a card
      addEvent={(card) => {
        insertCards(existingCards => {
          return [...existingCards, card];
        });
      }}
      />


      {cards.map((singleCardItem, index) => {
        return isOpen? <Details 
        key={index}
        id={index}
        title={singleCardItem.title}
        detail={singleCardItem.detail}
        onBack={togglePopup}
        
        
        />:<Card
        key={index}
        id={index}
        title={singleCardItem.title}
        url={singleCardItem.url}
        detail={singleCardItem.detail}

        // deleting function
        onDelete={id => {
          insertCards(existingCards => {
           return existingCards.filter((card, index) => {
              return index !==id;
            });
          });
        }
        }
        // detail function
      
        onDetail={togglePopup}
        
        //check
      />;
      })}

    </div>
  );
}

export  default App;