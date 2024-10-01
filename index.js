var curr_eval = ""
myFontSize = 35;
container = document.querySelector(".calculate-item");
var toCalc = 0
var yourOperation = ""
var newEquation = false
const triviaText = document.querySelector(".fun-fact p")


axios.get('https://cors-anywhere.herokuapp.com/https://numbersapi.com/random/trivia')
    .then(response => {
        console.log(response.data);
        // Handle the response data
        triviaText.innerHTML = response.data;

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });






//Add listeners to number buttons
var numberButtons = document.querySelectorAll(".number");
for (i = 0;i < numberButtons.length; i++) {
    numberButtons[i].addEventListener("click", function () {
        if (curr_eval === "0") {
            curr_eval = this.textContent;
        } else {
        curr_eval = curr_eval + this.textContent;
        }
        if (newEquation) {
            curr_eval = this.textContent;
            newEquation = false;
        }
        document.querySelector("h1").innerHTML = curr_eval;

        //Check width
        checkWidth(container);
    });
}

//Add listeners to special buttons
var specialButtons = document.querySelectorAll(".special");
for (i = 0;i < specialButtons.length; i++) {
    specialButtons[i].addEventListener("click", function () {
        yourContent = this.textContent;
        specialFunctions(yourContent);

        document.querySelector("h1").innerHTML = curr_eval;
        checkWidth(container);
    });
}
//Add listeners to function buttons
var functionButtons = document.querySelectorAll(".function");
for (i = 0; i < functionButtons.length; i++) {
    functionButtons[i].addEventListener("click", function () {
        yourContent = this.textContent;
        Operations(yourContent);
        document.querySelector("h1").innerHTML = curr_eval;
        checkWidth(container);

    });
}


//Add listener to body element
var body = document.querySelector("body");

body.addEventListener("keydown", function(event) {
    console.log(event.key);
});



function checkWidth(container) {
        // console.log(container.scrollWidth, container.clientWidth);
        if (container.scrollWidth > container.clientWidth && myFontSize > 22) {
            myFontSize-=3
            container.style.fontSize = myFontSize + "px";
        }
        else if (container.scrollWidth > container.clientWidth && myFontSize <= 22) {
            container.style.fontSize = myFontSize + "px";
        }
}

function specialFunctions(content) {
    if (content === "AC") {
        curr_eval = "0";
        toCalc = 0;
        myFontSize = 35;
        container.style.fontSize = myFontSize + "px";
    }
    else if (content === "%") {
        curr_eval = Number(curr_eval) / 100
        curr_eval.toString();
    }

    else if (content === "+/-") {
        curr_eval = Number(curr_eval)* -1;
        curr_eval = curr_eval.toString();
        if (curr_eval.length > 0 && curr_eval[0] === '-') {
            firstChar =curr_eval[0];
            restOfText = curr_eval.slice(1);
            console.log(firstChar, restOfText);
            document.querySelector("h1").innerHTML = `<h2 class="negative">${firstChar}</h2>${restOfText}`;
            console.log(document.querySelector("h1").innerHTML);

        }
    }
}


function Operations(content) {
    if (content === "/" || content === "X" || content === "-" || content === "+") {
        console.log(content);
        toCalc = Number(curr_eval);
        curr_eval = "0";
        yourOperation = content;
    }

    else if (content === "=") {
        console.log(content);
        switch (yourOperation) {
            case "+":
                curr_eval = Number(curr_eval) + toCalc;
                break;
            case "-":
                curr_eval = toCalc - Number(curr_eval);
                break;
            case "X":
                curr_eval = Number(curr_eval) * toCalc;
                break;
            case "/":
                curr_eval =  toCalc / Number(curr_eval);
                break;
            }
        curr_eval = curr_eval.toPrecision(10)
        yourOperation = "";
        newEquation = true;
    }
}
