import { BetChoiceType } from "./PositionType";
import { WinnerType } from "./WinnerType";

export type BetResultType = {
    winnerBetPosition: BetChoiceType | 'tie' | null
    winner: WinnerType
} | null