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
    };
}

function makeButtons() {
    for (let i = 0; i < tileCount; i++) {
        const newBtn = document.createElement("div");
        const currentChar = symbolsArray[i];
        newBtn.textContent = currentChar;
        gridContainer.appendChild(newBtn);
    };
}

function addBtnClickEvents() {
    const btns = document.querySelectorAll(".nums div");

    document.addEventListener('keydown', saveInput);
    btns.forEach(btn => btn.addEventListener('click', saveInput));
    equalsBtn.addEventListener('click', saveInput);
}

function saveInput(e) {
    let currentChar;
    e.key ? currentChar = e.key : currentChar = this.textContent;
    let inputType = determineInputType(currentChar);

    switch (inputType) {
        case "isOperator":
            saveOperator(currentChar);
            break;
        case "isNumber":
            saveNumber(currentChar);
            break;
        case "isEquals":
            equals();
            break;
        case "isClear":
            clear();
            break;
    };

    if (inputType !== "invalid") {
        populateDisplay(currentChar, inputType);
    };
}

function determineInputType(currentChar) {
    if (operatorsArray.indexOf(currentChar) !== -1) { // Checks operatorsArray if currentChar isn't not (is) present.
        displayTopValue += currentChar;
        return "isOperator";
    } else if (numsArray.indexOf(currentChar) !== -1) {
        displayTopValue += currentChar;
        return "isNumber";
    } else if (currentChar === "=") {
        return "isEquals";
    } else if (currentChar === "c") {
        return "isClear";
    } else {
        return "invalid";
    };
}

function saveOperator(currentChar) {
    if (operatorPressed) {
        const result = convertAndOperate();
        previousInput = result;
        currentInput = "";
    };
    chosenOperator = currentChar;
    operatorPressed = true;
}

function saveNumber(currentChar) {
    if (operatorPressed) {
        currentInput += currentChar;
    } else {
        previousInput += currentChar;
    };
}

function clear() {
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
        clear();
        displayTop.textContent = "Cannot divide by 0.";
        return;
    } else {
        return result.toString();
    };
}

function populateDisplay(currentChar, inputType) {
    if (currentChar !== "c") {
        if (inputType === "isOperator") {
            if (operatorPressed) {
                displayTopValue = "";
                displayTop.textContent = "";
            };
            displayTopValue += currentChar;
            displayTop.append(previousInput);
            displayTop.append(currentChar);
        } else if (operatorPressed) {
            if (currentChar === "=") {
                return;
            } else {
                displayBottom.textContent = "";
                displayBottomValue = currentInput;
                displayTopValue += currentChar;
                displayBottom.append(displayBottomValue);
            };
        } else {
            displayBottomValue += currentChar;
            displayBottom.append(currentChar);
        };
    };
}

function equals() {
    if (chosenOperator === undefined) {
        return;
    }
    const result = convertAndOperate();
    if (currentInput == 0) {
        return;
    };
    displayTop.append(currentInput);
    displayTop.append(equalsBtn.textContent);
    displayBottomValue = "";
    displayBottom.textContent = result;
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
                      "0", ".", "c", "+"];
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
addAdditionalCSSClasses();
