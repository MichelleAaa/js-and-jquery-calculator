$(function() {
    let result = 0;
    let firstNum = '0';
    let secondNum = '0';
    let operation = null;
    let history = [];
    
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
        if(firstNum && !operation){
            if(!firstNum.includes(dot)) firstNum += dot; 
        }
        if(firstNum && operation && result === 0){
            if(!secondNum.includes(dot)) secondNum += dot;
        }
        if(firstNum && operation && secondNum !=='0' && result !== 0){
            if(result && !result.toString().includes(dot)){
                //A pass has already been made on the calculator (there is a result) and the result doesn't include a .
                secondNum = '0';
                operation = null;
                firstNum = result + ".";
                result = 0;
                renderScreen();
                return;
            } 
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

        storeHistory();
        renderScreen();
    });

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
        console.log(firstNum);
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
        console.log(firstNum);
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
        if (!firstNum) {
            $('#screen').text(`0`);
            $('#prev-screen').text(``);
        }
        if (firstNum && !operation) {
            $('#screen').text(`${firstNum}`);
            $('#prev-screen').text(``);
        }
        if (firstNum && operation) {
            $('#prev-screen').text(`${firstNum} ${operation}`);
            $('#screen').text(`${firstNum}`);
        }
        if (firstNum && operation && secondNum !== '0') {
            $('#prev-screen').text(`${firstNum} ${operation}`);
            $('#screen').text(`${secondNum}`);
        } 
        if (firstNum && operation && secondNum && result) {
            $('#prev-screen').text(`${firstNum} ${operation} ${secondNum} =`);
            $('#screen').text(`${result}`);
        }
    }

    $(".history").on('click', openHistory);

    function openHistory(e) {
        //Create close button for the top
        let closeBtn = $("<th class='close'>&#10227;</th>");
        
        $('.history').replaceWith(closeBtn);
        $(closeBtn).on('click', returnBtn); 

        $(".main-body-item").css("max-height", "0");
        $(".main-body-item").hide();

        if(history.length > 0){
        //loop over the array of objects. generate tr/td for each. 
            console.log(history);
            for (let i = 0; i < history.length; i++){
                let historyItemPrev = $("<tr class='temp-history'>");
                historyItemPrev.html(`
                        <td class="prev-screen" colspan="4">${`${history[i].firstNum} ${history[i].operation} ${history[i].secondNum} =`}</td>
                `);

                let historyItem = $("<tr class='temp-history'>");
                historyItem.html(`
                        <td class="screen" colspan="4">${history[i].result}</td>
                `);

                $('tbody').prepend(historyItem);
                $('tbody').prepend(historyItemPrev);
            };
            //Create delete button at the bottom
                let deleteBtn = $(`
                    <tr class='delete'> 
                        <td class="delete-icon" colspan="4">&#128465;</td>
                        </tr>
                    `);
                
                $('tbody').append(deleteBtn);
                $(deleteBtn).on('click', deleteHistory);
        } else {
            let noHistory = $("<tr class='temp-history'>");
            noHistory.html(`
                    <td class="no-history" colspan="4">There's no history yet</td>
            `);
            $('tbody').append(noHistory);
        }
         

        renderScreen();
    };

    function storeHistory(){
        //create a new object to hold the details
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
        // $("#originalTBody").show();


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
