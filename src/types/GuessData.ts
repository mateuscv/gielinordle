type MatchValue = {
  value: string;
  isMatch: boolean;
};

export type GuessData = {
  id: string;
  chatheadUrl: MatchValue;
  name: MatchValue;
  species: MatchValue;
  homeland: MatchValue;
  releaseYear: MatchValue;
  questSeries: MatchValue;
};
