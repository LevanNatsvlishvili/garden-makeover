import models from '@/store/models';

export const setupRest = async () => {
  models.tomatoModel = await import('@/scene/models/plants/tomato');
  models.cucumberModel = await import('@/scene/models/plants/cucumber');
  models.vineModel = await import('@/scene/models/plants/vine');
  models.wellModel = await import('@/scene/models/structures/well');
  models.treeModel = await import('@/scene/models/other/tree');
  models.monsterModel = await import('@/scene/models/other/monster');
};
