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
    btns.forEach(btn => btn.addEventListener('click', saveInput));
    btns.forEach(btn => btn.addEventListener('click', populateDisplayEvent));
}

function saveInput() {
    let currentChar = this.textContent;
    let inputType = determineInputType(currentChar);

    if (inputType === "isOperator") {
        operatorEvent(currentChar);
    } else if (inputType === "isNumber") {
        numberEvent(currentChar);
    } else if (inputType === "isClear") {
        clearEvent();
    };
}

function determineInputType(currentChar) {
    if (operatorsArray.indexOf(currentChar) !== -1) { // Checks operatorsArray if currentChar isn't not (is) present.
        // console.log("isOperator");
        displayValue = displayValue.concat(currentChar);
        return "isOperator";
    } else if (numsArray.indexOf(currentChar) !== -1) {
        displayValue = displayValue.concat(currentChar);
        // console.log("isNumber");
        return "isNumber";
    } else if (currentChar === "C") {
        // console.log("isClear");
        return "isClear";
    };
}

function operatorEvent(currentChar) {
    if (operatorPressed) {
        const result = convertAndOperate();
        previousInput = result;
        currentInput = "";
    };
    chosenOperator = currentChar;
    console.log(chosenOperator);
    operatorPressed = true;
}

function numberEvent(currentChar) {
    if (operatorPressed) {
        currentInput = currentInput.concat(currentChar);
        console.log("currentInput: " + currentInput);
    } else {
        previousInput = previousInput.concat(currentChar);
        console.log("previousInput: " + previousInput);
    };
}

function clearEvent() {
    previousInput = "";
    chosenOperator = "";
    currentInput = "";
    displayValue = "";
    operatorPressed = false;
    display.textContent = "";
    console.log("clear");
}

function convertAndOperate() {
    previousInput = Number(previousInput);
    currentInput = Number(currentInput);

    console.log("operating previousInput " + previousInput + " of type " + typeof(previousInput));
    console.log("operating currentInput: " + currentInput + " of type " + typeof(currentInput));
    const result = +parseFloat(operate(previousInput, currentInput, chosenOperator)).toFixed(2);
    previousInput = previousInput.toString();
    currentInput = currentInput.toString();
    console.log("result is: " + result.toString());
    return result.toString();
}

function populateDisplayEvent() {
    let currentChar = this.textContent;
    if (currentChar !== "C") {
        displayValue = displayValue.concat(currentChar);
        display.append(currentChar);
    }
}

function addEqualsEvent() {
    equalsBtn.addEventListener('click', () => {
        display.append(equalsBtn.textContent);
        const result = convertAndOperate();
        display.append(result);
    });
}


const display = document.querySelector(".display");
const gridContainer = document.querySelector(".nums");
const equalsBtn = document.querySelector(".equals");
const tileCount = 16;
const symbolsArray = ["7", "8", "9", "/",
                      "4", "5", "6", "x",
                      "1", "2", "3", "-",
                      "0", ".", "C", "+"];
const numsArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operatorsArray = ["/", "x", "-", "+"];
let previousInput = "";
let chosenOperator = "";
let currentInput = "";
let displayValue = "";
let operatorPressed = false;
display.append(displayValue);

makeButtons();
addBtnClickEvents();
addEqualsEvent();
