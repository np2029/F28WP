let list = document.getElementById("bodytoc").getElementsByTagName("tr");
let color = true;
for (let x = 0; x < list.length; x++) {
    if (color) {
        list[x].style.backgroundColor = "rgba(255,150,0,0.5)";
        color = false;
    }
    else {
        list[x].style.backgroundColor = "rgba(255,80,0,0.5)";
        color = true;
    }

}