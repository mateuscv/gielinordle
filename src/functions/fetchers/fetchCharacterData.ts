import myData from "../../database.json";

export function fetchCharacterData(characterName: string) {
  const characterIndex = myData.findIndex(
    (obj) => obj.Name.toUpperCase() == characterName.toUpperCase()
  );
  const character = myData[characterIndex];
  return character;
}
