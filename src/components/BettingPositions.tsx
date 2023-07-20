import { useContext } from "react"
import { BetChoiceType } from "../types/PositionType"
import BettingPosition from "./BettingPosition"
import { GameContext } from "../App"
import { BET_VALUE, MINIMUM_BETS } from "../constants"

type Props = {
    positions: BetChoiceType[]
    computerSelection: BetChoiceType | null
}

function BettingPositions({ positions, computerSelection }: Props) {
    const { balance, setBalance, selectedBets, setSelectedBets, betResult } = useContext(GameContext)

    const handleSelectBet = (type: BetChoiceType) => {
        //IF BALANCE IS LESS THAN REQUIRED BET OR ROUND HAS NOT BEEN CLEARED, RETURN
        if (balance < BET_VALUE || betResult?.winner !== null) {
            return
        }

        //IF BET SELECTED NOT UP TO 2 OR BET ALREADY EXISTS, ADD BET
        if (Object.keys(selectedBets!).length < MINIMUM_BETS || (type in selectedBets!)) {
            if(type in selectedBets!){
                setSelectedBets({
                    ...selectedBets,
                    [type]: selectedBets![type] + BET_VALUE
                })
            }
            else {
                setSelectedBets({
                    ...selectedBets,
                    [type]: BET_VALUE
                })
            }
            setBalance(balance - BET_VALUE)
        }
    }

    return (
        <div className="position-container">
            {positions.map((type) => (
                <BettingPosition
                    key={type}
                    option={type}
                    handleSelectBet={handleSelectBet}
                    selectedBets={selectedBets}
                    computerSelection={computerSelection}
                    betResult={betResult}
                />
            ))}
        </div>
    )
}

export default BettingPositions
