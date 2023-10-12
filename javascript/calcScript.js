var displayText = "0";
var calc = "";

//numpad
var numArr = [];
for (let x=1;x<10;x++) {
    var y = $("<div></div>").addClass("numButton");
    y.html("<p>"+x+"</p>");
    $("#numpad").append(y);
    y.click(function() {
        numPress(x);
    });
    numArr[x] = y;
}

//add 0 button
let zero = $("<div></div>").addClass("numButton");
zero.html("<p>"+0+"</p>");
$("#numpad").append(zero);
zero.click(function() {
    numPress(0);
});
numArr[0] = zero;

// //change 10 to 0
// numArr[0] = numArr[10];
// delete(numArr[10]);
// console.log(numArr);
// numArr[0].text("0");


//operator buttons
let oppArr = ["+","-","*","/"];
for (let x=0;x<oppArr.length;x++) {
    let tempEle = $("<div></div>");
    tempEle.html("<p>"+oppArr[x]+"</p>");
    tempEle.click(function() {
        numPress(oppArr[x]);
    })
    tempEle.addClass("oppButton")
    $("#ops").append(tempEle);
}

//C button
let cancelButton = $("<div><p>C</p></div>");
cancelButton.addClass("oppButton")
cancelButton.click(function() {
    calc = "";
    displayText = "0";
    $("#display").text(displayText);
})
$("#ops").append(cancelButton);

//= button
let equalsButton = $("<div><p>=</p></div>");
equalsButton.addClass("oppButton");
equalsButton.click(function() {
    calc = ""+eval(calc);
    displayText = calc;
    $("#display").text(displayText);
})
$("#ops").append(equalsButton);


//add something to calculation
function numPress(val) {
    calc += val;
    displayText = calc;
    $("#display").text(displayText);
}