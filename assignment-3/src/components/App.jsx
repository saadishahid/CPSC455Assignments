import React, { useEffect, useState } from "react";
import Header from "./Header";
import Card from "./Card";
import CreateArea from "./CreateArea";
import Details from "./Details";
import axios from "axios";


function App() {

  const[cards, insertCards] = useState([]);

 const [isOpen, setIsOpen] = useState(false);

//  const getData = async() => {
//    const response = await fetch("/api");
//    const data = await response.json();
   
//   console.log(data);

   
//  insertCards(data);
//  }

const getData = ()=> {
  axios.get('/cards').then(resp => {
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

      //adding a card
      addEvent={(card) => {
        
        axios.post('/cards',card)
        .then(response=>console.log(response))
        .catch(error=>console.log(error)) ;
        getData();
       

        // insertCards(existingCards => {
        //   return [...existingCards, card];
        // });
      }}
      />

      

      {cards.map((singleCardItem, index) => {
        // const arr = [];
        // arr.push(singleCardItem);
        
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
        onDelete={id => {
          axios.post('/delete',id)
        .then(response=>console.log(response))
        .catch(error=>console.log(error)) ;
        getData();



          insertCards(existingCards => {
           return existingCards.filter((card, index) => {
              return index !==id;
            });
          });
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
                      
         }
        }
     
      />;
      })}

    </div>
  );
}

export  default App;