import { spawnMonsters } from '@/gameplay/monsterAI/spawnMonster';
import { spawnMonster } from '@/gameplay/monsterAI/spawnMonster';
import models from '@/store/models';

export const setupRest = async () => {
  models.tomatoModel = await import('@/scene/models/plants/tomato');
  models.cucumberModel = await import('@/scene/models/plants/cucumber');
  models.vineModel = await import('@/scene/models/plants/vine');
  models.roseModel = await import('@/scene/models/decoration/rose');
  models.statueModel = await import('@/scene/models/decoration/statue');
  models.wellModel = await import('@/scene/models/structures/well');
  models.treeModel = await import('@/scene/models/other/tree');
  models.monsterModel = await import('@/scene/models/other/monster');

  // await spawnMonsters(3);
};
