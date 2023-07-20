
# Project Title

This is a simple game (Rock, Paper, Scissors) built with React and Typescript with the ability to bet on the winning position.


## Installation

To run the app, first clone repository:

```bash
git clone https://github.com/Queen-esther01/Rock-Paper-Scissors-Game.git
```
Move to the cloned directory, install packages & run:
```bash
cd Rock-Paper-Scissors-Game
npm install
npm run dev
```
    
## Demo

https://rps-game-yolo.netlify.app/


## Features

- Player starts with a balance of 5000
- Player can bet on more than one position with a maximum of 2 positions
- Clearing game clears round of game but does not reset to initial state
- Computer is allowed to make a selection after user has clicked play button to prevent user from changing their position.
- Bet is reduced from balance but is multiplied and returned if player wins
- Returned bet is multiplied by 3 if player made 2 bets
- Returned bet is mulitplied by 14 if player made 1 bet
- Bet is also returned if player ties with computer
- IF balance is less than default betting sum (500), player cannot bet


## A Little Explanation For My Decisions
- I added types for props directly inside the component file since they are not being used globally, other types being used around the aplication have been separated into different files. In a large project, we might confine those global types to a single file since they are all related to the game component.
- I used a setimeout inside a useEffect in the game component to simulate a little waiting period and allow enough time for user to see all selected positions. This waiting period tries to mirror the little time it would take to make an api call and also prevent the selected positions from flashing very briefly on the screen.
- I initially wanted to use internal states, but upon going through the requirements and working my solution out before development, I quicly realised there was a lot of changing state and different components that would need access to this information, to avoid prop drilling, I integrated Context API. In a larger project, we would make use of standard state management tools such as Redux, Zustand etc
- The game components was broken down into smaller pieces not only for readability & reusability purposes but for flexibility and easier maintenance.
- TailwindCSS or other frameworks are usually my go-to tool for styling but in this case I decided to make use of vanilla Css to show my non-dependence on external tools for styling & to showcase my CSS skills.
- I added different explanatory titles for when there is a tie and user has either bet on one position or multiple positions although there was no design for it. This makes for a great user experience as the user understands at each point why they have lost a round and how much they lost. 
- Necessary conditional statements were extracted from within JSX and given meaningful variable naming for readability purposes.
- Constant data was added into a separate file and reused globally to ensure that a slight change in requirement does not translate to manual replacements across all files it is being used.
## Feedback
I would love to hear what you think about this project. You can reach me at ejidikeesther@gmail.com, Thanks!