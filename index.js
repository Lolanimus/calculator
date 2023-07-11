let buttons = document.querySelectorAll('button');
let display = document.querySelector('.display');
let firstNumber;
let operator;
let secondNumber;
let operClicked = false;
let numClicked = false;
let equalsClicked = false;
let operAndNumClicked = false;
let tempNum = '';

function add(a, b) {
    return a + b; 
}

function subtract(a, b) {
    return a - b; 
}

function multiply(a, b) {
    return a * b; 
}

function divide(a, b) {
    return a / b; 
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
    if(oper.textContent == '+') return add(a, b);
    if(oper.textContent == '-') return subtract(a, b);
    if(oper.textContent == '*') return multiply(a, b);
    if(oper.textContent == '/') return divide(a, b);
}

function doTheEquation(a, oper, b) {
    a = fromStringtoNumA(a);
    b = fromStringtoNumB(b);
    return operatorDeterminizer(a, oper, b);
}

function pushNumber(number) {
    if(operClicked) {
        tempNum += number.id;
    } else {
        display.textContent += number.id;
    }
    numClicked = true;
    doTheLogic();
}

function pushOperator(oper) {
    operator = oper;
    operClicked = true;
    doTheLogic();
}

function pushEquals() {
    equalsClicked = true;
    doTheLogic();
}

function pushClear() {
    display.textContent = '';
    tempNum = '';
    firstNumber = '';
    secondNumber = '';
}

function operIsClickedFalse() {
    buttons.forEach(item => {
        if (item.classList.contains('oper')) {
            operClicked = false;
        }
    })
}

function numIsClickedFalse() {
    buttons.forEach(item => {
        if (item.classList.contains('num')) {
            numClicked = false;
        }
    })
}

function equalsIsClickedFalse() {
    buttons.forEach(item => {
        if (item.classList.contains('equals')) {
            equalsClicked = false;
        }
    })
}

function operAndNumAreClicked() {
    if(operClicked && numClicked) {
        firstNumber = display.textContent;
        display.textContent = tempNum;
        operAndNumClicked = true;
        operIsClickedFalse();
    }
    numIsClickedFalse();
}

function secondNumberDetermenizer() {
    if(!equalsClicked) {
        secondNumber = display.textContent;
    } else {
        firstNumber = doTheEquation(firstNumber, operator, secondNumber);
        display.textContent = firstNumber;
    }
}

function doTheLogic() {
    operAndNumAreClicked();
    if(operAndNumClicked) {
        secondNumberDetermenizer();
        tempNum = '';
        equalsIsClickedFalse();
    }
}