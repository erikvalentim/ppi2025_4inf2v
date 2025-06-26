import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [array, setArray] = useState([]);
  const [message, setMessage] = useState("");

  function handleClick() {
    var n = Math.floor(Math.random() * 40) + 1;
    setLuckyNumber(n);
    
    if (array.includes(n)) {
      setMessage(`The number ${n} has already been chosen!`);
    } else {
      setMessage("");
      setArray([...array, n]);
    }
  }

  return (
    <div className={styles.container}>
      {luckyNumber === 0 ? (
        <h1>Lucky Number 🎲</h1>
      ) : (
        <h1>Lucky Number = {luckyNumber}</h1>
      )}
      {message ? <p>{message}</p> : null}
      <button className={styles.button} onClick={handleClick}>
        I'm Feeling Lucky Today!
      </button>
      <h3>Lucky Numbers Array:</h3>
      <p>[{[...array].toString()}]</p>
    </div>
  );
}
