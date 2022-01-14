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
        const currentChar = numsArray[i];
        newBtn.textContent = currentChar;
        populateDisplayEvent(newBtn, currentChar);
        gridContainer.appendChild(newBtn);
    }
}

function populateDisplayEvent(newBtn, currentChar) {
    newBtn.onclick = () => {
        displayValue = displayValue.concat(currentChar);
        display.append(currentChar);
    };
}

const display = document.querySelector(".display");
const gridContainer = document.querySelector(".nums");
const tileCount = 16;
const numsArray = ["7", "8", "9", "/",
                    "4", "5", "6", "x",
                    "1", "2", "3", "-",
                    "0", ".", "C", "+"];
let displayValue = "";
display.append(displayValue);

makeButtons();
