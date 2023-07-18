let display = document.querySelector('.display');
let operator;
let tempOper;
let result;
let secondNumber = '';
let firstNumber = '';
let tempNum = '';
let operClicked = false;
let numClicked = false;
let equalsClicked = false;
let firstOperClick = true;
let isTempOper = true;
let operClickedAfterSecondNumber;
let operClickedOnce = 0;
let divideByZeroReactionBoolean = false;

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

function pushClear() {
    display.textContent = '';
    operator = undefined;
    tempOper = undefined;
    result = undefined;
    secondNumber = '';
    firstNumber = '';
    tempNum = '';
    operClicked = false;
    numClicked = false;
    equalsClicked = false;
    firstOperClick = true;
    isTempOper = true;
    operClickedAfterSecondNumber = undefined;
    operClickedOnce = 0;
}

function pushNumber(number) {
    if(divideByZeroReactionBoolean) {
        divideByZeroReactionBoolean = false;
        pushClear();
    } else {
        if(operClickedOnce === 0) {
            firstNumber += number.id;
            display.textContent = firstNumber;
        } else {
            tempNum += number.id;
            display.textContent = tempNum;
        }
        numClicked = true;
        doTheLogic();
    }
}

function pushOperator(oper) {
    if(divideByZeroReactionBoolean) {
        divideByZeroReactionBoolean = false;
        pushClear();
    } else {
        if(firstOperClick || !isTempOper) {
        operator = oper;
        firstOperClick = false;
        } else {
            tempOper = oper;
        }

        operClickedOnce++;
        operClicked = true;
        doTheLogic();
    }
}

function pushEquals() {
    if(display.textContent.length > 0) {
        equalsClicked = true;
    }
    doTheLogic();
}

function divideByZeroReaction(operat, secondNum) {
    if(operat.textContent == '/' && secondNum === '0') {
        result = "dude, you cant divide by 0...";
        divideByZeroReactionBoolean = true;
    }
}

function defineOperatorAndEvaluate() {    
    secondNumber = display.textContent;
    if(isTempOper) {
        divideByZeroReaction(operator, secondNumber);
        if(!divideByZeroReactionBoolean) {
            if(result !== undefined) {
                result = doTheEquation(result, operator, secondNumber);
            } else {
                result = doTheEquation(firstNumber, operator, secondNumber);
            }
        }
        isTempOper = false;
    } else if(!isTempOper) {
        divideByZeroReaction(operator, secondNumber);
        if(!divideByZeroReactionBoolean) {
            if(result !== undefined) {
                result = doTheEquation(result, tempOper, secondNumber);
            } else {
                result = doTheEquation(firstNumber, tempOper, secondNumber);
            }
        }
        isTempOper = true;
    }
    display.textContent = result;
    operClickedOnce = 1;
    equalsClicked = false;
    numClicked = false;
    operClickedAfterSecondNumber = false;
    tempNum = '';
    firstNumber = '';
    secondNumber = '';
}

function doTheLogic() {
    if(operClicked && operClickedOnce === 1) {
        secondNumber = tempNum;
    } else if(operClicked && operClickedOnce === 2) {
        secondNumber = tempNum;
        operClickedAfterSecondNumber = true;
    }

    if(operClickedAfterSecondNumber && numClicked && secondNumber !== ''|| equalsClicked && numClicked && secondNumber !== '') {
        defineOperatorAndEvaluate();
    }
}