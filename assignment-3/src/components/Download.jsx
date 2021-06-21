import React from "react";

function Download(props) {

    return (
        <button className="download-button" onClick={()=>{
            props.onDownload(props.id);
          }}>DOWNLOAD</button>
    );

}

export  default Download;