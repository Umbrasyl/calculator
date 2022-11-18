"use strict";

function calculate() {
    getNum(inputLine.textContent.length);
    const numberOfOperations = operArray.length;
    for(let i = 0; i < numberOfOperations; i++) {
        operate();
    }
    updateScreen(numArray[0]); // Final result was stored as the only elemnt of the array. Update the screen with it.
    previousIndex = 0;
    numArray.pop();
}

function operate() {
    const operationIndex = findPrecedentIndex()
    const currentOperation = operArray[operationIndex];
    const firstNumber = numArray[operationIndex];
    const secondNumber = numArray[operationIndex + 1];
    if (currentOperation === "+") {
        numArray[operationIndex] = Math.round((firstNumber + secondNumber) * 1000) / 1000;
    } else if (currentOperation === "-") {
        numArray[operationIndex] = Math.round((firstNumber - secondNumber) * 1000) / 1000;
    } else if (currentOperation === "x") {
        numArray[operationIndex] = Math.round((firstNumber * secondNumber) * 1000) / 1000;
    } else if (currentOperation === "÷") {
        numArray[operationIndex] = Math.round((firstNumber / secondNumber) * 1000) / 1000;
    } else {
        numArray[operationIndex] = Math.round((firstNumber ** secondNumber) * 1000) / 1000;
    }
    // Below line is to remove second number. First one is replaced by the result. This is necessary as we get one
    // result out of two number inputs.
    operArray.splice(operationIndex, 1);
    numArray.splice((operationIndex + 1), 1);
}

function findPrecedentIndex() {
    let precendentIndex = 0;
    let currentHighestPrecendence = 0;
    for (let i = 0; i < operArray.length; i++) {
        if (PRECEDENCEDICT[operArray[i]] > currentHighestPrecendence) {
            currentHighestPrecendence = PRECEDENCEDICT[operArray[i]];
            precendentIndex = i;
        }
    }
    return precendentIndex;
}

function getOper() {
    const currentIndex = inputLine.textContent.length - 2;
    const currentOperator = inputLine.textContent[currentIndex];
    operArray.push(currentOperator);
    getNum(currentIndex);
}

function getNum(currentIndex) {
    numArray.push(+inputLine.textContent.slice(previousIndex, currentIndex));
    previousIndex = currentIndex + 1;
}

function updateScreen(result) {
    resultLine.textContent = inputLine.textContent;
    inputLine.textContent = result;
}

function enterNumber() {
    // Disable dot from being used more than once per number.
    if (this.textContent === ".") {
        dotButton.disabled = true;
    }
    // Re-enable equals after a number is entered. This way user can not use an operation and equals right after.
    equalsButton.disabled = false;
    inputLine.textContent += `${this.textContent}`;
}

function enterOperator() {
    // Prevent user from chaining operators. There is always a space after an operator.
    if (inputLine.textContent[inputLine.textContent.length - 1] === " ") {
        return;
    }
    inputLine.textContent += ` ${this.textContent} `;
    // After an operator dot button can be used again as whatever is entered will be 
    // stored as a new number with only one dot.
    dotButton.disabled = false;
    // We need to prevent user from using equals right after entering an operator (without a second number).
    equalsButton.disabled = true;

    getOper();
}

function deleteChar() {
    const deletedCharacter = inputLine.textContent.charAt(inputLine.textContent.length - 1);
    // There is always a space before and after an operator. Use that to determine if an operator was deleted.
    if (deletedCharacter === " ") {
        inputLine.textContent = inputLine.textContent.slice(0, -3);
        // Re-enable equals as deleting an operator leaves a number in the end.
        equalsButton.disabled = false;
        // Pop both the latest number and operator. A number is registered to the array when an operator is used
        // so we have to reset that too.
        numArray.pop();
        operArray.pop();
    } else {
        inputLine.textContent = inputLine.textContent.slice(0, -1);
        // Re-enable dot button if a dot was deleted because that means dots are not being chained.
        if (deletedCharacter === ".") {
            dotButton.disabled = false;
        }
    }
}

function clearScreen() {
    // Reset the buttons to initial state.
    dotButton.disabled = false;
    equalsButton.disabled = false;
    // Empty the arrays.
    numArray.length = 0;
    operArray.length = 0;
    // Empty the screen.
    inputLine.textContent = "";
    resultLine.textContent = "";
    // Reset previousIndex to initial state.
    previousIndex = 0;
}

const PRECEDENCEDICT = {
    "+": 1,
    "-": 1,
    "x": 2,
    "÷": 2,
};

const inputLine = document.querySelector("h2");
const resultLine = document.querySelector("h3");
const numButtons = document.querySelectorAll(".nums");
const operButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const dotButton = document.querySelector(".dot");
const deleteButton = document.querySelector("#delete");
const clearButton = document.querySelector("#clear");
const numArray = [];
const operArray = [];
let previousIndex = 0;

numButtons.forEach((button) => {
    button.addEventListener("click", enterNumber);
});
operButtons.forEach((button) => {
    button.addEventListener("click", enterOperator);
});
equalsButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clearScreen);
deleteButton.addEventListener("click", deleteChar);