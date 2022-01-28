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
        displayTopValue = displayTopValue.concat(currentChar);
        return "isOperator";
    } else if (numsArray.indexOf(currentChar) !== -1) {
        displayTopValue = displayTopValue.concat(currentChar);
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
    operatorPressed = false;
    previousInput = "";
    chosenOperator = "";
    currentInput = "";
    displayTopValue = "";
    displayBottomValue = "";
    displayTop.textContent = "";
    displayBottom.textContent = "";
}

function convertAndOperate() {
    previousInput = Number(previousInput);
    currentInput = Number(currentInput);
    const result = +parseFloat(operate(previousInput, currentInput, chosenOperator)).toFixed(2);
    previousInput = previousInput.toString();
    currentInput = currentInput.toString();
    if (currentInput == 0) {
        clearEvent();
        displayTop.textContent = "Cannot divide by 0.";
        return;
    } else {
        return result.toString();
    };
}

function populateDisplayEvent() {
    let currentChar = this.textContent;
    let inputType = determineInputType(currentChar);

    arrangeDisplayValues(currentChar, inputType);
}

function arrangeDisplayValues(currentChar, inputType) {
    if (currentChar !== "C") {
        if (inputType === "isOperator") {
            if (operatorPressed) {
                displayTopValue = "";
                displayTop.textContent = "";
            };
            displayTopValue = displayTopValue.concat(currentChar);
            displayTop.append(previousInput);
            displayTop.append(currentChar);
        } else if (operatorPressed) {
            displayBottom.textContent = "";
            displayBottomValue = currentInput;
            displayTopValue = displayTopValue.concat(currentChar);
            displayBottom.append(displayBottomValue);
        } else {
            displayBottomValue = displayBottomValue.concat(currentChar);
            displayBottom.append(currentChar);
        };
    };
}

function addEqualsEvent() {
    equalsBtn.addEventListener('click', () => {
        if (chosenOperator === undefined) {
            return;
        }
        const result = convertAndOperate();
        if (currentInput == 0) {
            return;
        }
        displayTop.append(currentInput);
        displayTop.append(equalsBtn.textContent);
        displayBottomValue = "";
        displayBottom.textContent = result;
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
        };
    });
}


const displayTop = document.querySelector(".display-top");
const displayBottom = document.querySelector(".display-bottom");
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
let displayTopValue = "";
let displayBottomValue = "";
let operatorPressed = false;
displayTop.append(displayTopValue);

makeButtons();
addBtnClickEvents();
addEqualsEvent();
addAdditionalCSSClasses();
