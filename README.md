
# Project Title

This is a simple game (Rock, Paper, Scissors) built with React and Typescript with the ability to bet on the winning position.


## Installation

To run the app, first clone repository:

```bash
  git clone https://github.com/Queen-esther01/Rock-Paper-Scissors-Game.git
```
move to the cloned directory, install packages & run:
```bash
  npm install
  npm run dev
```
    
## Demo

https://rps-game-yolo.netlify.app/


## Things To Note

- Player starts with a balance of 5000
- Player can bet on more than one position with a maximum of 2 positions
- Clearing game clears round of game but does not reset to initial state
- Computer is allowed to make a selection after user has clicked play button to prevent user from changing their position.
- Bet is reduced from balance but is returned if player wins
- Returned bet is multiplied by 3 if player made 2 bets
- Returned bet is mulitplied by 14 if player made 1 bet
- Bet is also returned if player ties with computer
- IF balance is less than default betting sum (500), player cannot bet

## Feedback
I would love to hear what you think about this project. You can reach me at ejidikeesther@gmail.com, Thanks!