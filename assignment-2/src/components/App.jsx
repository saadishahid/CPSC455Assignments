import React, { useState } from "react";
import Header from "./Header";
import Card from "./Card";
import CreateArea from "./CreateArea";

function App() {

  const[cards, insertCards] = useState([{title: "Electric Guitar",
   url:"https://images.unsplash.com/photo-1607560105214-0aaa5f8fcba4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
  detail:"Jimmy Hendrix"}]);


  function addCard(card) {
    insertCards(existingCards => {
      return [...existingCards, card];
    });

  }

  function deleteCard(id) {
    insertCards(existingCards => {
     return existingCards.filter((card, index) => {
        return index !==id;

      });
    });

  }

  return (
    <div>
      <Header />
      <CreateArea
      addEvent={addCard}
      />
      {cards.map((singleCardItem, index) => {
        return <Card
        key={index}
        id={index}
        title={singleCardItem.title}
        url={singleCardItem.url}
        onDelete={deleteCard}
      />;
      })}      
    </div>
  );
}

export default App;
