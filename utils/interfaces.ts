export interface PositionInterface {
    key: string,
    title: string
    style: string
}

export interface PositionCardInterface { 
    selectedBets: string[]
    data: PositionInterface,
    handleSelectBet: (data:PositionInterface) => void
    computerOption: string
    result: string
    betValue: number
}

export interface GameRecordsInterface {
    balance: number
    win: number
    totalValueOfBets: number
}