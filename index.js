let buttons = document.querySelectorAll('button');
let resultScreen = document.querySelector('.result');
let firstNumber;
let operator;
let secondNumber;
let result;
let counter1 = 0;
let counter2 = 0;

function add(a, b) {
    resultScreen.textContent = a + b; 
    disableButtonsAfterEqual(true);
}

function subtract(a, b) {
    resultScreen.textContent = a - b; 
    disableButtonsAfterEqual(true);
}

function multiply(a, b) {
    resultScreen.textContent = a * b; 
    disableButtonsAfterEqual(true);
}

function divide(a, b) {
    resultScreen.textContent = a / b; 
    disableButtonsAfterEqual(true);
}

function fromStringtoNumA(a) {
    // if(a.includes('.')) {
    //     return parseFloat(a);
    // } else {
        return parseInt(a);
    // }
}

function fromStringtoNumB(b) {
    // if(b.includes('.')) {
    //     return parseFloat(b);
    // } else {
        return parseInt(b);
    // }
}

function operatorDeterminizer(a, oper, b) {
    if(oper == '+') add(a, b);
    if(oper == '-') subtract(a, b);
    if(oper == '*') multiply(a, b);
    if(oper == '/') divide(a, b);
}

function doTheEquation(a, oper, b) {
    a = fromStringtoNumA(a);
    b = fromStringtoNumB(b);
    operatorDeterminizer(a, oper, b);
}

function disableOper(boolean) {
    buttons.forEach(item => {
        if(item.classList.contains("oper")) {
            item.disabled = boolean;
        };
    })
}

function disableButtonsAfterEqual(boolean) {
    buttons.forEach(item => {
        if(!item.classList.contains("clear")) {
            item.disabled = boolean;
        };
    })
}

function pushNumber(element) {
    resultScreen.textContent += element.id;
}

function pushOperator(element) {
    resultScreen.textContent += element.textContent;
    disableOper(true);
}

function pushClear() {
    resultScreen.textContent = "";
    disableOper(false);
    disableButtonsAfterEqual(false);
}

function pushEqual() {
    let resultArr = resultScreen.textContent.split('');
    resultArr.forEach(item => {
        if(isNaN(item)) {
            counter1++;
            return item;
        }

        if(counter1 === 0) {
            counter2++;
            return item;
        }
    })
    firstNumber = resultArr.splice(0, counter2).join('');
    operator = resultArr.shift();
    secondNumber = resultArr.join('');
    doTheEquation(firstNumber, operator, secondNumber);
}
