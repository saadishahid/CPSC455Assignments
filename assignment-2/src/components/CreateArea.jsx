import React , {useState} from "react";

function CreateArea(props) {
  const [card, insertCard] = useState({
    title:"",
    url:"",
    detail:""
  });

  function changeHandler(event) {
    const {name, value} = event.target;

    insertCard(existingCards => {
      return {
      ...existingCards, [name]: value
    };
    });
  }

   
  return (
    <div>
      <form>
        <input name="title" value={card.title} onChange={changeHandler} placeholder="Title" />
        <input name="url" value={card.url} onChange={changeHandler} placeholder="Enter URL"/>
        <input name="detail" value={card.detail} onChange={changeHandler} placeholder="Enter Details"/>
        
        <button className="add-button" onClick={event => {
          props.addEvent(card);
          event.preventDefault();
        }}
        >Add</button>
        
        <button className="clear-button" onClick={event=> {
          event.preventDefault();
          insertCard({
            title:"",
            url:"",
            detail:""
          });
        }}
        >Clear</button>
     
      </form>
    </div>
  );
}

export default CreateArea;
