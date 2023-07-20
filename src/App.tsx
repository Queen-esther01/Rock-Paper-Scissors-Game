import { createContext, useState } from "react"
import "./App.css"
import { BetChoiceType, PositionType } from "./types/PositionType"
import { BetResultType } from "./types/BetResultType"
import Game from "./pages/Game"


type ContextValues = {
    balance: number
    setBalance: (balance: number) => void
    betValue: number
    setBetValue: (bet:number) => void
    selectedBets: PositionType
    setSelectedBets: (bets: any) => void
    betResult: BetResultType
    setBetResult: (result: BetResultType) => void
    computerSelection: BetChoiceType | null
    setComputerSelection: (computer: BetChoiceType | null) => void
}

const defaultContext = {
    balance: 5000,
    setBalance: () => null,
    betValue: 500,
    setBetValue: () => null,
    selectedBets: {} as any,
    setSelectedBets: () => null,
    betResult: {
        winnerBetPosition: null,
        winner: null
    },
    setBetResult: () => null,
    computerSelection: null,
    setComputerSelection: () => null,
}

export const GameContext = createContext<ContextValues>(defaultContext)

function App() {
    const [balance, setBalance] = useState<number>(defaultContext.balance)
    const [selectedBets, setSelectedBets] = useState<PositionType>(defaultContext.selectedBets)
    const [betResult, setBetResult] = useState<BetResultType>(defaultContext.betResult)
    const [computerSelection, setComputerSelection] = useState<BetChoiceType | null>(defaultContext.computerSelection)
    const [betValue, setBetValue] = useState<number>(defaultContext.betValue)

    return (
        <GameContext.Provider
            value={{
                balance,
                setBalance,
                betValue,
                setBetValue,
                selectedBets,
                setSelectedBets,
                betResult,
                setBetResult,
                computerSelection,
                setComputerSelection,
            }}
        >
            <Game />
        </GameContext.Provider>
    )
}

export default App
