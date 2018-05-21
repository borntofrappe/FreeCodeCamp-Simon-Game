Link to the work-in-progress pen right [here]https://codepen.io/borntofrappe/full/jxXBgm/).

# Preface 

For the "Advanced Front-End Web Development Projects", for the last project due in the @freecodecamp curriculum, the task is straightforward: build a Simon Game.

A game which resembles the old-timey not-so-digital device which allows players to include a series of incrementally longer colors, in a random, but decided order.

The task may be straightfoward, but the implementation it is not. Some considerations are therefore necessary before jumping into the code editor.

# User stories

The project is specifically out to fulfill the following user-stories:

- [x] upon starting a game, the page shows a random button press
- [x] upon interacting with the same button, the page shows the same button, followed by another random choice. This incrementally to create a series of button presses
- [x] each button is animated, possibly in color, and in sound, whenever it is pressed by the page or by the player(s)
- [x] upon pressing the wrong button, the player(s) is notified of the wrong choice.
- [x] it is possible to always assess the number of button presses required by the current series of button presses
- [x] it is possible to restart the game, with a single button press
- [x] it is possible to play in _strict_ mode, whereby the game restarts whenever a wrong choice is made (without this mode, the game continuously prompts the player to include the correct pattern, no matter how many tries that should take.)
- [x] the game ends with a victory, and restarts immediately, upon hitting 20 correct presses
- [x] the game speeds up incrementally, at the 5th, 9th, 12th button press.

# Assets

The following URL are specified for the different sounds to be baked in the game:

- https://s3.amazonaws.com/freecodecamp/simonSound1.mp3
- https://s3.amazonaws.com/freecodecamp/simonSound2.mp3 
- https://s3.amazonaws.com/freecodecamp/simonSound3.mp3
- https://s3.amazonaws.com/freecodecamp/simonSound4.mp3

# Design system

**Colors**

The following hues are picked for the background of the page and the four buttons behind the game.

```
dark-blue = #1f1c3d
white = #ededed
green = #33A652
red = #E74234
yellow = #F7B904
blue = #2A79EE
```

**Font**

As far as fonts are concerned, Lato is included by default without much second-guessing. Text plays indeed a minimal role in the project, and it is relegated to a choice potentially refine-able when the game is finished.


# Versions 

The project is built one feature at a time. Spending a variable amount of time and attention to the design and style of the page, while spending a consistent amount of resources in the JS script describing the inner workings of the whole system.

V1: include four buttons in a single row. Four buttons of different colors. Four buttons laid in a single column on small screen devices.

V2: with filter properties, increase the brightness of the different buttons when they are pressed

v3: trigger a button press with JavaScript, without need for further interaction from the player

V4: trigger a button press for a button at random, and repeat the process after an interval

V5: store in an array which button(s) is(are) pressed, and include the previous buttons alongside a new, random one

V6: without considering the player side still, instead of pressing 20 random, individual buttons, allow the computer to press a series of 20 buttons, progressively made up of the previous presses plus a new random one

V7: include a button to allow the player to interact with the game. When beginning a game, the program presses a random button.

V8: after pressing a button, the program reacts to a press on one of the four colored buttons, with a message displaying the correct/wrong choice.

_V9 Update_: I got caught up in my code editor and jumping a few steps I created a functioning Simon Game. Granted, edge cases need to be considered, by the substance is there. The game works in its best-case-scenario.

The planning of the different versions got a little derailed as I got into the flow of writing JavaScript. Since planning is actually a way for me to start coding on features, start somewhere, I consider this derailment as a success.

V9: play a Simon Game. The computer adds a new step for every correct series of button presses. The computer shows again the series of button presses if a wrong choice is made.

V1.0: finalize each and every user story. Remove the errors caused by the stacking of multiple interval/timeouts. Include flair to the display showing the score, to visually remark the correct/wrong choice.

