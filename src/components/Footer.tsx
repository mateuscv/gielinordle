import React from "react";

const Footer: React.FC = () => (
  <>
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
      Mateus
    </a>
    &nbsp;and&nbsp;
    <a
      href="https://github.com/mateuscv/gielinordle/graphs/contributors"
      style={{ color: "#936039" }}
    >
      contributors
    </a>
    .
    <br />
    All data gathered from{" "}
    <a href="https://runescape.wiki/" style={{ color: "#936039" }}>
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
  </>
);

export default Footer;
