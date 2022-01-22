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

function operate(a, b, operator) {
    if (operator == "+") {
        return addNum(a, b);
    } else if (operator == "-") {
        return subNum(a, b);
    } else if (operator == "x") {
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
    let inputType = determineInputType(currentChar);

    saveInput(inputType, currentChar);
}

function addEqualsEvent() {
    equalsBtn.addEventListener('click', () => {
        convertAndOperate();
    });
}

function convertAndOperate() {
    equalsPressed = true;
    previousInput = parseInt(previousInput);
    currentInput = parseInt(currentInput);

    console.log("operating previousInput " + previousInput + " of type " + typeof(previousInput));
    console.log("operating currentInput: " + currentInput + " of type " + typeof(currentInput));
    let result = operate(previousInput, currentInput, chosenOperator);
    previousInput = previousInput.toString();
    currentInput = currentInput.toString();
    console.log("result is: " + result.toString());
    return result.toString();
}

function determineInputType(currentChar) {
    if (operatorsArray.indexOf(currentChar) !== -1) { // Checks operatorsArray if currentChar isn't not (is) present.
        // console.log("isOperator");
        return "isOperator";
    } else if (numsArray.indexOf(currentChar) !== -1) {
        // console.log("isNumber");
        return "isNumber";
    };
}

function saveInput(inputType, currentChar) {
    if (inputType === "isOperator") {
        if (operatorPressed) {
            let result = convertAndOperate();
            previousInput = result;
        }
        chosenOperator = currentChar;
        console.log(chosenOperator);
        operatorPressed = true;
    } else if (inputType === "isNumber") {
        if (operatorPressed) {
            currentInput = "";
            currentInput = currentInput.concat(currentChar);
            console.log("currentInput: " + currentInput);
        } else {
            previousInput = previousInput.concat(currentChar);
            console.log("previousInput: " + previousInput);
        };
    };
}

const display = document.querySelector(".display");
const gridContainer = document.querySelector(".nums");
const equalsBtn = document.querySelector(".equals");
const tileCount = 16;
const symbolsArray = ["7", "8", "9", "/",
                      "4", "5", "6", "x",
                      "1", "2", "3", "-",
                      "0", ".", "C", "+"];
const numsArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operatorsArray = ["/", "x", "-", "+", "."];
let previousInput = "";
let chosenOperator = "";
let currentInput = "";
let displayValue = "";
let operatorPressed = false;
let equalsPressed = false;
display.append(displayValue);

makeButtons();
addBtnClickEvents();
addEqualsEvent();
