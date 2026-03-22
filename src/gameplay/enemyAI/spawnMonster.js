import { scene } from '@/utils/renderer';
import { config } from '@/config/config';
import state from '@/store/state';
import models from '@/store/models';

const { spawnPoints } = config.monster;

function getRandomSpawnPoint() {
  const point = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
  return { x: point.x, y: 0.1, z: point.z };
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function spawnMonster() {
  const position = getRandomSpawnPoint();
  const model = await models.monsterModel.default(position);

  await delay(1000);

  scene.add(model);
  state.monsters.push({
    model,
    health: config.monster.health,
    attackTimer: 0,
  });
}

export async function spawnMonsters(count) {
  for (let i = 0; i < count; i++) {
    await spawnMonster();
  }
}
