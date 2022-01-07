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

const gridContainer = document.querySelector(".grid-container");
const tileCount = 18;

/*
for (i = 0; i < tileCount; i++) {
    const newTile = document.createElement("div");
    gridContainer.appendChild(newTile);
}
*/