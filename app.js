$(function() {
    let result = 0,
        firstNum = '0',
        secondNum = '0',
        operation = null,
        history = [];
    
    renderScreen();

    // Click Events:
    $('.number').on('click', numberPress);
    $("td[data-id='.']").on('click', dotPress);
    $("td[data-id='backspace']").on('click', backspacePress);
    $('.operation').on('click', operationPress);
    $("td[data-id='=']").on('click', enterPress);

    // Keypress Events:
    $(document).keydown(function(event){

        // number keypress:
        if(event.which == 49 || event.which == 97){
            numberPress(1);
        } else if (event.which == 50 || event.which == 98){
            numberPress(2);
        } else if (event.which == 51 || event.which == 99){
            numberPress(3);
        } else if (event.which == 52 || event.which == 100){
            numberPress(4);
        } else if (event.which == 53 || event.which == 101){
            numberPress(5);
        } else if (event.which == 54 || event.which == 102){
            numberPress(6);
        } else if (event.which == 55 || event.which == 103){
            numberPress(7);
        } else if ((event.which == 56 && event.shiftKey == false) || event.which == 104 ){
            numberPress(8);
        } else if (event.which == 57 || event.which == 105){
            numberPress(9);
        } else if (event.which == 48 || event.which == 96){
            numberPress(0);
        } else if (event.which == 46 || event.which == 110){ 
            // "." Dot Press 
            dotPress();
        } else if (event.which == 8){ 
            // Backspace Press
            backspacePress();
        } else if (event.which == 191 || event.which == 111){ 
            // Operation Presses
            operationPress("/");
        } else if (event.which == 187 || event.which == 107){ 
            operationPress("+");
        } else if (event.which == 56 || event.which == 106){ 
            operationPress("*");
        } else if (event.which == 189 || event.which == 109){ 
            operationPress("-");
        } else if (event.which == 13){ 
            // Enter Press
            enterPress();
        }
    });

    function numberPress(e){
        var num = typeof e === 'number' ? e.toString() : $(this).attr("data-id");
        
        if(!operation){
        firstNum === '0' ? firstNum = num : firstNum += num;
        } else if (operation && result == 0) {
        secondNum === '0' ? secondNum = num : secondNum += num;
        } else if(result) { 
            secondNum = '0';
            operation = null;
            result = 0;
            firstNum = num;
        }
        renderScreen();
    };

    function dotPress() {
        var dot = '.';
        if(firstNum && !operation){
            if(!firstNum.includes(dot)) firstNum += dot; 
        }
        if(firstNum && operation && result === 0){
            if(!secondNum.includes(dot)) secondNum += dot;
        }
        if(firstNum && operation && secondNum !=='0' && result !== 0){
            if(result && !result.toString().includes(dot)){
                secondNum = '0';
                operation = null;
                firstNum = result + ".";
                result = 0;
                renderScreen();
                return;
            } 
        }
        renderScreen();
    }

    function backspacePress() {
        !operation ? firstNum = firstNum.slice(0, -1) : secondNum = secondNum.slice(0, -1);
        renderScreen();
    };

    function operationPress(e){
        operation = typeof e == 'string' ? e : $(this).attr("data-id");
        if(result != 0){
            firstNum = result;
            result = 0;
            secondNum = '0';
        }
        renderScreen();
    }

    function enterPress() {
        let a = parseFloat(firstNum);
        let b = parseFloat(secondNum);

        if(operation === null) return;
        if(operation === '+') result = a+b;
        if(operation === '-') result = a-b;
        if(operation === '*') result = a*b;
        if(operation === '/') result = a/b;

        storeHistory();
        renderScreen();
    }

    $("td[data-id='CE']").on('click', function(e) {
        if (firstNum && !operation) firstNum = '0';
        if (firstNum && operation && secondNum === '0') operation = null;
        if (firstNum && operation && secondNum !== '0' && result === 0) secondNum = '0';
        if (firstNum && operation && secondNum !== '0' && result !== 0) result = 0;
        renderScreen();
    });

    $("td[data-id='C']").on('click', function(e) {
        firstNum = '0';
        operation = null;
        secondNum = '0';
        result = 0;
        renderScreen();
    });

    $("td[data-id='percentage']").on('click', function(e) {
        if (firstNum && !operation) firstNum = firstNum / 100;
        if (firstNum && operation && secondNum === '0') return;
        if (firstNum && operation && secondNum !== '0' && result === 0) secondNum = secondNum/100;
        if (firstNum && operation && secondNum !== '0' && result !== 0) {
            secondNum = '0';
            operation = null;
            firstNum = result/100;
            result = 0;
        };
        renderScreen();
    });

    $("td[data-id='+/-']").on('click', function(e) {
        if (firstNum && !operation) firstNum = firstNum *= -1;
        if (firstNum && operation && secondNum === '0') return;
        if (firstNum && operation && secondNum !== '0' && result === 0) secondNum = secondNum *= -1;
        if (firstNum && operation && secondNum !== '0' && result !== 0) {
            secondNum = '0';
            operation = null;
            firstNum = result *= -1;
            result = 0;
        };
        renderScreen();
    });

    $("td[data-id='square-root']").on('click', function(e) {
        if (firstNum && !operation) firstNum = Math.sqrt(firstNum);
        if (firstNum && operation && secondNum === '0') return;
        if (firstNum && operation && secondNum !== '0' && result === 0) secondNum = Math.sqrt(secondNum);
        if (firstNum && operation && secondNum !== '0' && result !== 0) {
            secondNum = '0';
            operation = null;
            firstNum = Math.sqrt(result);
            result = 0;
        };
        renderScreen();
    });

    $("td[data-id='squared']").on('click', function(e) {
        if (firstNum && !operation) firstNum = firstNum * firstNum;
        if (firstNum && operation && secondNum === '0') return;
        if (firstNum && operation && secondNum !== '0' && result === 0) secondNum = secondNum * secondNum;
        if (firstNum && operation && secondNum !== '0' && result !== 0) {
            secondNum = '0';
            operation = null;
            firstNum = result * result;
            result = 0;
        };
        renderScreen();
    });

    $("td[data-id='1/x']").on('click', function(e) {
        if (firstNum && !operation) firstNum = 1/firstNum;
        if (firstNum && operation && secondNum === '0') return;
        if (firstNum && operation && secondNum !== '0' && result === 0) secondNum = 1/secondNum;
        if (firstNum && operation && secondNum !== '0' && result !== 0) {
            secondNum = '0';
            operation = null;
            firstNum = 1/result;
            result = 0;
        };
        renderScreen();
    });
    
    function renderScreen(){
        if (firstNum == '0') {
            $('#screen').text(`0`);
            $('#prev-screen').text(``);
        }
        if (firstNum != '0' && !operation) {
            $('#screen').text(`${firstNum}`);
            $('#prev-screen').text(``);
        }
        if (firstNum != '0' && operation) {
            $('#prev-screen').text(`${firstNum} ${operation}`);
            $('#screen').text(`${firstNum}`);
        }
        if (firstNum != '0' && operation && secondNum !== '0') {
            $('#prev-screen').text(`${firstNum} ${operation}`);
            $('#screen').text(`${secondNum}`);
        } 
        if (firstNum != '0' && operation && secondNum != '0' && result) {
            $('#prev-screen').text(`${firstNum} ${operation} ${secondNum} =`);
            $('#screen').text(`${result}`);
        }
    }

    $(".history").on('click', openHistory);

    function openHistory(e) {

        $('.overlay').addClass('overlay-active');
        $('.head-history').addClass('thead-history');

        let closeBtn = $("<th class='close text-right'>&#10227;</th>");
        
        $('.history').replaceWith(closeBtn);
        $(closeBtn).on('click', returnBtn); 

        if(history.length > 0){
        //Generate tr/td for each element in the history array.
            for (let i = 0; i < history.length; i++){
                let historyItemPrev = $("<tr class='temp-history'></tr>");
                historyItemPrev.html(`
                    <td class="prev-screen" colspan="4">${`${history[i].firstNum} ${history[i].operation} ${history[i].secondNum} =`}</td>
                `);

                let historyItem = $("<tr class='temp-history'></tr>");
                historyItem.html(`
                    <td class="screen" colspan="4">${history[i].result}</td>
                `);

                $('.overlay').prepend(historyItem);
                $('.overlay').prepend(historyItemPrev);
            };
                let deleteBtn = $(`
                    <tr class='delete'> 
                        <td class="delete-icon" colspan="4">&#128465;</td>
                    </tr>
                    `);
                
                $('.overlay').append(deleteBtn);
                $(deleteBtn).on('click', deleteHistory);
        } else {
            let noHistory = $("<tr class='temp-history'></tr>");
            noHistory.html(`
                    <td class="no-history" colspan="4">There's no history yet</td>
            `);
            $('.overlay').append(noHistory);
        }

        renderScreen();
    };

    function storeHistory(){
        let prevEvent = {
            firstNum: firstNum,
            secondNum: secondNum,
            operation: operation,
            result: result
        };
        history.push(prevEvent);
    };

    function returnBtn(e){
        $(".temp-history").remove();
        $(".delete").remove();
        $(".main-body-item").show();
        $('.head-history').removeClass('thead-history');
        $('.overlay').removeClass('overlay-active');

        let history = $('<th class="history">&#10227;</th>');
        $('.close').replaceWith(history);
        $(".history").on('click', openHistory);

        renderScreen();
    };
    
    function deleteHistory(){
        history = [];
        $(".temp-history").remove();
        $(".delete").remove();
        openHistory();
    }
});