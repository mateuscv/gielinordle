import React from "react";
import { Button } from "react-bootstrap";

interface HudProps {
  charName: string;
  setName: (name: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  lives: number;
  hasWon: boolean;
  characterNames: string[];
}

const Hud: React.FC<HudProps> = ({
  charName,
  setName,
  handleSubmit,
  lives,
  hasWon,
  characterNames,
}) => (
  <form onSubmit={handleSubmit}>
    <input
      className="medieval-input"
      type="text"
      list={charName.trim() ? "character-names" : undefined}
      onChange={(e) => setName(e.target.value)}
      placeholder="Type a character name..."
      hidden={lives === 0 || hasWon}
    />
    <button
      hidden={lives === 0 || hasWon}
      type="submit"
      className="medieval-submit"
    >
      <img
        src="https://runescape.wiki/images/Attack_detail.png?346f8"
        alt="Submit"
        style={{ width: "24px", height: "24px", rotate: "45deg" }}
      />
    </button>
    <datalist id="character-names">
      {characterNames
        .sort((a, b) => a.localeCompare(b))
        .map((name, index) => (
          <option key={index} value={name} />
        ))}
    </datalist>
    &nbsp; &nbsp;
    <span
      style={{
        color: "#751512",
        fontSize: "22px",
        fontFamily: "Georgia",
        fontWeight: "800",
      }}
    >
      <img
        style={{ width: "24px" }}
        src="https://oldschool.runescape.wiki/images/Hitpoints_icon_%28detail%29.png?a4903&20220119135436"
      />
      &nbsp;{lives}
    </span>
  </form>
);

export default Hud;
