var URL = "https://api.imgur.com/3/gallery/r/startledcats+catgifs/";
var ID = "4a2515bbf9e3304";

// when we get our response, copy array data to this variable
var imageArray = undefined;

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
	var images = JSON.parse(response_text);
	imageArray = images.data;
	getAndSet();
}

function getAndSet() {
	var rand = Math.floor(Math.random() * (imageArray.length));	
	
	// can't use albums
	if (imageArray[rand].is_album) {
		var foundNew = false;
		while (!foundNew) {
			rand = Math.floor(Math.random() * (imageArray.length));
			if (!imageArray[rand].is_album)
				foundNew = true;
		}
	}
	
	if(imageArray[rand].type == "image/gif") {
		var imageURL = imageArray[rand].mp4;
		setVideo(imageURL);
	}
	else {
		var imageURL = imageArray[rand].link;
		setPic(imageURL);
	}
}

function setPic(addr) {
	removeEverything();
	var catPic = document.createElement("img");
	catPic.setAttribute("src", addr);
	document.body.appendChild(catPic);
}  


function setVideo(addr) {
	removeEverything();
	var catVid = document.createElement("video");
	catVid.src = addr;
	catVid.type = "video/mp4";
	catVid.autoplay = true;
	catVid.loop = true;
	document.body.appendChild(catVid);
}

function removeEverything() {
	while (document.body.firstChild) {
		document.body.firstChild.remove();
	}
}

document.addEventListener("click", function() {
	getAndSet();
});

request();