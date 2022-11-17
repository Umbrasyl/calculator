"use strict";

function calculate() {
    const numberOfOperations = operArray.length;
    for(let i = 0; i < numberOfOperations; i++) {
        operate();
    }
}

function operate() {
    // TODO: Disable equals button being used right after an operator is used as there will be no number after the operation
    const operationIndex = findPrecedentIndex()
    const currentOperation = operArray[operationIndex];
    const firstNumber = numArray[operationIndex];
    const secondNumber = numArray[operationIndex + 1];
    if (currentOperation === "+") {
        numArray[currentIndex] = firstNumber + secondNumber;
    } else if (currentOperation === "-") {
        numArray[currentIndex] = firstNumber - secondNumber;
    } else if (currentOperation === "x") {
        numArray[currentIndex] = firstNumber * secondNumber;
    } else if (currentOperation === "÷") {
        numArray[currentIndex] = firstNumber / secondNumber;
    }
    // Below line is to remove second number. First one is replaced by the result. This is necessary as we get one result out
    // of two number inputs.
    numArray.splice((currentIndex + 1), 1);
}

function findPrecedentIndex() {
    const precendentIndex = 0;
    const currentHighestPrecendence = 0;
    for (let i = 0; i < operArray.length; i++) {
        if (PRECEDENCEDICT[operArray[i]] > currentHighestPrecendence) {
            precendentIndex = i;
        }
    }
    return precendentIndex;
}

function getOper() {
    const currentIndex = inputLine.textContent.length - 1;
    const currentOperator = inputLine.textContent[currentIndex];
    operArray.push(currentOperator);
    getNum(currentIndex);
}

function getNum(currentIndex) {
    numArray.push(+inputLine.textContent.slice(previousIndex, currentIndex));
    previousIndex = currentIndex;
}


const PRECEDENCEDICT = {
    "+": 1,
    "-": 1,
    "x": 2,
    "÷": 2,
};
const inputLine = document.querySelector("h2");
const resultLine = document.querySelector("h3");
const numArray = [];
const operArray = [];
let previousIndex = 0;
