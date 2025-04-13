import correctSFX from "../../sfx/correct.mp3";

export function playCorrectSFX() {
  const audio = new Audio(correctSFX);
  audio.play();
}
