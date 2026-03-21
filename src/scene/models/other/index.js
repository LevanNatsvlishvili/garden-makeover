async function loadStarterModels() {
  models.houseModel = await import('@/scene/models/structures/house');
  models.characterModel = await import('@/scene/models/other/character');
  models.treeModel = await import('@/scene/models/other/tree');
}

export default loadStarterModels;
