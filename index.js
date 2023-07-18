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
let pushDotBoolean = false;

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
    if(typeof a === 'string') {
        if(a.includes('.')) {
            return parseFloat(a);
        } else {
            return parseInt(a);
        }
    } else {
        return a;
    }
}

function fromStringtoNumB(b) {
    if(typeof b === 'string') {
        if(b.includes('.')) {
            return parseFloat(b);
        } else {
            return parseInt(b);
        }
    } else {
        return b;
    }
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

window.addEventListener('keydown', e => {
    const button = document.querySelector(`button[code=${e.code}]`);
    if(!isNaN(button.textContent)) {
        pushNumber(button);
    } else {
        switch (button.textContent) {
            case '+':
            case '-':
            case '*':
            case '/':
                pushOperator(button);
                break;

            case '=':
                pushEquals();
                break;

            case 'CE':
                pushClear();
                break;

            case '.':
                pushDot();
                break;

            default:
                break;
        }
    }
})

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

function pushDot() {
    pushDotBoolean = true;
    if(operClickedOnce === 0) {
        if(firstNumber === '') {
            firstNumber = '0.'
            display.textContent = firstNumber;
        } else if(firstNumber.length > 0 && !firstNumber.includes('.')) {
            firstNumber += '.'
            display.textContent = firstNumber;
        }
    } else {
        if(tempNum === '') {
            tempNum = '0.'
            display.textContent = tempNum;
        } else if(tempNum.length > 0 && !tempNum.includes('.')) {
            tempNum += '.'
            display.textContent = tempNum;
        }
    }
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
    if(result.toString().includes('.')) {
        result.toFixed(3)
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