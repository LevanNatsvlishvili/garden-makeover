import { scene } from '@/utils/renderer';
import { config } from '@/config/config';
import state from '@/store/state';
import models from '@/store/models';

const { spawnPoints } = config.monster;

function getRandomSpawnPoint() {
  const point = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
  return { x: point.x, y: 0.1, z: point.z };
}

export async function spawnMonster() {
  const position = getRandomSpawnPoint();
  const model = await models.monsterModel.default(position);
  scene.add(model);

  state.monsters.push({
    model,
    health: config.monster.health,
    attackTimer: 0,
  });
}
