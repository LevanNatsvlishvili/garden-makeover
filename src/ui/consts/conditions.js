import state from '@/store/state';

function getConditions() {
  const allPlants = () => [...state.tomatoes, ...state.cucumbers, ...state.vines];

  return {
    isWellPlaced: () => state.isWellPlaced,
    isPlantPlaced: () => state.isPlantPlaced,
    isDay: () => state.isDay,
    isNight: () => !state.isDay,
    isHarvestable: () => allPlants().some((p) => p.status === 'ripe'),
    isMonster: () => state.monsters.length > 0,
    isHealth: () => state.characterHealth > 0,
    isMoney: () => state.money > 0,
    allPlants,
  };
}

export default getConditions();
