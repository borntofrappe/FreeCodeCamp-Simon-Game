/* as soon as the page loads, initialize a few variables used throughout the script
* constants for the HTML elements with which the script interacts
    * the display in which to show the score
    * the button which starts/stops the game
    * the button which acticates/removes the strict mode
    * the colored buttons with which the player (and the computer) interacts
* an array in which to store the buttons pressed randomly by the computer
* a counter variable used to cycle through the array of buttons randomly pressed by the computer as the player includes its own choices
* a variable in which to store the id of the created interval, to clear interval if need be [avoid multiple instances, avoid running an instance when the game ends]
* a variable in which to store the id of the created timeout, to clear timeout if need be [avoid multiple instances, avoid running an instance when the game ends]
* a boolean keeping track of whether the game is ongoing or not
* a boolean keeping track of whether strict mode is enabled or not
* an integer describing the frequency with which button presses are shown as pressed by the computer, one after another
* two string variables storing the URL and the format of the audio file (audio file used to include different sound-bites depending on which button is pressed)
*/


const displayScore = document.querySelector(".display-score");
const toggleGameButton = document.querySelector(".btn-toggle"); 
const toggleStrictButton = document.querySelector(".btn-strict");
const coloredButtons = document.querySelectorAll(".container__gamepad .btn");

let randomButtonSeries = [];
let counterButton = 0;
let intervalID;
let timeoutID;

let isPlaying = false;
let isStrict = false;

let buttonFrequency = 1000;

let audioURL = "https://s3.amazonaws.com/freecodecamp/";
let audioFormat = ".mp3";


// listen to a click event on the toggleStrict button, at which point enable/remove strict mode depending on the boolean value isStrict
// boolean value itself updated to allow for the function to run alternatively the different blocks of code
toggleStrictButton.addEventListener("click", toggleStrict);

function toggleStrict() {
    // if strict mode is enabled, set isStrict to false and include the CSS class required to visually match the inactive mode
    if(isStrict) {
        toggleStrictButton.classList.add("inactive");
        toggleStrictButton.classList.remove("active");
        isStrict = false;
    }
    // else set isStrict to true and visually enable the button
    else {
        toggleStrictButton.classList.add("active");
        toggleStrictButton.classList.remove("inactive");
        isStrict = true;
    }
}


// listen to a click on the toggleGame button, at which point, start/stop a game
toggleGameButton.addEventListener("click", toggleGame);


function toggleGame() {
    // if game is ongoing, visually style the button to make it inactive and reset the game
    if(isPlaying) {
        toggleGameButton.classList.add("inactive");
        toggleGameButton.classList.remove("active");


        // clear the interval, if one is running 
        clearInterval(intervalID);
        // clear the timeout, if one is running
        clearTimeout(timeoutID);
        // reset the series of buttons pressed randomly by the computer
        randomButtonSeries = [];
        // call a function to update the score back to 0
        updateScore("reset");

        // remove the event listener all the colored buttons, registering a click on them only whilst the game is ongoing and the player input is expected
        coloredButtons.forEach(coloredButton => coloredButton.removeEventListener("click", addPlayerChoice));
        // remove the class of .btn-pressed from all buttons
        coloredButtons.forEach(coloredButton => coloredButton.classList.remove("btn-pressed"));

        isPlaying = false;
    } 
    // else visually make the button active and start playing a round of Simon
    else {
        toggleGameButton.classList.add("active");
        toggleGameButton.classList.remove("inactive");
    
        // initialize the display of the score to be initially 0
        displayScore.textContent = 0;
    
        // include a random button in randomButtonSeries
        includeRandomButton();
        // press the buttons stored in the array randomButtonSeries
        pressRandomButtonSeries(randomButtonSeries);

        // listen for a click event on all the colored buttons, at which point consider the choice made by the player
        coloredButtons.forEach(coloredButton => coloredButton.addEventListener("click", addPlayerChoice));

        isPlaying = true;
    }
}


// create a function which considers the button pressed by the player and checks for a match in relation to the series of buttons pressed randomly by the computer 
function addPlayerChoice(e) {   
    // store in a variable the button which is the actual target of the event
    let playerChoice = e.target;

    // call a function which plays the audio tied to the respective button through a data-sound attribute which describes it
    playAudio(playerChoice.dataset.sound);

    // call a function which checks if the button pressed by the player matches the button in the array of buttons pressed randomly by the computer
    // the selection needs to match the button in the random array in its first position, then its second and so on
    // this is where the initialized counter variable will be used  
    checkForMatch(playerChoice);
}

