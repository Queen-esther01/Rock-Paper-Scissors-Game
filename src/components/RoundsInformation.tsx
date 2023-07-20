import { useContext } from 'react'
import { GameContext } from '../App'
import { MINIMUM_BETS } from '../constants'

type Props = {
    amountWon: number
}

function RoundsInformation({ amountWon }: Props) {
    const { betResult, selectedBets, betValue } = useContext(GameContext)

    const isSingleBet = Object.values(selectedBets!).length < MINIMUM_BETS
    const isMultipleBets = Object.values(selectedBets!).length === MINIMUM_BETS

    return (
        <div className="winner-result-container">
            <h2 className="winner">
                {
                    betResult?.winner === "Tie" && isSingleBet ? "TIE WITH SINGLE BET"
                    : betResult?.winner === "Tie" && isMultipleBets ? "TIE WITH MULTIPLE BETS"
                    : `${betResult?.winnerBetPosition!.toUpperCase()} WON`
                }
            </h2>
            <h3 className="winner-info">
                {
                    betResult?.winner === "Tie" && isSingleBet ? ("BET IS RETURNED" ) 
                    : betResult?.winner === "Tie" && isMultipleBets ? (`YOU LOSE ${betValue}`) 
                    : ( <>
                            YOU{" "}{betResult?.winner === "Player" ? "WIN" : "LOSE"}{" "}
                            <span>
                                {betResult?.winner === "Player" ? amountWon : betValue}
                            </span>{" "}
                        </>)
                }
            </h3>
        </div>
    )
}

export default RoundsInformation