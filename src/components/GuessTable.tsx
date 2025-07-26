import React from "react";
import { playSoundWithDelay } from "../functions/sound/playSoundWithDelay";
import { GuessData } from "../types/GuessData";

interface GuessTableProps {
  data: GuessData[];
}

const GuessTable: React.FC<GuessTableProps> = ({ data }) => (
  <table id="guesses" style={{ width: "47rem", justifySelf: "center" }}>
    {data.length > 0 && (
      <thead>
        <br />
        <tr>
          <td></td>
          <td className="columnTitle">Name</td>
          <td className="columnTitle">Species/Race</td>
          <td className="columnTitle">Origin</td>
          <td className="columnTitle">Release Year</td>
          <td className="columnTitle">Quest Series</td>
        </tr>
      </thead>
    )}
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          <td
            style={{ textAlign: "center", overflow: "hidden" }}
            className="table-cell-no-border px-4 py-2"
          >
            <img
              src={row.chatheadUrl.value}
              alt="Chathead"
              className="chathead-img"
              style={{ objectFit: "scale-down" }}
            />
          </td>
          <td
            className="table-cell   px-4 py-2"
            style={{
              backgroundColor: row.name.isMatch ? "green" : "#751512",
              color: "white",
            }}
            onAnimationStart={() => playSoundWithDelay(0, row.name.isMatch)}
          >
            {row.name.value}
          </td>
          <td
            className="table-cell   px-4 py-2"
            style={{
              animationDelay: "0.5s",
              backgroundColor: row.species.isMatch ? "green" : "#751512",
              color: "white",
            }}
            onAnimationStart={() =>
              playSoundWithDelay(0.5, row.species.isMatch)
            }
          >
            {row.species.value}
          </td>
          <td
            className="table-cell  px-4 py-2"
            style={{
              animationDelay: "1s",
              backgroundColor: row.homeland.isMatch ? "green" : "#751512",
              color: "white",
            }}
            onAnimationStart={() => playSoundWithDelay(1, row.homeland.isMatch)}
          >
            {row.homeland.value}
          </td>
          <td
            className="table-cell px-4 py-2"
            style={{
              animationDelay: "1.5s",
              backgroundColor: row.releaseYear.isMatch ? "green" : "#751512",
              color: "white",
            }}
            onAnimationStart={() =>
              playSoundWithDelay(1.5, row.releaseYear.isMatch)
            }
          >
            {row.releaseYear.value}
            <br />
            {row.releaseYear.isTooEarly ? (
              <span style={{ marginLeft: "8px" }} title="Too early">
                ⬆️
              </span>
            ) : !row.releaseYear.isMatch ? (
              <span style={{ marginLeft: "8px" }} title="Too late">
                ⬇️
              </span>
            ) : null}
          </td>
          <td
            className="table-cell px-4 py-2"
            style={{
              animationDelay: "2s",
              backgroundColor: row.questSeries.isMatch ? "green" : "#751512",
              color: "white",
            }}
            onAnimationStart={() =>
              playSoundWithDelay(2, row.questSeries.isMatch)
            }
          >
            {row.questSeries.value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default GuessTable;
