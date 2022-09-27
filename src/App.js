import matchers from "@testing-library/jest-dom/matchers";
import React from "react";
import Die from "./Die"

export default function Main(){
  function allNewDie(){
    const randomArray = []
    for(let i = 0; i<10; i++) {
      randomArray.push(Math.ceil(Math.random()*6))
      }
      return randomArray
  }
  
  const [dice, setdice] = React.useState(allNewDie)
  
  const diceElements = dice.map(die => <Die value={die}/>)

  function rollDice(){
    setdice(allNewDie())
  }
  
  return(
      <main>
        <div className="die-container">
         {diceElements}
        </div><br></br>
        <button onClick={rollDice}>Roll</button>
      </main>
  )
}

