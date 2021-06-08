import React from "react";


// import Details from "./Details";

function Card(props) {

   return (
    <div className="card">
      <h1>{props.title}</h1>
      <img src={props.url} alt="Instrument"/>
  
      <button className="del-button" onClick={()=>{
        props.onDelete(props.id);
      }}>DELETE</button>

      <button className="detail-button" onClick={()=>{
        props.onDetail(props.id);
      }}>DETAILS</button>


    </div>
  );
}

export default Card;
