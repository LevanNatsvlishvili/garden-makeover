export const moveTutorialIndex = (index, conditions) => {
  if (conditions.tutorial.shouldWellTipsStart()) {
    index = 0; // welcome, place the well
    return index;
  }
  if (conditions.tutorial.shouldTomatoTipsStart() && index === 0) {
    index = 1; // place the tomato plant
    return index;
  }
  if (conditions.tutorial.shouldFinishDayTipsStart() && index === 1) {
    index = 2; // Finish the day
    return index;
  }
  if (conditions.tutorial.shouldNightTipsStart() && index === 2) {
    index = 3; // How to to navigate and attack monsters
    return index;
  }
  if (conditions.tutorial.shouldHarvestTipsStart() && index === 3) {
    index = 4; // Harvest the plants
    return index;
  }

  return index;
};
