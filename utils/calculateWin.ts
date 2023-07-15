
 
export const calculateWin = (betValue:number, selectedBets:string[], result: string) => {

    let amountWon: number = 0
    let balanceAddition: number = 0
    if(result === 'TIE'){
        balanceAddition = betValue * selectedBets.length
    }
    else if(selectedBets.length > 1){
        amountWon = (betValue * selectedBets.length) * 3
        balanceAddition = (betValue * selectedBets.length) * 3
    }
    else {
        amountWon = (betValue * selectedBets.length) * 14
        balanceAddition = (betValue * selectedBets.length) * 14
    }

    return { amountWon, balanceAddition }
}
