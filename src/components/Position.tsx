import React, { useState } from 'react'
import { PositionCardInterface } from '../../utils/interfaces'

function Position({ data, handleSelectBet, selectedBets, computerOption, result, betValue }: PositionCardInterface) {

    const betIsSelected = selectedBets.includes(data.title) || data.title === computerOption
    const highlightBet = result === data.title

    return (
        <div onClick={() => handleSelectBet(data)} className={`${data.style} position `} id={`${highlightBet && 'winner-position'}`}>
            { <div className={`${!betIsSelected && 'visibility' } bet`}>{ betValue }</div>}
            <h3 className='position-title'>{ data.title }</h3>
        </div>
    )
}

export default Position