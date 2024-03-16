function getGameplayTimes(game) {
  if (game.gameplayStyles) return game.gameplayStyles;
  let gameplayStyles = {};
  const gameplayEntries = Object.keys(game).filter(
    (element) =>
      element.indexOf("gameplay") !== -1 && typeof (game[element] === "Number")
  );
  gameplayEntries.forEach((entry) => {
    const gameplayStyleValue = game[entry];
    if (gameplayStyleValue <= 0) return;
    entry = entry.replace("gameplay", "");
    entry = entry.replace("MainExtra", "Main+Extra");
    // entry = this.insertPlusBetweenCaps(entry);
    gameplayStyles[entry] = gameplayStyleValue;
  });
  return gameplayStyles;
}

export default getGameplayTimes;
