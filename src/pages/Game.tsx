import { useContext, useEffect, useState } from "react"
import GameRecords from "../components/GameRecords"
import BettingPositions from "../components/BettingPositions"
import { BetChoiceType } from "../types/PositionType"
import { GameContext } from "../App"
import { getRandomChoice } from "../helpers/calculateRandomChoice"
import { calculateRoundReward } from "../helpers/calculateRoundReward"
import RoundsInformation from "../components/RoundsInformation"
import { BetResultType } from "../types/BetResultType"
import { MINIMUM_BETS } from "../constants"

const positions: BetChoiceType[] = [ "rock", "paper", "scissors" ]

function Game() {
    const {
        computerSelection,
        setComputerSelection,
        betResult,
        setBetResult,
        setSelectedBets,
        selectedBets,
        betValue,
        balance,
        setBalance,
    } = useContext(GameContext)

    const [numberOfRoundsWon, setNumberOfRoundsWon] = useState<number>(0)
    const [amountWon, setamountWon] = useState<number>(0)

    const selectedBetsValues = Object.keys(selectedBets!)

    const handleGamePlay = () => {
        //GET COMPUTER CHOICE
        const computerChoice = getRandomChoice<BetChoiceType>(positions)
        setComputerSelection(computerChoice)

        let result:BetResultType = {
            winnerBetPosition: null,
            winner: null
        }
        
        //PLAY ROCK PAPER SCISSORS AND DERIVE WINNING MOVE
        if ("rock" in selectedBets! && computerChoice === "scissors" ) {
            result.winnerBetPosition = "rock"
        } 
        else if ("paper" in selectedBets! && computerChoice === "rock") {
            result.winnerBetPosition = "paper"
        }
        else if ("scissors" in selectedBets! && computerChoice === "paper") {
            result.winnerBetPosition = "scissors"
        }
        else if (computerChoice in selectedBets!) {
            result.winnerBetPosition = "tie"
        }
        else {
            result.winnerBetPosition = computerChoice
        }

        setBetResult(result)
    }


    useEffect(() => {
        //MAKE CALCULATIONS BASED ON WINNER & NUMBER OF BETS PLACED
        let timeout: number | undefined
        if (betResult?.winnerBetPosition !== null) {
            timeout = setTimeout(() => {
                let result:BetResultType = {
                    ...betResult!,
                    winner: null
                }

                const { amountWon } = calculateRoundReward(selectedBets, betResult!, betValue )

                if (betResult?.winnerBetPosition === "tie") {
                    result.winner = "Tie"
                    setBalance(balance + amountWon)
                } 
                else if (betResult?.winnerBetPosition! in selectedBets!) {
                    setNumberOfRoundsWon((numberOfWins) => numberOfWins + 1)
                    setamountWon(amountWon)
                    setBalance(balance + amountWon)
                    result.winner = "Player"
                } else {
                    result.winner = "Computer"
                }

                setBetResult(result)
            }, 2000)
        }
        return () => clearTimeout(timeout)
    }, [betResult?.winnerBetPosition])


    const handleClearRound = () => {
        setBetResult({
            winnerBetPosition: null,
            winner: null
        })
        setSelectedBets({})
        setComputerSelection(null)
        setamountWon(0)
    }

    const hasWinner = betResult?.winner !== null
    const hasComputerSelected = computerSelection !== null
    const hasWinnerPosition = betResult?.winnerBetPosition !== null
    const defaultState = !hasComputerSelected && !hasWinnerPosition && !betResult?.winner
    const totalWinnerResultAvailable = betResult?.winner && betResult?.winnerBetPosition
    //IF POSITION IS TIE, USE COMPUTER SELECTED POSITION, ELSE IF USER SELECTED BETS ARE LESS THAN 2, USE SELECTED BET, ELSE JUST USE USUAL SELECTED POSITION
    // I AM USING THIS TO DETERMINE THE APPROPRIATE USER BET TO DISPLAY
    const userSelectedBet = betResult?.winnerBetPosition! === 'tie' ? computerSelection!.toUpperCase() 
        : selectedBetsValues.length < MINIMUM_BETS ? selectedBetsValues.length && selectedBetsValues[0]!.toUpperCase() 
        : betResult?.winnerBetPosition && betResult?.winnerBetPosition!.toUpperCase()
  
    return (
        <>
            <div className="game-body">
                <main className="game-container">
                    <GameRecords numberOfRoundsWon={numberOfRoundsWon} />
                    <div className="game-area">
                        {
                            defaultState && ( <h2 className="instruction">PICK YOUR POSITIONS</h2> )
                        }
                        {
                            computerSelection && !betResult?.winner && (
                            <div className="playing-positions-container">
                                <h2 className="playing-positions">
                                    {userSelectedBet}
                                </h2>
                                <span className="vs-text">VS</span>
                                <h2 className="playing-positions">
                                    {computerSelection.toUpperCase()}
                                </h2>
                            </div>)
                        }
                        {
                            totalWinnerResultAvailable && (
                            <RoundsInformation amountWon={amountWon}/>
                        )}

                        {/* SHOW BETTING CARDS */}
                        <BettingPositions
                            positions={positions}
                            computerSelection={computerSelection}
                        />

                        {/* SHOW PLAY BUTTON IF NO WINNER ELSE SHOW CLEAR BUTTON */}
                        {!hasWinner && (
                            <button disabled={!Object.keys(selectedBets!).length || betResult.winnerBetPosition !== null} onClick={handleGamePlay} className={`${ betResult.winnerBetPosition ? "disabled-button": "" } button`}>
                                PLAY
                            </button>
                        )}
                        {hasWinner && (
                            <button onClick={handleClearRound} className="button" >
                                CLEAR
                            </button>
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Game
