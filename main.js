class Calculator {
    constructor(previousOperandTextContent, currentOperandTextContent) {
        this.previousOperandTextContent = previousOperandTextContent
        this.currentOperandTextContent = currentOperandTextContent
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return // if '.' already exist it wont make another '.'
        this.currentOperand = this.currentOperand.toString() + number.toString() //convert it to string so that it wont add the numbers
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return 
        if(this.previousOperand !== '') {
            this.compute()
        } 
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case 'x':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            case '%':
                computation = `(${prev} / 100) ${this.operation} ${current}`
                break;
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextContent.textContent = this.currentOperand
        this.previousOperandTextContent.textContent = this.previousOperand
    }

}

const numberButtons = document.querySelectorAll('.numbers');
const operationButtons = document.querySelectorAll('.operator');
const equalbutton = document.querySelector('.equals');
const deleteButton = document.querySelector('.delete');
const clearAll = document.querySelector('.clear');
const previousOperandTextContent = document.querySelector('.previous-operand');
const currentOperandTextContent = document.querySelector('.current-operand');


const calculator = new Calculator(previousOperandTextContent, currentOperandTextContent)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })
})

equalbutton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearAll.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})