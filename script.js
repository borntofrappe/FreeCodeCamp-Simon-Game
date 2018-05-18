// target all buttons
const buttons = document.querySelectorAll(".btn");

// create an array in which to store the colors of the pressed buttons
let buttonPresses = [];

// every two seconds
let intervalId = setInterval(function() {
    // select a random button
    let randomIndex = Math.floor(Math.random()*4);
    let randomButton = buttons[randomIndex];

    // call a function which simulates the press of the random button
    pressButton(randomButton);
    // push in the array the color of the button press, as per the data attribute
    buttonPresses.push(randomButton.dataset.color);

    // log the array of colors
    console.log(buttonPresses);

    // when reaching 20 colors, clear the interval and stop the code-block
    if(buttonPresses.length == 20) {
        clearInterval(intervalId);
    }
}, 2000);

// declare a function which adds a class of pressed and removes it after a second
function pressButton(btn) {
    btn.classList.add("btn-pressed")
    setTimeout(function() {
        btn.classList.remove("btn-pressed");
    }, 1000);
}



