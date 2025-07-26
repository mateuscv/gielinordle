import matchSFX from "../../sfx/categoryMatch.mp3";

function playMatchSFX() {
  const audio = new Audio(matchSFX);
  audio.play();
}

export function playSoundWithDelay(delay: number, match: boolean) {
  if (match) {
    setTimeout(() => {
      playMatchSFX();
    }, delay * 1000);
  }
}
