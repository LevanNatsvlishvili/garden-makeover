import * as THREE from 'three';
import { config } from '@/config/config';
import { isCellOccupied } from '@/utils/placementTool';
import models from '@/store/models';

const { speed, attackRange, attackDamage, attackCooldown, chaseRange } = config.monster;
const RADIUS = config.grid.cellSize;

const direction = new THREE.Vector3();
let attackTimer = 0;

function isBlocked(x, z) {
  return (
    isCellOccupied(x - RADIUS, z - RADIUS) ||
    isCellOccupied(x + RADIUS, z - RADIUS) ||
    isCellOccupied(x - RADIUS, z + RADIUS) ||
    isCellOccupied(x + RADIUS, z + RADIUS)
  );
}

export function updateEnemy(enemyModel, delta) {
  const player = models.characterModel;
  if (!player || !enemyModel) return;

  direction.subVectors(player.position, enemyModel.position);
  direction.y = 0;
  const distance = direction.length();

  if (distance > chaseRange) return;

  if (distance <= attackRange) {
    attackTimer -= delta;
    if (attackTimer <= 0) {
      attackTimer = attackCooldown;
      onAttack();
    }
    return;
  }

  direction.normalize();
  const step = speed * delta;

  const nextX = enemyModel.position.x + direction.x * step;
  const nextZ = enemyModel.position.z + direction.z * step;

  if (!isBlocked(nextX, nextZ)) {
    enemyModel.position.x = nextX;
    enemyModel.position.z = nextZ;
  } else {
    if (!isBlocked(nextX, enemyModel.position.z)) {
      enemyModel.position.x = nextX;
    }
    if (!isBlocked(enemyModel.position.x, nextZ)) {
      enemyModel.position.z = nextZ;
    }
  }

  enemyModel.rotation.y = Math.atan2(direction.x, direction.z);
}

function onAttack() {
  console.log(`Monster attacks for ${attackDamage} damage!`);
}
