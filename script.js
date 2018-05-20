// create an array in which to store the buttons pressed by the computer, randomly [re-initialized when beginning the game the first time, when restarting a game, when finishing a game]
let randomButtonSeries = [];

// target the div in which to display the score of the game 
const displayScore = document.querySelector(".display-score");

// target all buttons in the play area
const coloredButtons = document.querySelectorAll(".container__gamepad .btn");

// target the button which starts/stops the game
const toggleGameButton = document.querySelector(".btn-toggle"); 



// listen for a click event, at which point, start/stop a game
toggleGameButton.addEventListener("click", toggleGame);

// initialize a counter variable used to alternatively start/stop a game
let counterToggle = 1;
function toggleGame() {
    // depending on whether the counter variable is even or odd, stop or start the game (and increment the counter variable in both cases)
    if(counterToggle%2 == 0) {
        // reset the style of the button to its uncked state
        toggleGameButton.style.background = "#252525";
        toggleGameButton.style.color = "#ededed";

        // reset the series of buttons pressed by the computer randomly
        randomButtonSeries = [];
        // call a function to update the score back to 0
        updateScore("reset");

        // remove the event listener all the colored buttons, registering a click on them only whilst the game is ongoing
        coloredButtons.forEach(coloredButton => coloredButton.removeEventListener("click", addPlayerChoice));

        // increment the counter variable allowing the function to run the code in the other conditional 
        counterToggle++;
    } 
    else {
        // change the style to highlight the game as ongoing
        toggleGameButton.style.background = "#ededed";
        toggleGameButton.style.color = "#252525";
    
        // initialize the display of the score to be initially 0
        displayScore.textContent = 0;
    
        // include a random button in randomButtonSeries
        includeRandomButton();
        // press the buttons stored in the array randomButtonSeries
        pressRandomButtonSeries(randomButtonSeries);

        // listen for a click event on all the colored buttons, at which point consider the choice made by the player
        coloredButtons.forEach(coloredButton => coloredButton.addEventListener("click", addPlayerChoice));

        // increment the counter variable allowing the function to run the code in the other conditional 
        counterToggle++;
    }
}

// create a function which considers the button pressed by the player and checks for a match in relation to the series of buttons pressed by the computer randomly (in the aptly named array)
function addPlayerChoice(e) {
    // store in a variable the button which is the actual target of the event
    let playerChoice = e.target;

    // call a function which checks if the button pressed by the player matches the button in the array of buttons pressed randomly by the computer
    // the selection needs to match the button in the random array in its first position, then its second and so on 
    checkForMatch(playerChoice);
}

// initialize a variable used to go through each item of the randomButtonSeries array
let counterButton = 0;
function checkForMatch(choice) {
    // for the first button check if choice == randomBButtonSeries[0]
    // for the second button, check if choice == randomBButtonSeries[1]

    // if the choice matches the button in the random array, at the position established by the counter variable (initially 0)
    if(choice == randomButtonSeries[counterButton]) {
        // increment the counter variable (in the following iteration, the choice will have to match the button at index 1)
        counterButton++;
    }
    // else replay the random series of buttons and re-initialize the counterButton counter variable
    else {
        pressRandomButtonSeries(randomButtonSeries);
        counterButton = 0;
    }

    // when the counter variable reaches the length of the array of random buttons, the player's choices match every item in the array 
    if(counterButton == randomButtonSeries.length) {
        // update the score in light of the correct answer 
        updateScore("increment");

        // start a new round including a new random button in the random series and show the new series of button presses
        includeRandomButton();
        pressRandomButtonSeries(randomButtonSeries);


        // re-initialize the counterButton counter variable, to keep track of the choice in following round
        counterButton = 0;
    }

}

// create a function which, when called, includes in the array a random button element
function includeRandomButton() {
    // select a random button
    let randomIndex = Math.floor(Math.random()*4);
    let randomButton = coloredButtons[randomIndex];

    // push the random button in the array of button presses
    randomButtonSeries.push(randomButton);
}

// create a function which simulates the pressing of button elements
// accepting as argument an array of elements and iteratively applying and removing a class on each one of them
function pressRandomButtonSeries(btnArray) {
    // initialize a counter variable, used to interact with each individual button in the array
    let counter = 0;

    // every two seconds
    let intervalID = setInterval(function() {
        
        // add a class of btn-pressed to a single button
        randomButtonSeries[counter].classList.add("btn-pressed");
        // set a timeout of 1 second
        setTimeout(function() {
            // following the 1s remove the class of btn-pressed
            randomButtonSeries[counter].classList.remove("btn-pressed");
            // increase the counter variable, therefore targeting the following button in the array
            counter++;

            // when reaching the end of the array
            if(counter == randomButtonSeries.length) {
                // clear the interval stopping the code running in the block
                clearInterval(intervalID);
            }
        }, 1000);
        
    }, 2000);
}

// create a function which updates the score
// accepting a string which determines how the score is updated
function updateScore(result) {

    // considering the string passed as argument
    switch(result) {
        case "reset":
            // reset the score back to 0
            displayScore.textContent = 0;
            break;
        case "increment":
            // increment the score by one
            let score = parseInt(displayScore.textContent);
            displayScore.textContent = score + 1;
            break;
    }   

}
