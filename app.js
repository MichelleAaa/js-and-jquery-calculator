$(function() {
    let result = 0;
    let firstNum = '0';
    let secondNum = '0';
    let operation = null;
    
    $('.number').on('click', function(e){
        var num = $(this).attr("data-id");
        
        if(!operation){
        firstNum === '0' ? firstNum = num : firstNum += num;
        console.log(firstNum);
        } else if (operation && result == 0) {
        secondNum === '0' ? secondNum = num : secondNum += num;
        } else if(result) {
            //A pass has already been made on the calculator (there is a result), and the user is entering a new value.
            secondNum = '0';
            operation = null;
            result = 0;
            firstNum = num;
        }
        renderScreen();
    });

    $("td[data-id='.']").on('click', function(e) {
        var dot = '.';

        if(result && !result.toString().includes('.')){
            //A pass has already been made on the calculator (there is a result) and the result doesn't include a .
            secondNum = '0';
            operation = null;
            firstNum = result + ".";
            result = 0;
        } else if (result && !result.toString().includes('.')){
            //A pass has been made on the calculator and the result includes a . already.
            return;
        } else if(!operation){
        if(firstNum.includes('.')) return;
        firstNum === '0' ? firstNum = dot : firstNum += dot;
        } else {
        if(secondNum.includes('.')) return;
        secondNum === '0' ? secondNum = dot : secondNum += dot;
        
        }
        renderScreen();
    });

    $("td[data-id='backspace']").on('click', function(e) {
        !operation ? firstNum = firstNum.slice(0, -1) : secondNum = secondNum.slice(0, -1);
        console.log(firstNum, secondNum);
        renderScreen();
    });

    $('.operation').on('click', function(e){
        operation = $(this).attr("data-id");
        if(result != 0){
            firstNum = result;
            result = 0;
            secondNum = '0';
        }
        renderScreen();
    });

    $("td[data-id='=']").on('click', function(e) {
        let a = parseFloat(firstNum);
        let b = parseFloat(secondNum);

        if(operation === null) return;
        if(operation === '+') result = a+b;
        if(operation === '-') result = a-b;
        if(operation === '*') result = a*b;
        if(operation === '/') result = a/b;

        renderScreen();
    });

    $("td[data-id='CE']").on('click', function(e) {
        if (firstNum && !operation) firstNum = '0';
        if (firstNum && operation && secondNum === '0') operation = null;
        if (firstNum && operation && secondNum !== '0') secondNum = '0';
        renderScreen();
    });

    $("td[data-id='C']").on('click', function(e) {
        firstNum = '0';
        operation = null;
        secondNum = '0';
        result = 0;
        renderScreen();
    });
    
    function renderScreen(){
        if (!firstNum) $('#screen').text(`0`);
        if (firstNum && !operation) $('#screen').text(`${firstNum}`);
        if (firstNum && operation) $('#screen').text(`${firstNum} ${operation}`);
        if (firstNum && operation && secondNum !== '0')  $('#screen').text(`${firstNum} ${operation} ${secondNum}`);
        if (firstNum && operation && secondNum && result)  $('#screen').text(`${firstNum} ${operation} ${secondNum} = ${result}`);
    }

    //pending %, +/-, sq, x2

});
