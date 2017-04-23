var URL = "https://api.imgur.com/3/gallery/r/startledcats/";
var ID = "4a2515bbf9e3304";

function request() {
  var req = new XMLHttpRequest();  
  req.open("GET", URL, true); // true for asynchronous  
  
  req.onreadystatechange = function () {
    if (req.readyState == XMLHttpRequest.DONE && req.status == 200) {
      process(req.responseText);
    }
  }    
     
  req.setRequestHeader('Authorization', 'Client-ID ' + ID);  
  req.send(null);
}

function process(response_text) {
  console.log(response_text);
  var images = JSON.parse(response_text);
  var rand = Math.floor(Math.random() * (images.data.length));
  var imageURL = "http://i.imgur.com/" + images.data[rand].id + ".jpg";
  console.log(imageURL);
  setPic(imageURL);
}

function setPic(addr) {
  var catpic = document.getElementById("catPic");
  catpic.src = addr;
}  

// Doesn't work properly
/* 
document.addEventListener("click", function() {
	request();
	console.log("CLICKED");
}); */

request();