// create a function which considers the button element pressed by the player and matches it to the 1st, then 2nd... then last button stored in the array of buttons randomly pressed by the computer
function checkForMatch(choice) {
    // if the choice matches the button in the random array, at the position established by the counter variable (initially 0)
    if(choice == randomButtonSeries[counterButton]) {
        // increment the counter variable (in the following iteration, the choice will have to match the button at index 1)
        counterButton++;
    }
    // else notify the player of the wrong choice and consider whether strict mode is enabled or not
    else {
        // visually notify of the wrong choice by including an appropriate class to the score
        displayScore.classList.add("incorrect");
        // set the counter variable back to 0, as the next button pressed by the player will have to match the first button in the array of buttons pressed randomly by the computer
        counterButton = 0;
        // if strict mode is enabled
        if(isStrict) {
            // reset the game setting the score back to 0 and triggering a new round with 1 random button included in the array and pressed
            displayScore.textContent = 0;
            randomButtonSeries = [];
            includeRandomButton();
            pressRandomButtonSeries(randomButtonSeries);
        }
        // if strict mode is not enabled, replay the same series of buttons randmoly set by the computer
        else {
            pressRandomButtonSeries(randomButtonSeries);
        }
    }

    // when the counter variable reaches the length of the array of random buttons, the player's choices match every button in the array, in the right order 
    if(counterButton == randomButtonSeries.length) {
        // visually notify the player of the correct choice
        displayScore.classList.add("correct");        
        // depending on the lenght of the array (therefore depending on how many buttons are correctly pressed), update the score in different ways

        switch(randomButtonSeries.length) {
            // with 20 correct button presses, a victory occurs
            case 20:
                // notify the player
                updateScore("victory");
                // reset the array of buttons randomly pressed by the computer 
                randomButtonSeries = [];
                break;
            // with 5, 9, 12 correct button presses, increment the speed of the game
            case 12:
                updateScore("increment");
                buttonFrequency = 400;
                break;

            case 9:
                updateScore("increment");
                buttonFrequency = 650;
                break;

            case 5:
                updateScore("increment");
                buttonFrequency = 850;
                break;

            // by default, increment the score by 1
            default:
                updateScore("increment");
                break;
        }

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
    // clear the interval, if one is running 
    clearInterval(intervalID);
    // clear the timeout, if one is running
    clearTimeout(timeoutID);

    // initialize a counter variable, used to interact with each individual button in the array
    let counter = 0;

    // every two seconds
    intervalID = setInterval(function() {
        // remove the classes of the display which show a correct/incorrect match
        displayScore.classList.remove("correct");
        displayScore.classList.remove("incorrect");
        
        // add a class of btn-pressed to a single button
        randomButtonSeries[counter].classList.add("btn-pressed");

        // call a function to play the audio of the button randomly pressed by the computer
        playAudio(randomButtonSeries[counter].dataset.sound);

        // begin a timeout 
        timeoutID = setTimeout(function() {
            // following the 1s timeout, remove the class of btn-pressed
            randomButtonSeries[counter].classList.remove("btn-pressed");
            // increase the counter variable, therefore targeting the following button in the array
            counter++;

            // when reaching the end of the array
            if(counter == randomButtonSeries.length) {
                // clear the interval stopping the code running in the block
                clearInterval(intervalID);
            }
            // let the timeout be of the time-length described by the buttonFrequency variable
        }, buttonFrequency);
        // let the interval be of twice the time-length of the timeout, giving an equal amount of time in between button presses
    }, buttonFrequency*2);
}

// create a function which updates the score
// accepting a string which determines how the score is updated
function updateScore(result) {
    // as the text included in case of victory is not a number, safeguard the "increment" case from incrementing a string
    // if the text displayed represent victorious imagery, set it back to 0 (before immediately updating it)
    if(displayScore.textContent == "✨") {
        displayScore.textContent = 0;
    }
    // considering the string passed as argument
    switch(result) {
        case "increment":
            // increment the score by one
            let score = parseInt(displayScore.textContent);
            displayScore.textContent = score + 1;
            break;
        case "victory":
            // show victorious imagery
            displayScore.textContent = "✨";
            break;
        case "reset":
            // reset the score back to 0
            displayScore.textContent = 0;
            break;
    }   

}

// create a function which plays the audio according to the right button pressed 
// accepting as argument the data-attribute which specifies the different URL for the different buttons
function playAudio(dataSound) {
    // the URL is in the form of 
    // https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
    // changing only in the |simonSound1| portion of the string

    // create a string describing the URL for the audio of the respective button
    let audio = new Audio(`${audioURL}${dataSound}${audioFormat}`);
    // play the audio
    audio.play();
}
