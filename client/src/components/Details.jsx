import React from "react";

function Details(props) {

    return (
     <div className="card">
       <h1>{props.title}</h1>
       <h2>{props.detail}</h2>
       
      {/* <button className="back-button" onClick={()=>{
        props.onBack();
      }}>BACK</button> */}
      
     </div>
   );
 }
 
 export default Details;


