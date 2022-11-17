"use strict";

function calculate() {
    const numberOfOperations = operArray.length;
    for(let i = 0; i < numberOfOperations; i++) {
        operate();
    }
}

function operate() {
    //
}

function findPrecedentFunction() {

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
