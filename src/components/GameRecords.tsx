import { useContext, useEffect } from "react"
import { GameContext } from "../App"

type Props = {
    numberOfRoundsWon: number
}

function GameRecords({ numberOfRoundsWon }: Props) {
    const { balance, selectedBets, setBetValue } = useContext(GameContext)

    const selectedBetsAmounts = Object.values(selectedBets!)
    const totalValueOfBets = selectedBetsAmounts.reduce((a, b) => a + b, 0)
    
    useEffect(() => {
        setBetValue(totalValueOfBets)
    }, [totalValueOfBets])
    

    return (
        <div className="game-record-container">
            <h2 className="record">
                BALANCE: <span>{balance}</span>
            </h2>
            <h2 className="record">
                BET: <span>{totalValueOfBets}</span>
            </h2>
            <h2 className="record">
                WIN: <span>{numberOfRoundsWon}</span>
            </h2>
        </div>
    )
}

export default GameRecords
