export function compareStrings(stringA: string, stringB: string) {
  stringA = stringA.toUpperCase();
  stringB = stringB.toUpperCase();
  if (stringA == stringB) {
    return true;
  }
}
