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
        return (b == 0) ? display.textContent = ("Dividing by zero is a violation of mathematical law!") : divNum(a, b);
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
        displayValue = displayValue.concat(currentChar);
        return "isOperator";
    } else if (numsArray.indexOf(currentChar) !== -1) {
        displayValue = displayValue.concat(currentChar);
        return "isNumber";
    } else if (currentChar === "C") {
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
    operatorPressed = true;
}

function numberEvent(currentChar) {
    if (operatorPressed) {
        currentInput = currentInput.concat(currentChar);
    } else {
        previousInput = previousInput.concat(currentChar);
    };
}

function clearEvent() {
    previousInput = "";
    chosenOperator = "";
    currentInput = "";
    displayValue = "";
    operatorPressed = false;
    display.textContent = "";
}

function convertAndOperate() {
    previousInput = Number(previousInput);
    currentInput = Number(currentInput);
    const result = +parseFloat(operate(previousInput, currentInput, chosenOperator)).toFixed(2);
    previousInput = previousInput.toString();
    currentInput = currentInput.toString();
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
        if (chosenOperator === undefined) {
            return;
        }
        const result = convertAndOperate();
        if (result === "NaN") {
            display.append(equalsBtn.textContent);
            display.append(previousInput);
            return;
        }
        display.append(equalsBtn.textContent);
        display.append(result);
    });
}

function addAdditionalCSSClasses() {
    const btns = document.querySelectorAll(".nums div");
    btns.forEach(btn => {
        let currentChar = btn.textContent;
        let inputType = determineInputType(currentChar);

        if (inputType === "isOperator") {
            btn.className = "operator";
        } else if (inputType === "isClear") {
            btn.className = "clear";
        }
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
let chosenOperator;
let currentInput = "";
let displayValue = "";
let operatorPressed = false;
display.append(displayValue);

makeButtons();
addBtnClickEvents();
addEqualsEvent();
addAdditionalCSSClasses();
