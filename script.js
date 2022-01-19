function addNum(a, b) {
    return a + b;
}

function subNum(a, b) {
    return a - b;
}

function multNum(a, b) {
    return a * b;
}

function divNum(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator == "+") {
        return addNum(a, b);
    } else if (operator == "-") {
        return subNum(a, b);
    } else if (operator == "*") {
        return multNum(a, b);
    } else if (operator == "/") {
        return divNum(a, b);
    }
}

function makeButtons() {
    for (let i = 0; i < tileCount; i++) {
        const newBtn = document.createElement("div");
        const currentChar = symbolsArray[i];
        newBtn.textContent = currentChar;
        gridContainer.appendChild(newBtn);
    }
}

function addBtnClickEvents() {
    const btns = document.querySelectorAll(".nums div");
    btns.forEach(btn => btn.addEventListener('click', gatherInput));
}

function gatherInput() {
    let currentChar = this.textContent;
    console.log(currentChar);
    // console.log(typeof(currentChar));
    if (operatorsArray.indexOf(currentChar) !== -1) { // Checks operatorsArray if currentChar isn't not (is) present.
        console.log("is an operator");
    } else if (numsArray.indexOf(currentChar) !== -1) {
        console.log("is a number");
    }
}

const display = document.querySelector(".display");
const gridContainer = document.querySelector(".nums");
const tileCount = 16;
const symbolsArray = ["7", "8", "9", "/",
                      "4", "5", "6", "x",
                      "1", "2", "3", "-",
                      "0", ".", "C", "+"];
const numsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorsArray = ["/", "x", "-", "+", "."];
let previousInput = "";
let chosenOperator = "";
let currentInput = "";
let displayValue = "";
display.append(displayValue);

makeButtons();
addBtnClickEvents();
