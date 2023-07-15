import { useEffect, useState } from 'react'
import GameRecords from '../components/GameRecords'
import Position from '../components/Position'
import { PositionInterface } from '../../utils/interfaces'
import { options, Positions } from '../../utils/gameData'
import {calculateWin} from '../../utils/calculateWin'



const getRandomOption = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
};

function Game() {

    const [balance, setBalance] = useState<number>(5000)
    const [win, setWin] = useState<number>(0)
    const [amountWon, setamountWon] = useState<number>(0)
    const [betValue, ] = useState<number>(500)
    const [selectedBets, setSelectedBets] = useState<string[]>([])

    const [computerOption, setComputerOption] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [winner, setWinner] = useState<string>('')

    
    const handleSelectBet = (data: PositionInterface) => {

        //IF BALANCE IS LESS THAN REQUIRED BET, RETURN
        if(balance < betValue || winner !== ''){
            return
        }

        //IF SELECTED BET ALREADY EXISTS REMOVE IT AND ADD BET BACK TO BALANCE
        if(selectedBets.includes(data.title)){
            setBalance(balance => balance + betValue)
            setSelectedBets(selectedBets.filter((value:string) => value !== data.title))
            return
        }

        //IF SELECTED BET DOES NOT EXIST ADD SELECTED BET TO BET STATE
        if(selectedBets.length < 2){
            setBalance(balance => balance - betValue)
            setSelectedBets([
                ...selectedBets,
                data.title
            ])
        }
        
    }
    // console.log('selected bets: ' + selectedBets)

    // console.log('computer option: ' + computerOption)


    
    const handleGamePlay = () => {
        
        const computerChoice = getRandomOption();
        setComputerOption(computerChoice);

        //PLAY ROCK PAPER SCISSORS AND DERIVE WINNING MOVE
        if(selectedBets.includes(computerChoice)){
            console.log('It is a tie')
            setResult('TIE')
        }
        else if(
            (selectedBets.includes('ROCK') && computerChoice === 'SCISSORS') || 
            (selectedBets.includes('PAPER') && computerChoice === 'ROCK') || 
            (selectedBets.includes('SCISSORS') && computerChoice === 'PAPER')
        ){
            if((selectedBets.includes('ROCK') && computerChoice === 'SCISSORS')){
                setResult('ROCK')
            }
            else if(selectedBets.includes('PAPER') && computerChoice === 'ROCK'){
                setResult('PAPER')
            }
            else if(selectedBets.includes('SCISSORS') && computerChoice === 'PAPER'){
                setResult('SCISSORS')
            }
            console.log('I win')
        }
        else{
            console.log('Computer wins')
            setResult(computerChoice)
        }

    }


    useEffect(() => {
        //MAKE CALCULATIONS BASED ON WINNER & NUMBER OF BETS PLACED
        let winnerResult: number | undefined
        if(result){
            winnerResult = setTimeout(() => {
                const { amountWon, balanceAddition } = calculateWin(betValue, selectedBets, result)
                if(result === 'TIE'){
                    setWinner('TIE')
                    setBalance(balance => balance + balanceAddition)
                }
                else if(selectedBets.includes(result)){
                    setWin(win => win  + 1)
                    setamountWon(amountWon)
                    setBalance(balance => balance + balanceAddition)
                    setWinner('Player')
                }
                else{
                    setWinner('Computer')
                }
            }, 2000);
        }
        return () => clearTimeout(winnerResult)
    }, [result])
    //console.log(winner)
    

    const handleClearRound = () => {
        setResult('')
        setSelectedBets([])
        setComputerOption('')
        setamountWon(0)
        setWinner('')
    }

    
    return (
        <>
            <div className='game-body'>
                <main className='game-container'>
                    <GameRecords balance={balance} win={win} totalValueOfBets={betValue * selectedBets.length} />
                    <div className='game-area'>
                        { 
                            computerOption === '' && 
                            result === '' && !winner &&
                            <h2 className='instruction'>PICK YOUR POSITIONS</h2> 
                        }
                        {
                            computerOption && !winner &&
                            <div className='playing-positions-container'>
                                <h2 className='playing-positions'>{ computerOption }</h2>
                                <span className='vs-text'>VS</span> 
                                <h2 className='playing-positions'>{ selectedBets[selectedBets.length - 1]}</h2>
                            </div>
                        }
                        {
                            winner &&
                            <div className='winner-result-container'>
                                <h2 className='winner'>{ winner === 'TIE' ? 'IT IS A TIE' : `${result} WON` }</h2>
                                <h3 className='winner-info'>
                                    { 
                                        winner === 'TIE' 
                                        ? 'NO WINNER OR LOSER' 
                                        : <>YOU {winner === 'Player' ? 'WIN' : 'LOSE'} <span>{ winner === 'Player' ? amountWon : betValue }</span> </>
                                    }
                                    
                                </h3>
                            </div>
                        }
                        <div className='position-container'>
                            {
                                Positions.map((data:PositionInterface) => (
                                    <Position 
                                        key={data.key} 
                                        data={data} 
                                        handleSelectBet={handleSelectBet}
                                        selectedBets={selectedBets}
                                        computerOption={computerOption}
                                        result={result}
                                        betValue={betValue}
                                    />
                                ))
                            }
                        </div>
                        { winner === '' && <button disabled={!selectedBets.length || result !== ''} onClick={handleGamePlay} className={`${result && 'disabled-button'} button`}>PLAY</button>}
                        { winner !== '' && <button onClick={handleClearRound} className='button'>CLEAR</button>}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Game