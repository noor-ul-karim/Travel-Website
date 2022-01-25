"use strict";

var httpRequest = false;

function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    }

    catch (requestError) {
        // display city & state fields and labels for manual input 
        document.getElementById("csset").style.visibility = "visible";
        // remove event listeners so additional input is ignored 
        var zip = document.getElementById("zip").value;

        if (zip.addEventListener) {
            zip.removeEventListener("keyup", checkInput, false);
        } else if (zip.attachEvent) {
            zip.detachEvent("onkeyup", checkInput);
        }//end if/else

        return false;

    }//end try/catch 

    return httpRequest;

}//end function


function checkInput() {

    var zip = document.getElementById("zip").value;

    if (zip.length === 5) {
        getLocation();
    } else {
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }//end if/else
}//end function


function getLocation() {
    var zip = document.getElementById("zip").value;
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }//end if

    httpRequest.abort();
    httpRequest.open("get", "https://api.zippopotam.us/us/" + zip, true);
    httpRequest.send();
    httpRequest.onreadystatechange = displayData;
}//end function


function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText);
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData.places[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
    }//end if

}//end function

var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}//end if/else


//////////////////////////////// Addingt Items to list
"use strict";

var list = [];
var state_list = [];

function generateList() {
    var listItems = document.getElementsByTagName("li");
    for (var i = listItems.length - 1; i >= 0; i--) {
        document.getElementsByTagName("ol")[0].removeChild(listItems[i]);
    }
    for (var i = 0; i < list.length, i < state_list.length; i++) {
        if (i <= 3) {
            var city = "<span class='first'>UP</span>" + "<span class='last'>DOWN</span> " + list[i] + " " + state_list[i];
            var newListItem = document.createElement("li");
            newListItem.innerHTML = city;

            document.getElementsByTagName("ol")[0].appendChild(newListItem);
            var firstButtons = document.querySelectorAll(".first");
            var lastFirstButton = firstButtons[firstButtons.length - 1];
            if (lastFirstButton.addEventListener) {
                lastFirstButton.addEventListener("click", moveToTop, false);
            } else if (lastFirstButton.attachEvent) {
                lastFirstButton.attachEvent("onclick", moveToTop);
            }
            var lastButtons = document.querySelectorAll(".last");
            var lastLastButton = lastButtons[lastButtons.length - 1];
            if (lastLastButton.addEventListener) {
                lastLastButton.addEventListener("click", moveToBottom, false);
            } else if (lastLastButton.attachEvent) {
                lastLastButton.attachEvent("onclick", moveToBottom);
            }
        }
        if (i === 3) {
            document.getElementById("resultsExpl").innerHTML = "Thanks for your suggestions";
            document.getElementById('registerbtn').innerHTML = '<a class="btn btn-primary" href="registration.html">Go to Registration Page</a>';


            var firstButtons = document.querySelectorAll(".first");
            var lastFirstButton = firstButtons[firstButtons.length - 1];
            if (lastFirstButton.addEventListener) {
                lastFirstButton.addEventListener("click", moveToTop, false);
            } else if (lastFirstButton.attachEvent) {
                lastFirstButton.attachEvent("onclick", moveToTop);
            }
            var lastButtons = document.querySelectorAll(".last");
            var lastLastButton = lastButtons[lastButtons.length - 1];
            if (lastLastButton.addEventListener) {
                lastLastButton.addEventListener("click", moveToBottom, false);
            } else if (lastLastButton.attachEvent) {
                lastLastButton.attachEvent("onclick", moveToBottom);
            }

        }



    }
}

function addItem() {
    var city = document.getElementById("city");
    var state = document.getElementById("state");
    list.push(city.value);
    state_list.push(state.value);

    zip.value = "";
    city.value = "";
    state.value = "";
    generateList();
}
//This function moves the items to the top
function moveToTop(evt) {
    if (evt === undefined) {
        evt = window.event;
    }
    var callerElement = evt.target || evt.srcElement;
    var listItems = document.getElementsByTagName("li");
    var parentItem = callerElement.parentNode;
    for (var i = 0; i < list.length; i++) {
        if (parentItem.innerHTML.search(list[i]) !== -1) {
            var itemToMove = list.splice(i, 1);
            list.unshift(itemToMove);
        }
    }
    generateList();
}
//This function moves the items to the bottom
function moveToBottom(evt) {
    if (evt === undefined) {
        evt = window.event;
    }
    var callerElement = evt.target || evt.srcElement;
    var listItems = document.getElementsByTagName("li");
    var parentItem = callerElement.parentNode;
    for (var i = 0; i < list.length; i++) {
        if (parentItem.innerHTML.search(list[i]) !== -1) {
            var itemToMove = list.splice(i, 1);
            list.push(itemToMove);
        }
    }
    generateList();
}

function createEventListener() {
    var addButton = document.getElementById("button");
    if (addButton.addEventListener) {
        addButton.addEventListener("click", addItem, false);
    } else if (addButton.attachEvent) {
        addButton.attachEvent("onclick", addItem);
    }
}
if (window.addEventListener) {
    window.addEventListener("load", createEventListener, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createEventListener);
}

function RemoveItem() {
    var text = document.getElementById("results");
    text.remove();

}


