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

const gridContainer = document.querySelector(".nums");
const tileCount = 16;
const numsArray = ["7", "8", "9", "x",
                    "4", "5", "6", "-",
                    "1", "2", "3", "+",
                    "0", ".", "bk", "C"];

for (i = 0; i < tileCount; i++) {
    const newNum = document.createElement("div");
    gridContainer.appendChild(newNum);
    newNum.textContent = numsArray[i];
}
