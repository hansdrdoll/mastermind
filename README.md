# Mastermind

## [Play Mastermind on hansdrdoll.github.io/mastermind](https://hansdrdoll.github.io/mastermind/)

# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

|  Day | Deliverable |
|---|---|
|Day 1: Tuesday | Game Idea|
|Day 2: Wednesday | Completed wireframes and prioritized features|
|Day 3: Thursday| Pseudocode|
|Day 4: Friday| Basic Clickable Model|
|Day 5: Saturday| Working Prototype|
|Day 6: Sunday| Game Completed / Slides|
|Day 7: Monday| Project Presentations|

## Project Description

Use this section to describe your final project and perhaps any links to relevant sites that help convey the concept and\or functionality

The game is Mastermind. The player's job is to guess the secret code chosen by the computer using a series of guesses. The code is four "pegs" chosen from six color options, for example [blue],[red],[yellow],[orange]. Every time the user makes a guess, the computer gives two responses: the number of pegs that match a color in the secret code, and the number of pegs that match the color and location of the peg in the secret code. The response does not tell the user what specific pegs are correct, only that the guess included correct choices.

The user uses deductive logic to guess the secret code within 10 turns, or loses.

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matix.

|  Feature |  Time |  Importance |
|---|---|---|
|  |  |
|  |  |
|  |  |
|  |  |

## MVP

*Include the full list of features that will be part of your MVP*

* Basic gameplay
    * Game board is generated
    * Instructions shown to user
    * User can input guess onto board
    * If guess is correct, user wins
    * If incorrect, computer gives feedback on user's guess
    * After 10 incorrect guesses, user loses and secret code is shown

## POST MVP

*Include the full list of features that you are considering for POST MVP*

* Verison 1.1
    * Fleshed out tutorial
    * Splash screen with instructions, tool tips to highlight next moves
* Version 1.2
    * Scoring: fewer/faster guesses to win = higher score
    * Include previous scores from session after board reset
* Version 1.3
    * Drag and Drop pins onto board to make guesses
* Version 2
    * Difficulty levels
* Version 2.1
    * Stressful senarios, like the background slowly filling up with water and getting higher with every incorrect guess

## Wireframes

![Mastermind Wireframe](https://git.generalassemb.ly/raw/hans/mastermind/master/mastermind_wireframe.png)

## Game Components

### Landing Page
*What will a player see when they start your game?*

A welcome screen that takes the player's name and difficulty level

### Game Initialization
*What will a player see when the game is started?*

An empty board waiting for their first guess, with an instruction prompt on the right side.

### Playing The Game
*What will be the flow of the game, what will the user be expected to do and what will the user expect from the game?*

The user will have as much time as they want to make guesses, and will have to use the feedback provided on their guesses to make better guesses.

### Winning The Game
*What does it look like when the game ends, what determines winning or losing?*

The game ends with the reveal of the secret code, either after the user correctly guesses it (wins) or runs out of attempts (loses).

### Game Reset
*How will the user restart the game once it has been completed.*

With a "try again" button.

## Functional Components

*Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions.  Does your logic indicate that code could be encapsulated for the purpose of reusablility.  Once a function has been defined it can then be incorporated into a class as a method.*

*ime frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted.*

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Component 1 | H | 10hrs| 12hrs | 12hrs |

## Helper Functions
*Helper functions should be generic enough that they can be reused in other applications. Use this section to document all helper functions that fall into this category.*

| Function | Description | 
| --- | :---: |  
| Capitalize | This will capitalize the first letter in a string | 

## Additional Libraries
*Use this section to list all supporting libraries and their role in the project.*

I used [Materialize](http://materializecss.com/) for most of the styling, which also uses relies jQuery.

## jQuery Discoveries
 *Use this section to list some, but not all, of the jQuery methods and\or functionality discovered while working on this project.*

## Change Log
 *Use this section to document what changes were made and the reasoning behind those changes.*  

## Issues and Resolutions
 *Use this section to list of all major issues encountered and their resolution.*

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier                                
**RESOLUTION**: Missing comma after first object in sources {} object
