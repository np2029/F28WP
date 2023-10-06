var displayText = "0";
var calc = "";

//numpad
var numArr = [];
for (let x=1;x<11;x++) {
    var y = $("<div></div>").addClass("numButton");
    y.html("<p>"+x+"</p>");
    $("#numpad").append(y);
    y.click(function() {
        numPress(x);
    });
    numArr[x] = y;
}

//change 10 to 0
numArr[0] = numArr[10];
delete(numArr[10]);
console.log(numArr);
numArr[0].text("0");


//operator buttons
let oppArr = ["+","-","*","/"];
for (let x=0;x<oppArr.length;x++) {
    let tempEle = $("<div></div>");
    tempEle.html("<p>"+oppArr[x]+"</p>");
    tempEle.click(function() {
        numPress(oppArr[x]);
    })
    $("#ops").append(tempEle);
}

//add something to calculation
function numPress(val) {
    calc += val;
    displayText = calc;
    $("#display").text(displayText);
}
