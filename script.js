"use strict";

function operPressed() {
    const currentIndex = inputLine.textContent.length - 1;
    const currentOperator = inputLine.textContent[currentIndex];
    operArray.push(currentOperator);
    getNum(currentIndex);
}

function getNum(currentIndex) {
    numArray.push(+inputLine.textContent.slice(previousIndex, currentIndex));
    previousIndex = currentIndex;
}

const inputLine = document.querySelector("h2");
const resultLine = document.querySelector("h3");
const numArray = [];
const operArray = [];
let previousIndex = 0;
