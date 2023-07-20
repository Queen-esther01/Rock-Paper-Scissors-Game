
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

- The player starts with a balance of 5000
- Player can bet on more than one position with a maximum of 2 positions
- Clearing game clears round of game but does not reset to the initial state
- The computer is allowed to make a selection after the user has clicked the play button to prevent the user from changing their position.
- Bet is reduced from balance but is multiplied and returned if the player wins
- The returned bet is multiplied by 3 if the player made 2 bets
- The returned bet is multiplied by 14 if the player made 1 bet
- Bet is also returned if the player ties with the computer
- If the balance is less than the default betting sum (500), the player cannot bet


## A Little Explanation For My Decisions
- I added types for props directly inside the component file since they are not being used globally, other types being used around the application have been separated into different files. In a large project, we might confine those global types to a single file since they are all related to the game component.
- In the handleGamePlay function, I determine what bet positions win and lose. We can also determine the winners and do our calculations here but there was the need to display computer and player positions before showing the winner. Moving those computations elsewhere was one of the ways that helped me achieve that.
- I used a setimeout inside a useEffect in the game component to simulate a little waiting period and allow enough time for the user to see all selected positions. This waiting period tries to mirror the little time it would take to make an API call and also prevent the selected positions from flashing very briefly on the screen. This timeout is also where we finally determine the winner and do other calculations.
- I initially wanted to use internal states, but upon going through the requirements and working my solution out before development, I quickly realized there was a lot of changing state and different components that would need access to this information, to avoid prop drilling, I integrated Context API. In a larger project, we would make use of standard state management tools such as Redux, Zustand, etc
- The game components were broken down into smaller pieces not only for readability & reusability purposes but for flexibility and easier maintenance.
- TailwindCSS or other frameworks are usually my go-to tool for styling but in this case, I decided to make use of vanilla Css to show my non-dependence on external tools for styling & to showcase my CSS skills.
- I added different explanatory titles for when there is a tie and the user has either bet on one position or multiple positions although there was no design for it. This makes for a great user experience as the user understands at each point why they have lost a round and how much they lost. 
- Necessary conditional statements were extracted from within JSX and given meaningful variable naming for readability purposes.
- Constant data was added into a separate file and reused globally to ensure that a slight change in requirement does not translate to manual replacements across all files it is being used.
## Feedback
I would love to hear what you think about this project. You can reach me at ejidikeesther@gmail.com, Thanks!
