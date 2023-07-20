import { PositionType } from "../types/PositionType"
import { BetResultType } from "../types/BetResultType"
import { MINIMUM_BETS } from "../constants"


export const calculateRoundReward = ( selectedBets: PositionType, betResult: BetResultType, betValue:number ) => {
    let amountWon = 0

    if (betResult?.winnerBetPosition === "tie" && Object.keys(selectedBets!).length < MINIMUM_BETS) {
        amountWon = betValue
    } 
    else if (betResult?.winnerBetPosition === "tie" && Object.keys(selectedBets!).length === MINIMUM_BETS) {
        amountWon = 0
    } 
    else if (betResult?.winnerBetPosition !== "tie" && Object.keys(selectedBets!).length < MINIMUM_BETS) {
        amountWon = betValue * 14
    }
    else if (betResult?.winnerBetPosition !== "tie" && Object.keys(selectedBets!).length === MINIMUM_BETS) {
        amountWon = selectedBets![betResult?.winnerBetPosition!] * 3
    } 

    return { amountWon }
}