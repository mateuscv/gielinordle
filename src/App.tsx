import React, { useRef, useState } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import myData from "./database.json";
import correctSFX from "./sfx/correct.mp3";
import { Button } from "react-bootstrap";

type MatchValue = {
  value: string;
  isMatch: boolean;
};

type GuessData = {
  id: string;
  chatheadUrl: MatchValue;
  name: MatchValue;
  species: MatchValue;
  homeland: MatchValue;
  releaseYear: MatchValue;
  questSeries: MatchValue;
};

function playCorrectSFX() {
  const audio = new Audio(correctSFX);
  audio.play();
}

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
  const characterIndex = myData.findIndex(
    (obj) => obj.Name.toUpperCase() == characterName.toUpperCase()
  );
  const character = myData[characterIndex];
  return character;
}

const chosenCharacter = myData[getRandomInt(Object.keys(myData).length)];

function App() {
  const [charName, setName] = useState("");
  const [result, setResult] = useState<React.ReactNode>(null);
  const [data, setData] = useState<GuessData[]>([]);
  const characterNames = myData.map((char) => char.Name);

  const addGuessToTable = (
    id: string,
    name: string,
    species: string,
    homeland: string,
    releaseYear: string,
    questSeries: string,
    chatheadUrl: string
  ) => {
    const newRow: GuessData = {
      id,
      chatheadUrl: {
        value: chatheadUrl,
        isMatch: chatheadUrl === chosenCharacter.Picture,
      },
      name: {
        value: name,
        isMatch: compareStrings(name, chosenCharacter.Name) === true,
      },
      species: {
        value: species,
        isMatch:
          compareStrings(species, chosenCharacter["Species/Race"]) === true,
      },
      homeland: {
        value: homeland,
        isMatch: compareStrings(homeland, chosenCharacter.Homeland) === true,
      },
      releaseYear: {
        value: releaseYear,
        isMatch:
          compareStrings(releaseYear, chosenCharacter["Release Year"]) === true,
      },
      questSeries: {
        value: questSeries,
        isMatch:
          compareStrings(questSeries, chosenCharacter["Quest Series"]) === true,
      },
    };

    setData((prevData) => [...prevData, newRow]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (compareStrings(charName, chosenCharacter.Name)) {
      playCorrectSFX();
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
          <Button
            className="medieval-submit"
            variant="secondary"
            onClick={refreshPage}
          >
            Play Again
          </Button>
          <br />
        </>
      );
    } else {
      const characterData = await fetchCharacterData(charName);
      if (!characterData) {
        setResult(<p>Nothing interesting happens.</p>);
        return;
      }

      addGuessToTable(
        characterData.Id,
        characterData.Name,
        characterData["Species/Race"],
        characterData.Homeland,
        characterData["Release Year"],
        characterData["Quest Series"],
        characterData.Picture
      );
    }
  };

  return (
    <div className="App">
      <Card
        style={{ backgroundColor: "rgba(180,180,180,0.92)", width: "50rem" }}
      >
        <Card.Body>
          <Card.Title>Gielinordle</Card.Title>
          <Card.Text>
            <form onSubmit={handleSubmit}>
              <input
                className="medieval-input"
                type="text"
                list={charName.trim() ? "character-names" : undefined}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type a character name..."
              />
              <button type="submit" className="medieval-submit">
                <img
                  src="https://runescape.wiki/images/Attack_detail.png?346f8"
                  alt="Submit"
                  style={{ width: "24px", height: "24px", rotate: "45deg" }}
                />
              </button>
              <datalist id="character-names">
                {characterNames.map((name, index) => (
                  <option key={index} value={name} />
                ))}
              </datalist>
            </form>
            <br />
            <div className="result">{result}</div>
            <table
              id="guesses"
              style={{ width: "47rem", justifySelf: "center" }}
            >
              {data.length > 0 && (
                <thead>
                  <br />
                  <tr>
                    <td></td>
                    <td className="columnTitle">Name</td>
                    <td className="columnTitle">Species/Race</td>
                    <td className="columnTitle">Homeland</td>
                    <td className="columnTitle">Release Year</td>
                    <td className="columnTitle">Quest Series</td>
                  </tr>
                </thead>
              )}
              <tbody>
                {data.map((row) => (
                  <tr key={row.id}>
                    <td className="table-cell-no-border px-4 py-2">
                      <img
                        src={row.chatheadUrl.value}
                        alt="Chathead"
                        className="chathead-img"
                      />{" "}
                    </td>
                    <td
                      className="table-cell   px-4 py-2"
                      style={{
                        backgroundColor: row.name.isMatch ? "green" : "#751512",
                        color: "white",
                      }}
                    >
                      {row.name.value}
                    </td>
                    <td
                      className="table-cell   px-4 py-2"
                      style={{
                        backgroundColor: row.species.isMatch
                          ? "green"
                          : "#751512",
                        color: "white",
                        animationDelay: `1s`,
                      }}
                    >
                      {row.species.value}
                    </td>
                    <td
                      className="table-cell  px-4 py-2"
                      style={{
                        backgroundColor: row.homeland.isMatch
                          ? "green"
                          : "#751512",
                        color: "white",
                        animationDelay: `1.5s`,
                      }}
                    >
                      {row.homeland.value}
                    </td>
                    <td
                      className="table-cell   px-4 py-2"
                      style={{
                        backgroundColor: row.releaseYear.isMatch
                          ? "green"
                          : "#751512",
                        color: "white",
                        animationDelay: `2s`,
                      }}
                    >
                      {row.releaseYear.value}
                    </td>
                    <td
                      className="table-cell   px-4 py-2"
                      style={{
                        backgroundColor: row.questSeries.isMatch
                          ? "green"
                          : "#751512",
                        color: "white",
                        animationDelay: `2.5s`,
                      }}
                    >
                      {row.questSeries.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            Made with{" "}
            <span style={{ color: "red" }}>
              <img
                style={{ width: "18px" }}
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
            .
            <br />
            Gielinordle is an{" "}
            <a
              href="https://github.com/mateuscv/gielinordle/tree/main"
              style={{ color: "#936039" }}
            >
              open-source
            </a>{" "}
            fan project. RuneScape is property of Jagex Ltd.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
