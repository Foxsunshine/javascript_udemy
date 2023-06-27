import React from "react";
import ReactDOM from "react-dom";

export default function Dice(props) {
  const element = props.dices.map((dice) => (
    <div
      className="die"
      key={dice.id}
      style={{ backgroundColor: dice.isHeld ? " #59e391" : "white" }}
      onClick={() => props.holdDice(dice.id)}
    >
      {dice.value}
    </div>
  ));
  return <div className="die-area">{element}</div>;
}
