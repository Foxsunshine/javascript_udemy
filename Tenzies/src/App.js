import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { nanoid } from "nanoid";
import Dice from "./components/Dice";
import Confetti from "react-confetti";

export default function App() {
  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  //is win or not?
  React.useEffect(() => {
    let win = true;
    let count = dices[0].value;
    win = dices.every((dice) => dice.isHeld === true && dice.value === count);
    if (win) setTenzies(true);
  }, [dices]);

  function generateNum() {
    return Math.floor(Math.random() * 6) + 1;
  }

  //initials all the num
  function allNewDice() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr[i] = {
        id: nanoid(),
        value: generateNum(),
        isHeld: false,
      };
    }
    return arr;
  }

  function rollDice() {
    if (tenzies) {
      setDices(allNewDice());
      setTenzies(false);
    } else
      setDices((preDices) =>
        preDices.map((dice) =>
          dice.isHeld ? dice : { ...dice, value: generateNum() }
        )
      );
  }

  function holdDice(id) {
    setDices((preDices) => {
      return preDices.map((dice) => {
        if (dice.id === id)
          return {
            ...dice,
            isHeld: !dice.isHeld,
          };
        else return dice;
      });
    });
  }

  return (
    <main>
      <div className="box">
        {tenzies ? <Confetti /> : ""}
        <div>
          <h3>Tenzies</h3>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div>
          <Dice dices={dices} holdDice={holdDice} />
        </div>
        <button onClick={rollDice}>{tenzies ? "New GAme" : "Roll"}</button>
      </div>
    </main>
  );
}
