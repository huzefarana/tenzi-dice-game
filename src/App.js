import React from "react";
import Die from "./Die"
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function Main() {
  function allNewDie() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      })
    }
    return newDice
  }
  const [dice, setDice] = React.useState(allNewDie)
  const [tenzies, setTenzies] = React.useState(false)
  function rollDice() {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ?
            die:
            {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid(),
            }
      }))
    }else{
      setTenzies(false)
      setDice(allNewDie())
    }
  }

  function holdDice(id) {

    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  // checking game over
  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firsValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firsValue)
    if (allHeld && allSameValue){
      setTenzies(true)
    }
  },[dice])

  const diceElements = dice.map(
    die => <Die key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />)

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll untill all dice are the same.
       Click each die to freeze it a its current value between rolls</p>
      <div className="die-container">
        {diceElements}
      </div><br></br>
      <button className="roll-btn" onClick={rollDice}>{tenzies ? "New game": "Roll"}</button>
    </main>
  )
}

