import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function generateNewDice() {
  return {
    value: Math.ceil(Math.random() * 6),
    isClicked: false,
    id: nanoid(),
  };
}
export default function Main() {
  function allNewDie() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    console.log(newDice);
    return newDice;
  }

  const [dice, setDice] = React.useState(allNewDie);
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0);
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isClicked ? die : generateNewDice();
        })
      );
      increase(); // Move increase call here
    } else {
      setTenzies(false);
      setDice(allNewDie());
      setCount(0);
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isClicked: !die.isClicked } : die;
      })
    );
  }
  // var count = 0
  // console.log(count);
  // var disp = document.getElementById("display")
  function increase() {
    setCount(count + 1);
    // disp.innerHTML = count;
  }

  // checking game over on every change in "dice" state
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isClicked);
    const firsValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firsValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isClicked={die.isClicked}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <BrowserRouter basename="/tenzis">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll untill all dice are the same. Click each die to freeze it a its
          current value between rolls
        </p>
        <div className="die-container">{diceElements}</div>
        <br></br>
        <button className="roll-btn" onClick={rollDice}>
          {tenzies ? "New game" : "Roll"}
        </button>
        <h3 className="track">
          {" "}
          No.of rolls:<span id="display">{count}</span>
        </h3>
      </main>
    </BrowserRouter>
  );
}
