const list = document.getElementById("bodytoc").getElementsByTagName("tr");
// let color = true;
// for (let x = 0; x < list.length; x++) {
//     if (color) {
//         list[x].style.backgroundColor = "rgba(255,150,0,0.5)";
//         color = false;
//     }
//     else {
//         list[x].style.backgroundColor = "rgba(255,80,0,0.5)";
//         color = true;
//     }

// }
function rainbowify(list) {
    let listEntries = list.length;
    //start with red at max, increase green, decrease red, increase blue. decrease green.
    let red = 255;
    let green = 0;
    let blue = 0;
    let opac = 0.5;

    let sectionLength = Math.floor(listEntries / 4);
    let currSectionLength = sectionLength;
    let sectionMult = 0;
    let extra = listEntries % 4;
    let index = 0;

    // green 0 -> 255
    if (extra > 0) {currSectionLength = sectionLength+1;}
    else {currSectionLength = sectionLength}
    sectionMult = 1 / (currSectionLength-1)
    console.log(currSectionLength + " " + sectionMult)//TEST
    for (let x = index, i = 0; x < currSectionLength; index++, i++, x++) {
        green = sectionMult * 255 * i;
        list[index].style.backgroundColor= "rgba("+red+","+green+","+blue+","+opac+")"
    }
    console.log("index: "+index);//TEST
    extra--;

    //red 255 -> 0
    console.log("index at start of 2: "+index)//TEST
    if (extra > 0) {currSectionLength = sectionLength+1;}
    else {currSectionLength = sectionLength}
    sectionMult = 1 / (currSectionLength)
    console.log(currSectionLength + " " + sectionMult)//TEST
    for (let x = 0, i = 1; x < currSectionLength; index++, i++, x++) {
        console.log("index in 2 loop: "+index);//TEST
        red = 255 - (sectionMult * 255 * i);
        list[index].style.backgroundColor= "rgba("+red+","+green+","+blue+","+opac+")"
    }
    console.log("index: "+index);//TEST
    extra--;

    //blue 0 -> 255
    console.log("index at start of 3: "+index)//TEST
    if (extra > 0) {currSectionLength = sectionLength+1;}
    else {currSectionLength = sectionLength}
    sectionMult = 1 / (currSectionLength)
    console.log(currSectionLength + " " + sectionMult)//TEST
    for (let x = 0, i = 1; x < currSectionLength; index++, i++, x++) {
        console.log("index in 3 loop: "+index);//TEST
        blue = sectionMult * 255 * i;
        list[index].style.backgroundColor= "rgba("+red+","+green+","+blue+","+opac+")"
    }
    console.log("index: "+index);//TEST
    extra--;

    //green 255 -> 0
    console.log("index at start of 4: "+index)//TEST
    if (extra > 0) {currSectionLength = sectionLength+1;}
    else {currSectionLength = sectionLength}
    sectionMult = 1 / (currSectionLength)
    console.log(currSectionLength + " " + sectionMult)//TEST
    for (let x = 0, i = 1; x < currSectionLength; index++, i++, x++) {
        console.log("index in 4 loop: "+index);//TEST
        green = 255-(sectionMult * 255 * i);
        list[index].style.backgroundColor= "rgba("+red+","+green+","+blue+","+opac+")"
    }
    console.log("index: "+index);//TEST
    extra--;
}
rainbowify(list);