Link to the work-in-progress pen right [here](https://codepen.io/borntofrappe/pen/jxXBgm).

# Preface 

For the "Advanced Front-End Web Development Projects", for the last project due in the @freecodecamp curriculum, the task is straightforward: build a Simon Game.

A game which resembles the old-timey not-so-digital device which allows players to include a series of incrementally longer colors, in a random, but decided order.

The task may be straightfoward, but the implementation it is not. Some considerations are therefore necessary before jumping into the code editor.

# User stories

The project is specifically out to fulfill the following user-stories:

- [ ] upon starting a game, the page shows a random button press
- [ ] upon interacting with the same button, the page shows the same button, followed by another random choice. This incrementally to create a series of button presses
- [ ] each button is animated, possibly in color, and in sound, whenever it is pressed by the page or by the visitor(s)
- [ ] upon pressing the wrong button, the visitor(s) is notified of the wrong choice.
- [ ] it is possible to always assess the number of button presses required by the current series of button presses
- [ ] it is possible to restart the game, with a single button press
- [ ] it is possible to play in _strict_ mode, whereby the game restarts whenever a wrong choice is made (without this mode, the game continuously prompts the player to include the correct pattern, no matter how many tries that should take.)
- [ ] the game ends with a victory, and restarts immediately, upon hitting 20 correct presses
- [ ] the game speeds up incrementally, at the 5th, 9th, 12th button press.

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


