var images = 
'{"Electric Guitar":"https://images.unsplash.com/photo-1607560105214-0aaa5f8fcba4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80", "Turntable":"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHR1cm50YWJsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}';

// var images =
//  {
//     "Electric Guitar":"https://images.unsplash.com/photo-1607560105214-0aaa5f8fcba4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
//     "Turntable": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHR1cm50YWJsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
//     "Piano": "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
//     "Acoustic Guitar": "https://images.unsplash.com/photo-1588729827527-cbe98472aa8a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWNhbCUyMGluc3RydW1lbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
// }


let obj = JSON.parse(images);
//console.log(images);
for (let url in obj) {
    addImage(obj[url]);
}

let v;

function imgsubmit() {
    let urlToAdd = (document.getElementById('URL').value);
    let cardDescriptionToAdd = (document.getElementById('Description').value);
    let k = (cardDescriptionToAdd);
    v = (urlToAdd);
    let temp = v;
    //making a key val pair
    obj[k] = v;
    addImage(obj[k]);
}

function deleteList() {
    let imageContainer = document.getElementById('images');
    imageContainer.innerHTML = "";
}



function addImage(imageList) {
  // debugger;
    let imageContainer = document.getElementById('images');
    let imageElement = document.createElement("img");
    imageElement.setAttribute('src', imageList);
    imageElement.setAttribute('class', "cards");
    imageContainer.append(imageElement);
    
    let imageItem = document.createElement("li");
    let brk = document.createElement('BR');
  
    imageItem.innerHTML = imageList;
    imageElement.appendChild(imageItem);
    imageItem.append(brk);
    imageItem.append(brk);
    
}

function clearFields() {
    document.getElementById("URL").value = "";
    document.getElementById("Description").value = "";

}