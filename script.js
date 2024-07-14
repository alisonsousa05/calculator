const calculator = document.querySelector("div[class='calculator']");
const visor = document.querySelector('p');
let visorExpression = "0";
let numberOfOperators = 0;
let secondNumber = '';
let operator = '';


calculator.addEventListener("click", (event) =>{
    const target = event.target;
    if (target.className == "visor" || target == visor){
        return;
    }
    else if(target.className == "btn" && target.textContent[visor.textContent.length-1] != "." && (visor.textContent[visor.textContent.length-1]!='+'||visor.textContent[visor.textContent.length-1]!='-'
        ||visor.textContent[visor.textContent.length-1]!='*'||visor.textContent[visor.textContent.length-1]!='/')){
        const expression = visor.textContent + target.textContent;
        if (expression == "00"){
            return;
        }
        const result = evaluateNumericalExpression(expression);
        visor.textContent = result[0];
        if(operator==''){
            visorExpression = result[1];
        }
        else{
            secondNumber = result[1];
        }
    }
    else if(target.textContent=="AC"){
        visor.textContent="0";
        visorExpression = "0";
        operator='';
        secondNumber='';
        numberOfOperators=0;
    }
    else if(target.textContent=="."){
        const expression = visor.textContent + target.textContent 
        pointEvaluated = evaluatePoint(expression);
        visor.textContent = pointEvaluated;
        if(operator==''){
            visorExpression = pointEvaluated;
        }
        else{
            secondNumber = pointEvaluated;
        }
    }
    else if(target.textContent=="+/-"){
        if (visor.textContent[0] =="-"){
            visor.textContent = visor.textContent.substring(1, visor.textContent.length);
            if(operator==''){
                visorExpression = visorExpression.substring(1, expression.length);
            }
            else{
                secondNumber = secondNumber.substring(1, expression.length);
            }
        }
        else if(visor.textContent=='0'){
            return;
        }
        else{
            visor.textContent = '-' + visor.textContent;
            if(operator==''){
                visorExpression = '-' + visorExpression;
            }
            else{
                secondNumber = '-' + secondNumber;
            }
        }
    }
    else if(target.className == "btn-column"){
        numberOfOperators+=1;
        const expression = visor.textContent + target.textContent;
        const operatorEvalutead = evaluateOperator(expression);
        visor.textContent = operatorEvalutead;

    }
    else if(target.className == "btn" && target.textContent != "." && operator!='' && numberOfOperators==1 && secondNumber==''){
        visor.textContent = target.textContent;
        secondNumber = target.textContent;
    }


})
function evaluateNumericalExpression(numExpression){
    if (numExpression[0] == '0' && (numExpression[1]!='.')){
        return [numExpression[1], numExpression[1]];
    }
    else if(numExpression.length>=12){
        return [numExpression.substring(0,12), numExpression];
    }
    else{
        return[numExpression, numExpression];
    }
}
function evaluatePoint(pointExpression){
    let count = 0;
    for (let digit of pointExpression){
        if (digit=='.'){
            count += 1;
        }
    }
    if (count == 2){
        return pointExpression.substring(0, pointExpression.length-1);
    }
    else{
        return pointExpression;
    }
}

function evaluateOperator(operatorExpression){
    let size = operatorExpression.length;
    if(operatorExpression[size-1]=='x'){
        operatorExpression = operatorExpression.substring(0, size-1) + '*';
    }
    /*for (let i = 0; i<operatorExpression.length; i++){
        if (operatorExpression[i]=='+' || operatorExpression[i]=='-' || operatorExpression[i]=='*' || operatorExpression[i]=='=' ||
        operatorExpression[i]=='/'){
            numberOfOperators+=1;
            }
    }*/
    if(numberOfOperators==1 && operatorExpression[size-1]=="="){
        numberOfOperators -=1;
        return operatorExpression = operatorExpression.substring(0, size-1);
    }

    if((operatorExpression[size-1]=='+' || operatorExpression[size-1]=='-' || operatorExpression[size-1]=='*' || operatorExpression[size-1]=='=' ||
        operatorExpression[size-1]=='/') &&
        (operatorExpression[size-2]=='+' || operatorExpression[size-2]=='-' || operatorExpression[size-2]=='*' || operatorExpression[size-2]=='=' ||
        operatorExpression[size-2]=='/')){
            numberOfOperators -=1;
            return operatorExpression = operatorExpression.substring(0, size-2) + operatorExpression[size-1];
            
        }
    operator = operatorExpression[size-1];
    visorExpression = operatorExpression.substring(0, size-1);
    if(numberOfOperators==2){
        
    }
    return operatorExpression;
}

