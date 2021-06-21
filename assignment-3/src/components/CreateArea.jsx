import React , {useState} from "react";

function CreateArea(props) {
  const [card, insertCard] = useState({
    title:"",
    link:"",
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
        <input name="link" value={card.link} onChange={changeHandler} placeholder="Enter URL"/>
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
            link:"",
            detail:""
          });
        }}
        >Clear</button>

<button className="download-button" onClick={event=> {
    props.onDownload();
          }}
        >DOWNLOAD ALL</button>
     
      </form>
    </div>
  );
}

export default CreateArea;
