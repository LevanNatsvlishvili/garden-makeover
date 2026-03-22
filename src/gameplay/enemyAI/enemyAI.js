import * as THREE from 'three';
import { config } from '@/config/config';
import { isCellOccupied } from '@/utils/placementTool';
import models from '@/store/models';
import state from '@/store/state';

const { speed, attackRange, attackDamage, attackCooldown, chaseRange } = config.monster;
// Collision radius
const RADIUS = config.grid.cellSize;

const direction = new THREE.Vector3();
let attackTimer = 0;

// Returns true if the is blocked by block
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

  // directs the enemy towards the player
  direction.subVectors(player.position, enemyModel.position);
  direction.y = 0;
  const distance = direction.length();

  // attack when the player is within attack range
  if (distance <= attackRange) {
    attackTimer -= delta;
    if (attackTimer <= 0) {
      attackTimer = attackCooldown;
      onAttack();
    }
    return;
  }

  // CHASE — move toward player with collision handling
  direction.normalize();
  const step = speed * delta;

  const nextX = enemyModel.position.x + direction.x * step;
  const nextZ = enemyModel.position.z + direction.z * step;

  // Try full diagonal move first; if blocked, wall-slide along each axis independently
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

  // Face the direction of movement
  enemyModel.rotation.y = Math.atan2(direction.x, direction.z);
}

function onAttack() {
  if (state.characterHealth - attackDamage <= 0) {
    console.log('Character is dead!');
    return;
  }
  state.characterHealth -= attackDamage;
  console.log(`Monster attacks for ${attackDamage} damage!`);
  console.log('Character health:', state.characterHealth);
}
