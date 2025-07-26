import { playSoundWithDelay } from "./playSoundWithDelay";
import { GuessData } from "../../types/GuessData";

export function playAllMatchSoundsForGuess(row: GuessData) {
  playSoundWithDelay(0, row.name.isMatch);
  playSoundWithDelay(0.5, row.species.isMatch);
  playSoundWithDelay(1, row.homeland.isMatch);
  playSoundWithDelay(1.5, row.releaseYear.isMatch);
  playSoundWithDelay(2, row.questSeries.isMatch);
}
