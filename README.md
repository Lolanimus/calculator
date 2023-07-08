# calculator
let firstNumber;
let secondNumber;
let oper;

function ONLCICKdisplayNumber() {
    number.display();
}

function isEqualsClicked() {
    if(equals.button.isClicked()) return true;
}

function isNumClicked() {
    if(num.button.isClicked()) return true;
}

function operIsClicked() {
    if(oper.button.isCLicked()) {
        oper.button.usedAnimation();
        return true;
    }
}

function secondNumberDetermenizer(firstNumber, oper, secondNumber) {
    if(!isEqualsClicked()) {
        secondNumber = display.textContent;
    } else {
        firstNumber = doTheEquation(firstNumber, oper, secondNumber);
        display.textContent = firstNumber;
    }
}

function operAndNumAreClicked() {
    if(operIsClicked() & isNumClicked()) {
        firstNumber = display.textContent;
        display.textContent.clear();
        return true;
    }
}

function doTheCalculation(firstNumber, oper, secondNumber) {
    if(operAndNumAreClicked()) {
        secondNumberDetermenizer(firstNumber, oper, secondNumber);
    }
}

function doTheCalculation(firstNumber, oper, secondNumber);