import React, { useRef, useState } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import myData from "./database.json";
import { Button } from "react-bootstrap";

type RowData = {
  id: string;
  chatheadUrl: string;
  name: string;
  species: string;
  homeland: string;
  releaseYear: string;
  questSeries: string;
};

function refreshPage() {
  window.location.reload();
}

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

function fetchCharacterData(characterName: string) {
  const characterIndex = myData.findIndex((obj) => obj.Name == characterName);
  const character = myData[characterIndex];
  return character;
}

const chosenCharacter = myData[getRandomInt(Object.keys(myData).length)];

function App() {
  const [charName, setName] = useState("");
  const [result, setResult] = useState<React.ReactNode>(null);
  const [data, setData] = useState<RowData[]>([]);

  const addRow = (
    id: string,
    name: string,
    species: string,
    homeland: string,
    releaseYear: string,
    questSeries: string,
    chatheadUrl: string
  ) => {
    const newRow: RowData = {
      id,
      name,
      species,
      homeland,
      releaseYear,
      questSeries,
      chatheadUrl,
    };

    setData((prevData) => [...prevData, newRow]);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (compareStrings(charName, chosenCharacter.Name)) {
      setResult(
        <>
          <div
            className="ImageContainer justify-content-center align-items-center"
            style={{ textAlign: "center", width: "150px" }}
          >
            <img
              src={chosenCharacter.Picture}
              alt="Character Picture"
              style={{ maxWidth: "80%", display: "inline-block" }}
            />
          </div>
          <h2>{chosenCharacter.Name} </h2>
          <p>{chosenCharacter.Examine}</p>
          <Button variant="secondary" onClick={refreshPage}>
            Play Again
          </Button>
          <br />
        </>
      );
    } else {
      const characterData = await fetchCharacterData(charName);
      if (!characterData) {
        setResult(<p>Character not found.</p>);
        return;
      }

      addRow(
        characterData.Id,
        characterData.Name,
        characterData["Species/Race"],
        characterData.Homeland,
        characterData["Release Year"],
        characterData["Quest Series"],
        characterData.Picture
      );

      if (
        compareStrings(
          characterData["Release Year"],
          chosenCharacter["Release Year"]
        )
      ) {
        setResult(<p>Same Release Year</p>);
      } else if (
        compareStrings(
          characterData["Quest Series"],
          chosenCharacter["Quest Series"]
        )
      ) {
        setResult(<p>Same Quest Series</p>);
      } else if (
        compareStrings(
          characterData["Species/Race"],
          chosenCharacter["Species/Race"]
        )
      ) {
        setResult(<p>Same Species/Race</p>);
      } else {
        setResult(<p>No match found</p>);
      }
    }
  };
  return (
    <div className="App d-flex justify-content-center align-items-start min-vh-100 py-4">
      <Card
        style={{ backgroundColor: "rgba(180,180,180,0.92)", width: "50rem" }}
      >
        <Card.Body>
          <Card.Title
            style={{
              fontSize: "32pt",
              fontFamily: "Georgia",
              color: "black",
              textShadow: "0 0 1px #936039",
            }}
          >
            Gielinordle
          </Card.Title>
          <Card.Text>
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
            <div className="result">{result}</div>
            <br />
            <table
              id="guesses"
              style={{ width: "47rem", justifySelf: "center" }}
            >
              <thead>
                <tr>
                  <td>Chathead</td>
                  <td>Name</td>
                  <td>Species/Race</td>
                  <td>Homeland</td>
                  <td>Release Year</td>
                  <td>Quest Series</td>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id}>
                    <td className="border border-gray-400 px-4 py-2">
                      <img src={row.chatheadUrl} width={"60%"} />
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {row.name}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {row.species}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {row.homeland}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {row.releaseYear}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {row.questSeries}
                    </td>
                  </tr>
                ))}
              </tbody>
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
            Gielinordle is an open-source fan project. RuneScape is property of
            Jagex Ltd.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
