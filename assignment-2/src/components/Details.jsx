import React from "react";

function Details(props) {

    return (
     <div className="card">
       <h1>{props.title}</h1>
       <h2>{props.detail}</h2>
       
   
       <button className="back-button" onClick={()=>{
         props.onBack(props.id);
       }}>Back</button>
 
      
 
 
     </div>
   );
 }
 
 export default Details;


