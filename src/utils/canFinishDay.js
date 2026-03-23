import state from '@/store/state';
export const canFinishDay = () => {
  if (!state.isDay && state.monsters.length === 0) return true;
  if (state.isDay && state.isWellPlaced && state.isPlantPlaced) return true;
  return false;
};
