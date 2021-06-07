import React from "react";

function Card(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="card">
      <h1>{props.title}</h1>
      <img src={props.url} alt="Instrument"/>
      <button className="del-button" onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Card;
