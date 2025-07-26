import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import myData from "./data/database.json";
import { refreshPage } from "./functions/helpers/refreshPage";
import { playCorrectSFX } from "./functions/sound/playCorrectSound";
import { getRandomInt } from "./functions/helpers/getRandomInt";
import { compareStrings } from "./functions/helpers/compareStrings";
import { isYearTooEarly } from "./functions/helpers/isYearTooEarly";
import { fetchCharacterData } from "./functions/fetchers/fetchCharacterData";
import { GuessData } from "./types/GuessData";
import Hud from "./components/Hud";
import Result from "./components/Result";
import GuessTable from "./components/GuessTable";
import Footer from "./components/Footer";

import { Button } from "react-bootstrap";

const chosenCharacter = myData[getRandomInt(Object.keys(myData).length)];

function App() {
  const [charName, setName] = useState("");
  const [result, setResult] = useState<React.ReactNode>(null);
  const [data, setData] = useState<GuessData[]>([]);
  const [lives, setLives] = useState(10);
  const [hasWon, setHasWon] = useState(false);

  const characterNames = myData.map((char) => char.Name);

  useEffect(() => {
    if (lives === 0) {
      setResult(
        <>
          <div>
            <h2>Oh dear, you are dead!</h2>
          </div>
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
    }
  }, [lives]);

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
        isTooEarly:
          isYearTooEarly(releaseYear, chosenCharacter["Release Year"]) === true,
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
      setHasWon(true);
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
      setLives((prev) => Math.max(prev - 1, 0));
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
            <div className="hud">
              <Hud
                charName={charName}
                setName={setName}
                handleSubmit={handleSubmit}
                lives={lives}
                hasWon={hasWon}
                characterNames={characterNames}
              />
            </div>
            <br />
            <Result result={result} />
            <GuessTable data={data} />
            <Footer />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
