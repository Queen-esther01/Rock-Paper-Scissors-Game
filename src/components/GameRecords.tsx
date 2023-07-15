import React from 'react'
import { GameRecordsInterface } from '../../utils/interfaces'


function GameRecords({ balance, win, totalValueOfBets }: GameRecordsInterface) {
    return (
        <div className='game-record-container'>
            <h2 className='record'>BALANCE: <span>{ balance }</span></h2>
            <h2 className='record'>BET: <span>{ totalValueOfBets }</span></h2>
            <h2 className='record'>WIN: <span>{ win }</span></h2>
        </div>
    )
}

export default GameRecords