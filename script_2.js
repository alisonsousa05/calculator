const p = document.querySelector('p');
// let visor = p.textContent;
const calculadora = document.querySelector('.calculator');
let firstNumber = '0';
let secondNumber = '';
let operator = '';
let numberOfOperators=0;


function evaluatePoint(expression){
    let numberOfPoints=0;
    if(p.textContent[p.textContent.length-1]=='+'||p.textContent[p.textContent.length-1]=='-'||p.textContent[p.textContent.length-1]=='*'
        ||p.textContent[p.textContent.length-1]=='/'){
        return '0.';
    }
    for (let digit of expression){
        if (digit=='.'){
            numberOfPoints+=1;
        }
    }
    if (numberOfPoints>1){
        return expression.substring(0, expression.length-1);
    }
    else{
        return expression;
    }

}

function evaluateExpression(expression){
    if(expression[0]=="0" && expression[1]=="0"){
        return expression[0];
    }
    else if(expression[0]=='0' && expression[1]!='.'){
        return expression[1];
    }
    else if(expression[expression.length-2]=='+'||expression[expression.length-2]=='-'||expression[expression.length-2]=='*'
        ||expression[expression.length-2]=='/'){
            return expression[expression.length-1];
        }
    else{
        return expression;
    }
}

function evaluateSignal(expression){
    if(expression=='0'){
        return '0';
    }

    else if(expression[0]=='-'){
        return expression.substring(1);
    }
    else{
        return "-" + expression;
    }
}

function evaluateOperator(expression){
    let size = expression.length;
    if(expression[size-1]=="x"){
        expression = expression.substring(0,size-1) + '*';
    }
    if(numberOfOperators==1 && expression[size-1]=='='){
        numberOfOperators -= 1;
        return expression.substring(0, size-1);
    }
    if(numberOfOperators==2 && (expression[size-2]=='+'||expression[size-2]=='-'||expression[size-2]=='*'||expression[size-2]=='/'
    ||expression[size-2]=='=')){
        numberOfOperators-=1;
        if(expression[size-1] == '='){
            return expression.substring(0, size-1);
        }
        else{
            return expression.substring(0, size-2) + expression[size-1];
        }
    }
    if(numberOfOperators==1){
        operator = expression[size-1]
        firstNumber = expression.substring(0,size-1);
        return expression;
    }
    if(numberOfOperators==2){
        if(expression[size-1]=='='){
            if(operator=='+'){
                let num1 = parseFloat(firstNumber);
                let num2 = parseFloat(secondNumber);
                let result = num1+num2;
                result= Math.round(result * 10000) / 10000;
                operator="";
                firstNumber=result;
                numberOfOperators=0;
                secondNumber='';
                return firstNumber;
            }
            if(operator=='-'){
                let num1 = parseFloat(firstNumber);
                let num2 = parseFloat(secondNumber);
                let result = num1-num2;
                result= Math.round(result * 10000) / 10000;
                operator="";
                firstNumber=result;
                numberOfOperators=0;
                secondNumber='';
                return firstNumber;
            }
            if(operator=='*'){
                let num1 = parseFloat(firstNumber);
                let num2 = parseFloat(secondNumber);
                let result = num1*num2;
                result= Math.round(result * 10000) / 10000;
                operator="";
                firstNumber=result;
                numberOfOperators=0;
                secondNumber='';
                return firstNumber;
            }
            if(operator=='/'){
                let num1 = parseFloat(firstNumber);
                let num2 = parseFloat(secondNumber);
                if (num2==0){
                    return "VAI SE LASCAR";
                }
                let result = num1/num2;
                operator="";
                result= Math.round(result * 10000) / 10000;
                firstNumber=result;
                numberOfOperators=0;
                secondNumber='';
                return firstNumber;
            }
        }
        if(operator=='+'){
            let num1 = parseFloat(firstNumber);
            let num2 = parseFloat(secondNumber);
            let result = num1+num2;
            result= Math.round(result * 10000) / 10000;
            operator=expression[size-1];
            firstNumber=result;
            numberOfOperators=1;
            secondNumber='';
            return firstNumber+operator;
        }
        if(operator=='-'){
            let num1 = parseFloat(firstNumber);
            let num2 = parseFloat(secondNumber);
            let result = num1-num2;
            result= Math.round(result * 10000) / 10000;
            operator=expression[size-1];
            firstNumber=result;
            numberOfOperators=1;
            secondNumber='';
            return firstNumber+operator;
        }
        if(operator=='*'){
            console.log(firstNumber);
            console.log(secondNumber);
            let num1 = parseFloat(firstNumber);
            let num2 = parseFloat(secondNumber);
            let result = num1*num2;
            result= Math.round(result * 10000) / 10000;
            operator=expression[size-1];
            firstNumber=result;
            numberOfOperators=1;
            secondNumber='';
            return firstNumber+operator;
        }
        if(operator=='/'){
            let num1 = parseFloat(firstNumber);
            let num2 = parseFloat(secondNumber);
            if (num2==0){
                return "VAI SE LASCAR";
            }
            let result = num1/num2;
            result= Math.round(result * 10000) / 10000;
            operator=expression[size-1];
            firstNumber=result;
            numberOfOperators=1;
            secondNumber='';
            return firstNumber+operator;
        }
    }
}

if(numberOfOperators==0){
    calculadora.addEventListener("click", (event) =>{
        const target = event.target;
        const button = target.textContent;
        if (button=='AC'){
            firstNumber = '0';
            secondNumber='';
            operator='';
            numberOfOperators=0;
            p.textContent = '0';
        }
        if(button=='.'){
            let result = evaluatePoint(p.textContent + button);
            p.textContent = result;
            if(numberOfOperators==0){
                firstNumber = result;
            }
            else{
                secondNumber = result;
            }
        }
        if(target.className=='btn' && button!="."){
            let result = evaluateExpression(p.textContent + button);
            p.textContent = result;
            if(numberOfOperators==0){
                firstNumber = result;
            }
            else{
                secondNumber = result;
            }
        }
        if(button=='+/-'){
            let result = evaluateSignal(p.textContent);
            p.textContent = result;
            if(numberOfOperators==0){
                firstNumber = result;
            }
            else{
                secondNumber = result;
            }
        }
        if(target.className=='btn-column'){
            numberOfOperators +=1;
            let result = evaluateOperator(p.textContent + button);
            p.textContent = result;

        }
        if(button=="%"){
            let result = p.textContent;
            result= Math.round(result * 10000) / 100000; 
            p.textContent=result;
            if(numberOfOperators==0){
                firstNumber = result;
            }
            else{
                secondNumber = result;
            }
        }

      
})
}




/*
if(numberOfOperators==1){
    calculadora.addEventListener("click", (event) =>{
        const target = event.target;
        const button = target.textContent;
        if (button=='AC'){
            firstNumber = '0';
            secondNumber='';
            operator='';
            numberOfOperators=0;
            p.textContent = '0';
        }
        if(button=='.'){
            let result = evaluatePoint(p.textContent + button);
            p.textContent = result;
            secondNumber = result;
        }
        if(target.className=='btn' && button!="."){
            let result = evaluateExpression(p.textContent + button);
            p.textContent = result;
            secondNumber = result;
        }
        if(button=='+/-'){
            let result = evaluateSignal(p.textContent);
            p.textContent = result;
            secondNumber = result;
        }
        if(target.className=='btn-column'){
            numberOfOperators +=1;
            let result = evaluateOperator(p.textContent + button);
            p.textContent = result;
        }

    
})
}
*/