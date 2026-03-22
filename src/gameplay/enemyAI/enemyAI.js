import * as THREE from 'three';
import { config } from '@/config/config';
import { isCellOccupied } from '@/utils/placementTool';
import models from '@/store/models';
import state from '@/store/state';

const { speed, attackRange, attackDamage, attackCooldown } = config.monster;
const RADIUS = config.grid.cellSize;

const direction = new THREE.Vector3();

function isBlocked(x, z) {
  return (
    isCellOccupied(x - RADIUS, z - RADIUS) ||
    isCellOccupied(x + RADIUS, z - RADIUS) ||
    isCellOccupied(x - RADIUS, z + RADIUS) ||
    isCellOccupied(x + RADIUS, z + RADIUS)
  );
}

// Updates all alive monsters each frame
export function updateAllEnemies(delta) {
  const player = models.characterModel;
  if (!player) return;

  for (const entry of state.monsters) {
    if (entry.health <= 0) continue;
    updateSingleEnemy(entry, player, delta);
  }
}

function updateSingleEnemy(entry, player, delta) {
  const { model } = entry;

  direction.subVectors(player.position, model.position);
  direction.y = 0;
  const distance = direction.length();

  // Attack when in range
  if (distance <= attackRange) {
    entry.attackTimer -= delta;
    if (entry.attackTimer <= 0) {
      entry.attackTimer = attackCooldown;
      if (state.characterHealth > 0) {
        state.characterHealth -= attackDamage;
        console.log(`Monster attacks! Player HP: ${state.characterHealth}`);
      }
    }
    return;
  }

  // Chase the player
  direction.normalize();
  const step = speed * delta;

  const nextX = model.position.x + direction.x * step;
  const nextZ = model.position.z + direction.z * step;

  if (!isBlocked(nextX, nextZ)) {
    model.position.x = nextX;
    model.position.z = nextZ;
  } else {
    if (!isBlocked(nextX, model.position.z)) {
      model.position.x = nextX;
    }
    if (!isBlocked(model.position.x, nextZ)) {
      model.position.z = nextZ;
    }
  }

  model.rotation.y = Math.atan2(direction.x, direction.z);
}
