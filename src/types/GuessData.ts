type MatchValue = {
  value: string;
  isMatch: boolean;
};

type YearMatchValue = MatchValue & {
  isTooEarly: boolean;
};

export type GuessData = {
  id: string;
  chatheadUrl: MatchValue;
  name: MatchValue;
  species: MatchValue;
  homeland: MatchValue;
  releaseYear: YearMatchValue;
  questSeries: MatchValue;
};
