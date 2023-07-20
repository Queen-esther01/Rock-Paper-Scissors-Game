import { useContext } from "react"
import { BetChoiceType, PositionType } from "../types/PositionType"
import { BetResultType } from "../types/BetResultType"
import { GameContext } from "../App"
import { BET_VALUE } from "../constants"

type Props = {
    selectedBets: PositionType
    option: BetChoiceType
    handleSelectBet: (type: BetChoiceType) => void
    computerSelection: BetChoiceType | null
    betResult: BetResultType
}

function BettingPosition({ option, handleSelectBet, computerSelection }: Props) {
    const { selectedBets, betResult } = useContext(GameContext)

    const betIsSelected = option in selectedBets! || option === computerSelection
    const highlightBet = betResult?.winner && betResult?.winnerBetPosition === option
    const betsPlaced = computerSelection !== null && computerSelection in selectedBets! ? selectedBets![option] 
        : computerSelection !== null && !(computerSelection in selectedBets!) && option === computerSelection ? BET_VALUE
        : selectedBets![option]

    return (
        <div onClick={() => handleSelectBet(option)} className={`${option}-position position `} id={`${highlightBet ? "winner-position" : ""}`} >
            {
                <div className={`${!betIsSelected ? "invisible" : "visible"} bet`}>
                    <p className="bet-value">{betsPlaced}</p>
                </div>
            }
            <h3 className="position-title">{option.toUpperCase()}</h3>
        </div>
    )
}

export default BettingPosition
