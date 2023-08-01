class Calculator{
    constructor(currentScreen,previousScreen){
        this.currentScreen = currentScreen;
        this.previousScreen = previousScreen;
        this.clear();
    }
    clear(){
        this.current = "";
        this.previous = "";
        this.operator = undefined;
    }
    appendNumber(number){
        if(number==='.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString();
    }
    delete(){
        this.current = this.current.toString().slice(0,-1);
    }
    selectOperator(operator){
        if(this.current ==="") return
        if(this.previous !==""){
            this.compute();
        }
        this.operator = operator
        this.previous = this.current;
        this.current = "";
    }
    compute(){
        let result
        const prevValue = parseFloat(this.previous);
        const currentValue = parseFloat(this.current);
        if(isNaN(prevValue) || isNaN(currentValue)) return
        switch(this.operator){
            case "+":
                result = prevValue + currentValue;
                break;
            case "-":
                result = prevValue - currentValue;
                break;
            case "*":
                result = prevValue * currentValue;
                break;
            case "/":
                result = prevValue / currentValue;
                break;
            default:
                return;
        }
        this.current = result;
        this.operator = undefined;
        this.previous = "";
    }
        
    updateScreen(){
        this.currentScreen.innerHTML = this.current;
        if(this.operator != undefined){
            this.previousScreen.innerHTML = `${this.previous} ${this.operator}`;
        }
        else{
            this.previousScreen.innerHTML = "";
        }

    }

}

const numbers = document.querySelectorAll(".numbers");
const currentScreen = document.getElementById("current");
const previousScreen = document.getElementById("previous");
const operators = document.querySelectorAll(".operators");
const equalto = document.getElementById("equalto");
const allClear = document.getElementById("AC");
const deleteButton = document.getElementById("DEL");

const calculator = new Calculator(currentScreen,previousScreen);

numbers.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerHTML);
        calculator.updateScreen();
    });
});

operators.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.selectOperator(button.innerHTML);
        calculator.updateScreen();
    });
});
equalto.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateScreen()
    currentScreen.style.color = "green";
    setTimeout(()=>currentScreen.style.color = "white",500);
});
allClear.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateScreen();
});
deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateScreen();
});



