export type BetChoiceType = 'rock' | 'paper' | 'scissors'

export type PositionType = {
    [key in BetChoiceType]: number
} | null
