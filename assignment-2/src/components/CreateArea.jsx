import React , {useState} from "react";

function CreateArea(props) {
  const [card, insertCard] = useState({
    title:"",
    url:"",
    details:""
  });

  function changeHandler(event) {
    const {name, value} = event.target;

    insertCard(existingCards => {
      return {
      ...existingCards, [name]: value
    };
    });
  }


  function submitCard(event){
    props.addEvent(card);

    event.preventDefault(); // To prevent the entire page from refreshing when button is clicked
  }

  function clearFields(event) {
    event.preventDefault();
    insertCard(""); 
    
    //CreateArea(props);
  
  }
   
  return (
    <div>
      <form>
        <input name="title" value={card.title} onChange={changeHandler} placeholder="Title" />
        <input name="url" value={card.url} onChange={changeHandler} placeholder="Enter URL"/>
        <input name="details" value={card.details} onChange={changeHandler} placeholder="Enter Details"/>
        <button className="add-button" onClick={submitCard}>Add</button>
        <button className="clear-button" onClick={clearFields}>Clear</button>
      </form>
    </div>
  );
}

export default CreateArea;
