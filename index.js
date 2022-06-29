var divcount = 4

function removeFromSection(num) {
    if (num > 4) {
        for (var i = num; i < divcount + 1; i++) {
            var elem = document.getElementById("keycontainer" + i.toString())
            elem.parentElement.removeChild(elem);
        }
        divcount = num - 1;
    } else {
        for (var i = 5; i < divcount + 1; i++) {
            var elem = document.getElementById("keycontainer" + i.toString())
            elem.parentElement.removeChild(elem);
        }
        for (var i = num; i < 5; i++) {
            var elem = document.getElementById("keycontainer" + i.toString())
            elem.innerHTML = "";
        }
        divcount = 4;
    }

}

function expandElement(o, json) {
    var pp = o.parentProperties
    var pe = o.parentElement

    console.log(parseInt(pe.id.replace("keycontainer", "")) + 1)
    removeFromSection(parseInt(pe.id.replace("keycontainer", "")) + 1)

    var currentElement = json
    pp.forEach((p) => {
        currentElement = currentElement[p]
    })

    var currentElement = currentElement[o.textContent];
    document.getElementById("valueEditor").innerHTML = "";
    if (currentElement.constructor != Object) {
        if (currentElement.constructor == Array) {
            var containsArray = false;
            currentElement.forEach((e) => {
                if (e.constructor == Array || e.constructor == Object) {
                    containsArray = true;
                }
            });
            if (!containsArray) {
                currentElement.forEach((e) => {
                    var item = document.createElement("p");
                    item.textContent = e.toString();
                    document.getElementById("valueEditor").appendChild(item);
                });
                return true;
            }
        } else {
            var item = document.createElement("p");
            item.textContent = currentElement.toString();
            document.getElementById("valueEditor").appendChild(item);
            return true;
        }
    }
    if (parseInt(pe.id.replace("keycontainer", "")) + 1 > divcount) {
        console.log("hi")
        divcount++;
        var div = document.createElement("div")
        div.id = "keycontainer" + divcount.toString()
        document.getElementById("keycontainers").appendChild(div)
    }
    document.getElementById("keycontainer" + (parseInt(pe.id.replace("keycontainer", "")) + 1).toString()).innerHTML = "";
    var keys = Object.keys(currentElement)
    keys.forEach((key) => {
        var buttonElement2 = document.createElement("button")
        buttonElement2.textContent = key
        buttonElement2.parentProperties = pp.slice(0);
        buttonElement2.parentProperties.push(o.textContent)
        buttonElement2.addEventListener("click", (event) => {
            expandElement(event.target, json)
        })
        document.getElementById("keycontainer" + (parseInt(pe.id.replace("keycontainer", "")) + 1).toString()).appendChild(buttonElement2)
    });

}

function loadJSON(json) {
    removeFromSection(1)
    document.getElementById("valueEditor").innerHTML = "";
    var keys = Object.keys(json)
    keys.forEach((key) => {
        var buttonElement = document.createElement("button")
        buttonElement.textContent = key
        buttonElement.parentProperties = [];
        buttonElement.addEventListener("click", (event) => {
            expandElement(event.target, json)
        })
        document.getElementById("keycontainer1").appendChild(buttonElement)
    })
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

document.getElementById("loadJSONButton").onclick = function() {
    var json = prompt("Copy and Paste your JSON text here: ");
    if (json == null || json == "" || !isJsonString(json)) {
        alert("Please Enter a Valid JSON Text!")
    } else {
        loadJSON(JSON.parse(json));
    }
}