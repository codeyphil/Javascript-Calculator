var holdingValue, newValues, multiplyHolder, divideHolder, subtractHolder, decimalPlace = ".", runningResult = 0;
var adding = false, multiplying = false, dividing = false, subtracting = false;

//Appends each integer button clicked onto the previous one in the calc window.
$('[data-action=number]').on('click', function() {
  var currentVal = $(this).data('value');
    
    $('#calc-window').append(currentVal);
    
    if($('#calc-window').hasClass("operating")) {
      $('#calc-window').removeClass("operating");
      $('#calc-window').empty();
      $('#calc-window').append(currentVal);
    }
    else if ($(this).data('decimal') && $('#calc-window').text() == 0) {
        $('#calc-window').text(decimalPlace);
    }
    else if ($(this).data('decimal') && $('#calc-window').text() > 0) {
        $('#calc-window').append(decimalPlace);
    }
});
//Either fully clears the calc window, or clears the most recent entry.
$('button').on('click', function() {
    
   if($(this).data('clearer')) {
       $('#calc-window').empty();
       adding = false; 
       multiplying = false; 
       dividing = false; 
       subtracting = false;
       holdingValue = null;
       divideHolder = null;
       multiplyHolder = null;
       subtractHolder = null;
       newValues = null;
       runningResult = 0;
   } 
   else if($(this).data('clear')) {
     var calcWindow = $('#calc-window').text();
     var windowLength = calcWindow.length;
       $('#calc-window').html(calcWindow.substring(0, windowLength-1));
   }
});
// If/Else rules for the various math operations--------------
$('[data-action=operation]').on('click', function() {
    
    $('#calc-window').addClass("operating");
    
    if ($(this).data('add') && holdingValue == null) {
        adding = true;
        holdingValue = parseFloat($('#calc-window').text());
        runningResult = holdingValue;
    }
    else if ($(this).data('add') && holdingValue > 0 && adding === true) {
        adding = true;
        newValues = parseFloat($('#calc-window').text());
        runningResult += newValues;
    }
    else if ($(this).data('add') && multiplying === true) {
        adding = true;
        multiplying = false;
        multiplyHolder = parseFloat($('#calc-window').text());
        runningResult *= multiplyHolder;
    }
    else if ($(this).data('add') && dividing === true) {
        adding = true;
        dividing = false;
        divideHolder = parseFloat($('#calc-window').text());
        runningResult /= divideHolder;
    }
    else if ($(this).data('add') && subtracting === true) {
        subtracting = false;
        adding = true;
        subtractHolder = parseFloat($('#calc-window').text());
        runningResult -= subtractHolder;
    }
    else if ($(this).data('multiply') && holdingValue == null) {
        multiplying = true;
        holdingValue = parseFloat($('#calc-window').text());
        runningResult = holdingValue;
    }
    else if ($(this).data('multiply') && multiplying === true) {
        multiplyHolder = parseFloat($('#calc-window').text());
        runningResult *= multiplyHolder;
    }
    else if ($(this).data('multiply') && adding === true) {
        adding = false;
        multiplying = true;
        newValues = parseFloat($('#calc-window').text());
        runningResult += newValues;
    }
    else if ($(this).data('multiply') && dividing === true) {
        dividing = false;
        multiplying = true;
        divideHolder = parseFloat($('#calc-window').text());
        runningResult /= divideHolder;
    }
    else if ($(this).data('multiply') && subtracting === true) {
        subtracting = false;
        multiplying = true;
        subtractHolder = parseFloat($('#calc-window').text());
        runningResult -= subtractHolder;
    }
    else if ($(this).data('divide') && holdingValue == null) {
        dividing = true;
        holdingValue = parseFloat($('#calc-window').text());
        runningResult = holdingValue;
    }
    else if ($(this).data('divide') && dividing === true) {
        divideHolder = parseFloat($('#calc-window').text());
        runningResult /= divideHolder;
    }
    else if ($(this).data('divide') && adding === true) {
        adding = false;
        dividing = true;
        newValues = parseFloat($('#calc-window').text());
        runningResult += newValues;
    }
    else if ($(this).data('divide') && multiplying === true) {
        multiplying = false;
        dividing = true;
        multiplyHolder = parseFloat($('#calc-window').text());
        runningResult *= multiplyHolder;
    }
    else if ($(this).data('divide') && subtracting === true) {
        subtracting = false;
        dividing = true;
        subtractHolder = parseFloat($('#calc-window').text());
        runningResult -= subtractHolder;
    }
    else if ($(this).data('subtract') && holdingValue === null) {
        subtracting = true;
        holdingValue = parseFloat($('#calc-window').text());
        runningResult = holdingValue;
    }
    else if ($(this).data('subtract') && subtracting === true) {
        subtractHolder = parseFloat($('#calc-window').text());
        runningResult -= subtractHolder;
    }
    else if ($(this).data('subtract') && adding === true) {
        adding = false;
        subtracting = true;
        newValues = parseFloat($('#calc-window').text());
        runningResult += newValues;
    }
    else if ($(this).data('subtract') && multiplying === true) {
        multiplying = false;
        subtracting = true;
        multiplyHolder = parseFloat($('#calc-window').text());
        runningResult *= multiplyHolder;
    }
    else if($(this).data('subtract') && dividing === true) {
        dividing = false;
        subtracting = true;
        divideHolder = parseFloat($('#calc-window').text());
        runningResult /= divideHolder;
    }
    else if ($(this).data('equals')) {
        finalTotal();
    }
});

var finalTotal = function() {
   
    if (adding === true) {
        newValues = parseFloat($('#calc-window').text());
        runningResult += newValues;
    }
    else if (dividing === true) {
        divideHolder = parseFloat($('#calc-window').text());
        runningResult /= divideHolder;
    }
    else if (multiplying === true) {
        multiplyHolder = parseFloat($('#calc-window').text());
        runningResult *= multiplyHolder;
    }
    else if (subtracting === true) {
        subtractHolder = parseFloat($('#calc-window').text());
        runningResult -= subtractHolder;
    }
    $('#calc-window').text(runningResult.toFixed(2));
       adding = false; 
       multiplying = false; 
       dividing = false; 
       subtracting = false;
       holdingValue = null;
       divideHolder = 0;
       multiplyHolder = 0;
       subtractHolder = 0;
       newValues = 0;
       runningResult = 0;
};