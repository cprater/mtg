export function canCast(manaSpent = [], castingCost = []) {
  let clonedManaSpent = manaSpent.slice(0);
  let castableFlag = true;

  const sortedCastingCost = castingCost.sort((a, b) => {
    const coloredMana = /\{[WBUGRS]\}/g;
    const genericMana = /\{\d+\}/g;
    const xMana = /\{[X]\}/g;

    if (a.match(coloredMana) && b.match(coloredMana)) return 0;
    else if (a.match(genericMana) && b.match(genericMana)) return 0;
    else if (a.match(xMana)) return -1;
    else if (a.match(coloredMana) && !b.match(coloredMana)) return -1;
    else if (b.match(coloredMana) && !a.match(coloredMana)) return 1;

    return 0;
  });

  sortedCastingCost.forEach(manaSymbol => {
    if (manaSymbol.match(coloredMana)) {
      let index = clonedManaSpent.indexOf(manaSymbol);

      if (index > -1)
        clonedManaSpent.splice(index, 1);
      else
        castableFlag = false;
    }
    else if (manaSymbol.match(genericMana)) {
      let amountOfMana = manaSymbol.split(/[\{\}]/g)[1];

      if (amountOfMana > clonedManaSpent.length)
        castableFlag = false;
       else
         clonedManaSpent.splice(index, amountOfMana);
    }
  });

  return castableFlag;
}
