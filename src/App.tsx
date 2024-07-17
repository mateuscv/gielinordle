import React, { useRef, useState } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import myData from "./database.json";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function compareStrings(stringA: string, stringB: string) {
  stringA = stringA.toUpperCase();
  stringB = stringB.toUpperCase();
  if (stringA == stringB) {
    return true;
  }
}

const chosenCharacter = myData[getRandomInt(Object.keys(myData).length)];

function App() {
  const [charName, setName] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (compareStrings(charName, chosenCharacter.Name)) {
      alert(`Congratulations, you won!`);
      return (
        <>
          <p>
            Your guess: <img src={chosenCharacter.Picture} />
          </p>
          <p>{chosenCharacter.Name}</p>
          <p>chosenCharacter.Examine</p>
        </>
      );
    }
  };
  return (
    <div className="App d-flex vh-100 justify-content-center align-items-center">
      <Card
        style={{ backgroundColor: "rgba(180,180,180,0.92)", width: "50rem" }}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "24pt" }}>RUNEDLE</Card.Title>
          <Card.Text>
            <p>Answer is "{chosenCharacter.Name}".</p>
            <form onSubmit={handleSubmit}>
              <label style={{ textAlign: "left" }}>
                Enter your guess...
                <br />
                <input
                  type="text"
                  value={charName}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </form>
            <br />
            <table
              id="guesses"
              style={{ width: "47rem", justifySelf: "center" }}
            >
              <tr>
                <td>Chathead</td>
                <td>Name</td>
                <td>Species/Race</td>
                <td>Homeland</td>
                <td>Release Year</td>
                <td>Quest Series</td>
              </tr>
            </table>
            <br />
            <hr />
            Made with{" "}
            <span style={{ color: "red" }}>
              <img
                style={{ width: "20px" }}
                src="https://oldschool.runescape.wiki/images/Hitpoints_icon_%28detail%29.png?a4903&20220119135436"
              />
            </span>{" "}
            by{" "}
            <a href="https://github.com/mateuscv" style={{ color: "#936039" }}>
              {" "}
              Mateus
            </a>
            .<br />
            All data gathered from{" "}
            <a href="https://runescape.wiki/" style={{ color: "#936039" }}>
              {" "}
              the RuneScape wiki
            </a>
            <br />
            Runedle is an open-source fan project. RuneScape is property of
            Jagex Ltd.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
