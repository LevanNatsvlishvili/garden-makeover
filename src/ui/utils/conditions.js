import state from '@/store/state';

export function createConditions() {
  const conditions = {
    allPlants: () => [...state.tomatoes, ...state.cucumbers, ...state.vines],
    isDay: () => state.isDay,
    isWellPlaced: () => state.isWellPlaced,
    isPlantPlaced: () => state.isPlantPlaced,
    isHarvestable: () => conditions.allPlants().some((p) => p.status === 'ripe'),
    arePlacementsMade: () => state.isWellPlaced && state.isPlantPlaced,
    isHarvestButtonVisible: () =>
      conditions.arePlacementsMade() && conditions.isDay() && conditions.isHarvestable(),
    isFinishDayButtonVisible: () =>
      conditions.arePlacementsMade() && conditions.isDay() && !conditions.isHarvestable(),
    tutorial: {
      shouldWellTipsStart: () => !state.isTutorialFinished && !state.isWellPlaced,
      shouldTomatoTipsStart: () =>
        !state.isTutorialFinished && state.isWellPlaced && !state.isPlantPlaced,
      shouldShopTipsStart: () => !state.isTutorialFinished && !conditions.arePlacementsMade(),
      shouldFinishDayTipsStart: () =>
        !state.isTutorialFinished && conditions.arePlacementsMade() && conditions.isDay(),
      shouldNightTipsStart: () => !state.isTutorialFinished && !conditions.isDay(),
      shouldHarvestTipsStart: () => !state.isTutorialFinished && conditions.isHarvestable(),
    },
  };
  return conditions;
}
