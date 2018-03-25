function extractRedirectedUrl(text){
	var elem = document.createElement("html");
	elem.innerHTML = text;
	var aElems = elem.getElementsByTagName("a");
	var imgsrc = aElems[0].href;
	/*
	text = text.substring(text.indexOf("href=") + "href=".length);
	var imgsrc = text.substring(0, text.indexOf(">"));
	*/
	return imgsrc;
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 500)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpGet(theUrl, mathElem)
{
	httpGetAsync(theUrl, function(responseText){
		mathElemSrc = extractRedirectedUrl(responseText);
		mathElem.src = mathElemSrc;
	});
}

var mathElems = document.getElementsByClassName("mwe-math-fallback-image-inline");

for(var i=0; i<mathElems.length; i++){
	httpGet(mathElems[i].src, mathElems[i]);
}
